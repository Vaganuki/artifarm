import requests

async def get_item(header, code):
    gitem_url = f'https://api.artifactsmmo.com/items/{code}'
    item = requests.get(url=gitem_url, headers=header)
    item_details = item.json()
    return item_details['data']

async def get_char_data(header, CHARACTER_NAME):
    try:
        details = requests.get(url= f"https://api.artifactsmmo.com/characters/{CHARACTER_NAME}", headers=header)
        char_info = details.json()

        print(char_info)

        if 'error' in char_info:
            raise Exception(char_info["error"]['message'])

        return char_info["data"]
    except Exception as e:
        print(f"❌ {e}")
        return get_char_data(header, CHARACTER_NAME)