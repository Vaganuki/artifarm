import asyncio
import os

from dotenv import load_dotenv

from data.locations import COPPER_ROCKS, IRON_ROCKS
from farming_loops.ingots import ingot_cycle
from farming_loops.yellow_slime import yellow_slimes

load_dotenv()

TOKEN = os.getenv("TOKEN")
CHAR_LIST = ['Vaganuki', 'Bertrand', 'josiane', 'alexis', 'X_klave']

CHAR_INPUT = CHAR_LIST[int(input("Please chose a Character you would like to use: \n 0: Vaganuki, 1: Bertrand, 2: josiane, 3: alexis, 4: X_klave\n"))]

TASK_INPUT = int(input('Please chose a task 0: copper, 1: iron, 2: yellow slimes'))

match TASK_INPUT:
    case 0: # == COPPER FARM ==
        asyncio.run(ingot_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, ORE_CODE= 'copper_ore', BAR_CODE= 'copper_bar', LOCATION= COPPER_ROCKS ))
    case 1:
        asyncio.run(ingot_cycle(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT, ORE_CODE= 'iron_ore', BAR_CODE= 'iron_bar', LOCATION= IRON_ROCKS ))
    case 2:
        asyncio.run(yellow_slimes(TOKEN = TOKEN, CHARACTER_NAME= CHAR_INPUT))
    case _:
        print('Bye bye')