import requests
from django.conf import settings

def send_whatsapp_message(to, message):
    url = f"https://graph.facebook.com/v19.0/{settings.WHATSAPP_PHONE_ID}/messages"
    
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": message},
    }

    headers = {
        "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
        "Content-Type": "application/json",
    }

    try:
        r = requests.post(url, json=payload, headers=headers)
        return r.json()
    except Exception as e:
        print("WhatsApp Error:", e)
        return {"error": str(e)}
