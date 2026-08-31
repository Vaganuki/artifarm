import requests

async def craft_item(headers,c_url,code,quantity):
    try:
        c_body = {'code': code, 'quantity': quantity}
        c_response = requests.post(c_url, headers = headers, json=c_body)
        c_data = c_response.json()

        if "error" in c_data:
            raise Exception(c_data["error"]["message"])

        cooldown = c_data["data"]["cooldown"]

        print(f"✅ Crafted copper_bar")
        print(f"⏳ Cooldown started: {cooldown['total_seconds']} seconds")
        sleep(cooldown['total_seconds'])
    except Exception as e:
        print(f"❌ {e}")
        return e