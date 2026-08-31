import json
from time import sleep

from data.locations import BANK
from utils.gets import get_item
from utils.move_to import move_to
import requests

# === FINDING IN INV RELATED ===

async def is_inventory_full(character_data):
    """Returns true if character inventory is full."""
    total_items = sum(item['quantity'] for item in character_data['inventory'])
    return total_items >= character_data['inventory_max_items']

# ===

async def find_item(inventory,code):
    for item in inventory:
        if item['code'] == code:
            return item
    return None

async def find_other_items(inventory,code):
    for item in inventory:
        if item['code'] != code:
            return item
    return None

async def find_healing_item(headers, inventory):
    for item in inventory:
        if item['code'] == '':
            continue
        found_item = await get_item(headers, item['code'])
        if found_item['effects']:
            if found_item['effects'][0]['code'] == 'heal':
                return found_item
    return None

# === BANK RELATED ===

async def deposit_except_item(TOKEN, char_data, headers, excepted_code):
    deposit_url = f"https://api.artifactsmmo.com/my/{char_data['name']}/action/bank/deposit/item"
    banked = await move_to(TOKEN, character=char_data, x=BANK['x'], y=BANK['y'])

    if banked:
        for item in char_data["inventory"]:
            if item['code'] != excepted_code and item['quantity'] > 0:

                depo_body = [{
                    "code": item['code'],
                    'quantity': item['quantity'],
                }]

                try:
                    res = requests.post(deposit_url, headers=headers, json=depo_body)
                    res_info = res.json()

                    if 'error' in res_info:
                        raise Exception(res_info["error"]['message'])

                    print(f"✅ Deposited {item['quantity']} {item['code']} from slot {item['slot']}")
                    print(f"⏳ Cooldown started: {res_info['data']['cooldown']['total_seconds']} seconds")
                    sleep(res_info['data']['cooldown']['total_seconds'])

                except Exception as e:
                    print(f'❌ {e}')
                    break
    else:
        return False