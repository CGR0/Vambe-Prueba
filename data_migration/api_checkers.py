import os
import requests
import dotenv
import time

dotenv.load_dotenv()

API_URL = os.getenv('API_URL')

def check_api_running():
    print('Checking if API is running')
    running = False
    while not running:
        try:
            response = requests.get(f'{API_URL}/health')
            if response.status_code == 200:
                print('API is running')
            running = True
        except Exception as e:
            time.sleep(1)

def check_if_data_migrated():
    print('Checking if data is migrated')
    response = requests.get(f'{API_URL}/clients')
    if response.status_code == 200 and len(response.json()) > 0:
        print('Data is already migrated')
        return True
    else:
        print('Data is not migrated')
        return False