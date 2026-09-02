from time import sleep
import requests

from utils.gets import get_char_data
from utils.move_to import move_to
from utils.inventory import is_inventory_full
from utils.bank import deposit_except_item


async def raw_ressource_cycle(TOKEN, CHARACTER_NAME, LOCATION):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }

    gathering_url = f"https://api.artifactsmmo.com/my/{CHARACTER_NAME}/action/gathering"

    while True:

        char_data = await get_char_data(headers, CHARACTER_NAME)

        await deposit_except_item(TOKEN, char_data, headers, '')

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
                    print(f"⏳ Cooldown started: {data['data']['cooldown']['total_seconds']} seconds")

                    sleep(data['data']['cooldown']['total_seconds'])


                except Exception as e:
                    print(f"❌ {e}")
                    break

            await deposit_except_item(TOKEN, char_data, headers, '')

        except Exception as e:
            print(f"❌ {e}")
            break

    return




