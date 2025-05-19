import os
import requests
import dotenv
import csv
from get_dtos import get_client_dto, get_seller_dto, get_meeting_dto
from utils import print_data
import time

dotenv.load_dotenv()

API_URL = os.getenv('API_URL')

def migrate_data():
    print()
    print('Migrando datos...')
    print()
    with open('data/vambe_clients.csv', 'r') as file:
        reader = csv.DictReader(file)
        count = 1
        for row in reader:
            client = migrate_entity('clients', get_client_dto(row))
            seller = migrate_entity('sellers', get_seller_dto(row))
            migrate_entity('meetings', get_meeting_dto(row, client, seller))
            print('--------------------------------')
            print(f'Filas migradas: {count}')
            print('--------------------------------')
            print()
            time.sleep(25)
            count += 1

def migrate_entity(entity, body, retries=0):
    try:
        response = requests.post(f'{API_URL}/{entity}', json=body)
        print_data(entity, response)
        return response.json()
    except Exception as e:
        print(f'Error al migrar {entity}: {e}')
        if retries < 3:
            print('Reintentando...')
            time.sleep(25)
            return migrate_entity(entity, body, retries + 1)
        else:
            print('Error al migrar {entity}: {e}')
            return None