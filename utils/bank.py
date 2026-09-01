from time import sleep

import requests

from data.locations import BANK
from utils.move_to import move_to

bank_url = f"https://api.artifactsmmo.com/my/bank/items"



# === DATA FETCHING ===

async def get_bank_items(header):
    details = requests.get(url = bank_url, headers=header)
    details_info = details.json()
    return details_info["data"]

# === ITEM TRANSFER ===

async def deposit_except_item(TOKEN, char_data, headers, excepted_code):
    deposit_url = f"https://api.artifactsmmo.com/my/{char_data['name']}/action/bank/deposit/item"
    await move_to(TOKEN, character=char_data, x=BANK['x'], y=BANK['y'])

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