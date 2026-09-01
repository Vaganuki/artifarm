from time import sleep
import requests

from data.locations import MINING_WORKSHOP
from utils.craft import craft_item
from utils.gets import get_char_data
from utils.move_to import move_to
from utils.inventory import is_inventory_full, find_item, find_other_items
from utils.bank import deposit_except_item


async def ingot_cycle(TOKEN ,CHARACTER_NAME , ORE_CODE, BAR_CODE, LOCATION):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }

    gathering_url = f"https://api.artifactsmmo.com/my/{CHARACTER_NAME}/action/gathering"
    crafting_url = f"https://api.artifactsmmo.com/my/{CHARACTER_NAME}/action/crafting"

    while True:

        char_data = await get_char_data(headers, CHARACTER_NAME)

        if await find_other_items(char_data['inventory'], ORE_CODE):
            await deposit_except_item(TOKEN, char_data, headers, ORE_CODE)

        elif await is_inventory_full(char_data):
            await deposit_except_item(TOKEN, char_data, headers, ORE_CODE)

        try:

            char_data = await get_char_data(headers, CHARACTER_NAME)

            await move_to(TOKEN, character = char_data, x = LOCATION['x'], y = LOCATION['y'])

            while not await is_inventory_full(char_data):

                try:
                    response = requests.post(gathering_url, headers=headers)
                    data = response.json()

                    if "error" in data:
                        raise Exception(data["error"]["message"])

                    details = data["data"]["details"]
                    drops_str = ", ".join([f"{i['quantity']}x {i['code']}" for i in details["items"]])

                    print(f"👇 Gathered successfully! Gained: {drops_str}")
                    print(f"🌟 {details['xp']} mining XP gained.")

                    sleep(data['data']['cooldown']['total_seconds'])


                except Exception as e:
                    print(f"❌ {e}")
                    break

            char_data = await get_char_data(headers, CHARACTER_NAME)

            await move_to(TOKEN, character=char_data, x=MINING_WORKSHOP['x'], y=MINING_WORKSHOP['y'])
            bar_craft = await find_item(char_data["inventory"], ORE_CODE)
            if bar_craft:
                try:
                    print(type(bar_craft['quantity']), bar_craft)
                    c_err = await craft_item(headers,crafting_url,BAR_CODE, bar_craft['quantity'] // 10)
                    if c_err:
                        raise Exception(c_err)

                except Exception as e:
                    print(f"❌ {e}")
                    break

            char_data = await get_char_data(headers, CHARACTER_NAME)

            await deposit_except_item(TOKEN, char_data, headers, ORE_CODE)

        except Exception as e:
            print(f"❌ {e}")
            break

    return




