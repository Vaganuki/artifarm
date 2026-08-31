from time import sleep

import requests


async def move_to(TOKEN, character, x, y):

    url = f"https://api.artifactsmmo.com/my/{character["name"]}/action/move"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }

    body = {"x": x, "y": y}

    try:
        res = requests.post(url, headers=headers, json=body)
        data = res.json()

        if "error" in data:
            raise Exception(data["error"]["message"])

        destination = data["data"]["destination"]
        cooldown = data["data"]["cooldown"]

        print(f"✅ Moved to ({destination['x']}, {destination['y']}) on {destination['name']}")
        print(f"⏳ Cooldown started: {cooldown['total_seconds']} seconds")
        sleep(cooldown["total_seconds"])

    except Exception as e:
        print(f"❌ {e}")
        return False

    return True