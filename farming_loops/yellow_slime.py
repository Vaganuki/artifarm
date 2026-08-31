import asyncio
import json
from time import sleep
import requests

from utils import move_to
from utils.bank import get_bank_items
from utils.fighting import get_healing_item, healing
from utils.inventory import find_healing_item, find_item

heal_value = 0
found_healing_item = None

async def yellow_slimes(TOKEN: str,CHARACTER_NAME: str,):
    global heal_value, found_healing_item


    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }

    base_url = f"https://api.artifactsmmo.com/characters/{CHARACTER_NAME}"

    while True:
        try:
            details = requests.get(url = base_url, headers = headers)
            char_info = details.json()

            if 'error' in char_info:
                raise Exception(char_info["error"]['message'])

            char_data = char_info["data"]
            print(f"✅ {char_data['name']} begins a new yellow slime cycle")
        except Exception as e:
            print(f"❌ {e}")
            break

        healing_ready = False

        while not healing_ready:

            try:
                details = requests.get(url=base_url, headers=headers)
                char_info = details.json()

                if 'error' in char_info:
                    raise Exception(char_info["error"]['message'])

                char_data = char_info["data"]
            except Exception as e:
                print(f"❌ {e}")

            found_healing_item = await find_healing_item(headers, char_data['inventory'])
            if found_healing_item:

                heal_value = found_healing_item['effects'][0]['value']
                healing_item = await find_item(char_data['inventory'], found_healing_item['code'])

                healing_ready = True

            else:
                await get_healing_item(TOKEN, headers, char_data)
                while char_data['max_hp'] - heal_value >= char_data['hp'] and healing_item['quantity'] > 0:
                    await healing(headers, char_data, healing_item['code'])
                    healing_item['quantity'] -= 1


    return




