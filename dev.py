import asyncio
import json
import os

import requests
from dotenv import load_dotenv

from utils.gets import get_item
from utils.inventory import find_healing_item, find_item

load_dotenv()

TOKEN = os.getenv("TOKEN")

bank_url = f"https://api.artifactsmmo.com/my/bank/items"

base_url = f"https://api.artifactsmmo.com/characters/josiane"
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}"
}

details = requests.get(url=bank_url, headers=headers)
details_info = details.json()
details_data = details_info["data"]

async def dev():
    #print(json.dumps(details_data, indent=4))

    try:
        details = requests.get(url=base_url, headers=headers)
        char_info = details.json()

        if 'error' in char_info:
            raise Exception(char_info["error"]['message'])

        char_data = char_info["data"]
    except Exception as e:
        print(f"❌ {e}")


    found_healing_item = await find_healing_item(headers, char_data['inventory'])
    print(found_healing_item)
    heal_value = found_healing_item['effects'][0]['value']
    healing_item = await find_item(char_data['inventory'], found_healing_item['code'])
    print(healing_item, heal_value)
    #for item in details_data:
    #    print(await get_item(headers, item['code']))



asyncio.run(dev())