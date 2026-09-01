import asyncio
import os

from dotenv import load_dotenv

from farming_loops.yellow_slime import yellow_slimes
from farming_loops.iron_bar import iron_bars
from farming_loops.copper_bar import copper_bars

from legacy.josiane.fight_loop import CHARACTER_NAME

load_dotenv()

TOKEN = os.getenv("TOKEN")
CHAR_LIST = ['Vaganuki', 'Bertrand', 'josiane', 'alexis', 'X_klave']

CHAR_INPUT = CHAR_LIST[int(input("Please chose a Character you would like to use: \n 0: Vaganuki, 1: Bertrand, 2: josiane, 3: alexis, 4: X_klave\n"))]

TASK_INPUT = int(input('Please chose a task 0: copper, 1: iron, 2: yellow slimes'))

match TASK_INPUT:
    case 0:
        asyncio.run(copper_bars(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT))
    case 1:
        asyncio.run(iron_bars(TOKEN= TOKEN, CHARACTER_NAME= CHAR_INPUT))
    case 2:
        asyncio.run(yellow_slimes(TOKEN = TOKEN, CHARACTER_NAME= CHAR_INPUT))
    case _:
        print('Bye bye')