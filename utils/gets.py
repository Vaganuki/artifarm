import requests

async def get_item(header, code):
    gitem_url = f'https://api.artifactsmmo.com/items/{code}'
    item = requests.get(url=gitem_url, headers=header)
    item_details = item.json()
    return item_details['data']