import json
from time import sleep
import requests

from data.locations import BANK, MINING_WORKSHOP, IRON_ROCKS
from utils.craft import craft_item
from utils.move_to import move_to
from utils.inventory import is_inventory_full, find_item, find_other_items
from utils.bank import deposit_except_item

ore_code = 'iron_ore'
bar_code = 'iron_bar'

async def iron_bars(TOKEN: str,CHARACTER_NAME: str,):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }

    base_url = f"https://api.artifactsmmo.com/characters/{CHARACTER_NAME}"
    g_url = f"https://api.artifactsmmo.com/my/{CHARACTER_NAME}/action/gathering"
    c_url = f"https://api.artifactsmmo.com/my/{CHARACTER_NAME}/action/crafting"

    while True:
        try:
            details = requests.get(url = base_url, headers = headers)
            char_info = details.json()

            if 'error' in char_info:
                raise Exception(char_info["error"]['message'])

            char_data = char_info["data"]
            print(f"✅ {char_data['name']} begins a new iron bar cycle")
        except Exception as e:
            print(f"❌ {e}")
            break


        if await find_other_items(char_data['inventory'], ore_code):
            await deposit_except_item(TOKEN, char_data, headers, ore_code)
        elif await is_inventory_full(char_data):
            await deposit_except_item(TOKEN, char_data, headers, ore_code)

        try:

            details = requests.get(url = base_url, headers = headers)
            char_info = details.json()
            char_data = char_info["data"]

            if char_data['x'] != 2 or char_data['y'] != 0:
                await move_to(TOKEN, character = char_data, x = IRON_ROCKS['x'], y = IRON_ROCKS['y'])

            while not await is_inventory_full(char_data):

                try:
                    response = requests.post(g_url, headers=headers)
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

            details = requests.get(url = base_url, headers = headers)
            char_info = details.json()
            char_data = char_info["data"]

            await move_to(TOKEN, character=char_data, x=MINING_WORKSHOP['x'], y=MINING_WORKSHOP['y'])
            iron_craft = await find_item(char_data["inventory"], ore_code)
            if iron_craft:
                try:
                    print(type(iron_craft['quantity']), iron_craft)
                    c_err = await craft_item(headers,c_url,bar_code, iron_craft['quantity'] // 10)
                    if c_err:
                        raise Exception(c_err)

                except Exception as e:
                    print(f"❌ {e}")
                    break

            details = requests.get(url = base_url, headers = headers)
            char_info = details.json()
            char_data = char_info["data"]

            await deposit_except_item(TOKEN, char_data, headers, ore_code)

        except Exception as e:
            print(f"❌ {e}")
            break

    return




