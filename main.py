import asyncio
import os

from dotenv import load_dotenv

from data.locations import COPPER_ROCKS, IRON_ROCKS, YELLOW_SLIME, CHICKEN, GREEN_SLIME, ASH_TREE, SHRIMP_SPOT, SHEEP, \
    SPRUCE_TREE, COW, RED_SLIME
from farming_loops.combat import combat_cycle
from farming_loops.cooked_fish import cooked_fish_cycle
from farming_loops.ingots import ingot_cycle
from farming_loops.planks import plank_cycle
from farming_loops.raw_ressources import raw_ressource_cycle

load_dotenv()

TOKEN = os.getenv("TOKEN")
CHAR_LIST = ['Vaganuki', 'Bertrand', 'josiane', 'alexis', 'X_klave']

CHAR_INPUT = CHAR_LIST[int(input("Please chose a Character you would like to use: \n 0: Vaganuki, 1: Bertrand, 2: josiane, 3: alexis, 4: X_klave\n"))]

TASK_INPUT = int(input('Please chose a task 0: copper bar, 1: iron bar, 2: yellow slimes, 3: chickens, 4: green slimes\n'))

match TASK_INPUT:
    case 0: # -- COPPER BAR --
        asyncio.run(ingot_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, ORE_CODE = 'copper_ore', BAR_CODE = 'copper_bar', LOCATION = COPPER_ROCKS ))
    case 1: # -- IRON BAR --
        asyncio.run(ingot_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, ORE_CODE = 'iron_ore', BAR_CODE = 'iron_bar', LOCATION = IRON_ROCKS ))
    case 2: # -- YELLOW SLIME FIGHT --
        asyncio.run(combat_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT,LOCATION = YELLOW_SLIME ))
    case 3: # -- CHICKEN FIGHT --
        asyncio.run(combat_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, LOCATION = CHICKEN))
    case 4: # -- GREEN SLIME FIGHT --
        asyncio.run(combat_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, LOCATION = GREEN_SLIME))
    case 5: # -- ASH PLANK --
        asyncio.run(plank_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, WOOD_CODE = 'ash_wood', PLANK_CODE = 'ash_plank', LOCATION = ASH_TREE))
    case 6: # -- COOKED SHRIMP --
        asyncio.run(cooked_fish_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT,FISH_CODE = 'shrimp', COOKED_FISH_CODE = 'cooked_shrimp', LOCATION = SHRIMP_SPOT ))
    case 7:  # -- SHEEP FIGHT --
        asyncio.run(combat_cycle(TOKEN=TOKEN, CHARACTER_NAME=CHAR_INPUT, LOCATION=SHEEP))
    case 8: # -- SPRUCE PLANK --
        asyncio.run(plank_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, WOOD_CODE = 'spruce_wood', PLANK_CODE = 'spruce_plank', LOCATION = SPRUCE_TREE))
    case 9: # -- COW FIGHT --
        asyncio.run(combat_cycle(TOKEN=TOKEN, CHARACTER_NAME=CHAR_INPUT, LOCATION=COW))
    case 10: # -- ASH WOOD --
        asyncio.run(raw_ressource_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, LOCATION = SPRUCE_TREE ))
    case 11: # -- RED SLIME FIGHT --
        asyncio.run(combat_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, LOCATION = RED_SLIME))
    case _:
        print('Bye bye')