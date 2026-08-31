from time import sleep

import requests

from data.locations import BANK
from utils.bank import get_bank_items
from utils.inventory import find_healing_item
from utils.move_to import move_to

base_url = f"https://api.artifactsmmo.com"


async def get_healing_item(TOKEN , header,character):

    await move_to(TOKEN, character, BANK['x'], BANK['y'])

    bank_inventory = await get_bank_items(header)
    found_healing_item = await find_healing_item(header, bank_inventory)
    item_code = found_healing_item['code']

    for item in bank_inventory:

        if item['code'] == item_code:

            item_body = [{
                "code": item_code,
                "quantity": 0
            }]

            if item['quantity'] >= 20:
                item_body[0]['quantity'] = 20
            else:
                item_body[0]['quantity'] = item['quantity']

            try:
                item_res = requests.post(url= f"{base_url}/my/{character['name']}/action/bank/withdraw/item", headers=header, json = item_body )
                item_res_info = item_res.json()
                item_res_data = item_res_info['data']

                if 'error' in item_res_data:
                    raise Exception(item_res_data['error']['message'])

                print(f'⛑ {character['name']} took {item_body[0]["quantity"]} {item_body[0]["code"]}')
                sleep(item_res_data['cooldown']['total_seconds'])

            except Exception as e:
                print(f" ❌ {e}")
            break

    return None

async def healing(headers, character, item_code):

    try:
        print(f'📛 {character['name']} is trying to heal themselves')

        body = {
            'code': item_code,
            'quantity': 1
        }

        h_resp = requests.post(f"https://api.artifactsmmo.com/my/{character['name']}/action/use", headers=headers,
                               json=body)
        h_data = h_resp.json()
        print(f'✅ {item_code} has been used.')
        sleep(h_data['data']['cooldown']['total_seconds'])

        return True

    except Exception as e:
        print(e)