import asyncio
import os

from dotenv import load_dotenv

from farming_loops.copper_bar import copper_bars

load_dotenv()

TOKEN = os.getenv("TOKEN")
CHAR_LIST = ['Vaganuki', 'Bertrand', 'josiane', 'alexis', 'X_klave']

CHAR_INPUT = CHAR_LIST[int(input("Please chose a Character you would like to use: \n 0: Vaganuki, 1: Bertrand, 2: josiane, 3: alexis, 4: X_klave\n"))]

asyncio.run(copper_bars(TOKEN = TOKEN, CHARACTER_NAME = CHAR_INPUT))
