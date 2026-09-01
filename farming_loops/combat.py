from time import sleep
import requests

from utils.bank import deposit_except_item
from utils.gets import get_char_data
from utils.move_to import move_to
from utils.fighting import get_healing_item, healing
from utils.inventory import find_healing_item, find_item, is_inventory_full


async def combat_cycle(TOKEN,CHARACTER_NAME, LOCATION):

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }

    fight_url = f'https://api.artifactsmmo.com/my/{CHARACTER_NAME}/action/fight'
    while True:

        char_data = await get_char_data(headers, CHARACTER_NAME)

        print(f"✅ {char_data['name']} begins a new combat cycle ({LOCATION})")

        healing_ready = False
        healing_item = {'code':'','quantity':-1}
        heal_value = 0

        while not healing_ready:

            char_data = await get_char_data(headers, CHARACTER_NAME)

            found_healing_item = await find_healing_item(headers, char_data['inventory'])

            if found_healing_item:

                heal_value = found_healing_item['effects'][0]['value']
                healing_item = await find_item(char_data['inventory'], found_healing_item['code'])

            else:
                await get_healing_item(TOKEN, headers, char_data)

            if healing_item['code'] != '':

                while char_data['max_hp'] - heal_value >= char_data['hp'] and healing_item['quantity'] > 0:
                    await healing(headers, char_data, healing_item['code'])
                    healing_item['quantity'] -= 1

                    char_data = await get_char_data(headers, CHARACTER_NAME)

                if healing_item['quantity'] > 0:
                    healing_ready = True

        await move_to(TOKEN, char_data, LOCATION['x'], LOCATION['y'])

        fight_ready = True

        while fight_ready:
            try:

                response = requests.post(fight_url, headers=headers)
                res_info = response.json()
                fight_data = res_info['data']

                if "error" in fight_data:
                    raise Exception(fight_data["error"]["message"])

                fight = fight_data["fight"]
                fight_stats = fight["characters"][0]

                print("🏆 Fight won!" if fight["result"] == "win" else "💀 Fight lost!")
                print(f"⚔️  XP gained: {fight_stats['xp']} | HP remaining: {fight_stats['final_hp']}")

                if len(fight_stats["drops"]) > 0:
                    drops_str = ", ".join([f"{d['quantity']}x {d['code']}" for d in fight_stats["drops"]])
                    print(f"🎁 Loot dropped: {drops_str}")

                sleep(fight_data['cooldown']['total_seconds'])

                char_data = await get_char_data(headers, CHARACTER_NAME)
                while char_data['max_hp'] - heal_value >= char_data['hp'] and healing_item['quantity'] > 0:

                    await healing(headers, fight_data["characters"][0], healing_item['code'])
                    healing_item['quantity'] -= 1

                    char_data = await get_char_data(headers, CHARACTER_NAME)

                    if healing_item['quantity'] == 0:
                        fight_ready = False

                if await is_inventory_full(fight_data['characters'][0]):
                    await deposit_except_item(TOKEN, fight_data['characters'][0], headers, healing_item['code'])
                    await move_to(TOKEN, char_data, LOCATION['x'], LOCATION['y'])

            except Exception as e:
                print(f"❌ {e}")
                break