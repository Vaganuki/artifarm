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

