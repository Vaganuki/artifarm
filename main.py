import asyncio
import os

from dotenv import load_dotenv

from data.locations import COPPER_ROCKS, IRON_ROCKS, YELLOW_SLIME, CHICKEN
from farming_loops.combat import combat_cycle
from farming_loops.ingots import ingot_cycle

load_dotenv()

TOKEN = os.getenv("TOKEN")
CHAR_LIST = ['Vaganuki', 'Bertrand', 'josiane', 'alexis', 'X_klave']

CHAR_INPUT = CHAR_LIST[int(input("Please chose a Character you would like to use: \n 0: Vaganuki, 1: Bertrand, 2: josiane, 3: alexis, 4: X_klave\n"))]

TASK_INPUT = int(input('Please chose a task 0: copper bar, 1: iron bar, 2: yellow slimes, 3: chickens\n'))

match TASK_INPUT:
    case 0: # -- COPPER BAR --
        asyncio.run(ingot_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, ORE_CODE = 'copper_ore', BAR_CODE = 'copper_bar', LOCATION = COPPER_ROCKS ))
    case 1: # -- IRON BAR --
        asyncio.run(ingot_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, ORE_CODE = 'iron_ore', BAR_CODE = 'iron_bar', LOCATION = IRON_ROCKS ))
    case 2: # -- YELLOW SLIME FIGHT --
        asyncio.run(combat_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT,LOCATION = YELLOW_SLIME ))
    case 3: # -- CHICKEN FIGHT --
        asyncio.run(combat_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, LOCATION = CHICKEN))
    case _:
        print('Bye bye')