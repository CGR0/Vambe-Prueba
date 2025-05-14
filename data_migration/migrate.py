import os
import requests
import dotenv
import csv
from get_dtos import get_client_dto, get_seller_dto, get_meeting_dto
from utils import print_data

dotenv.load_dotenv()

API_URL = os.getenv('API_URL')

def migrate_data():
    with open('data/vambe_clients.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            client = migrate_entity('clients', get_client_dto(row))
            seller = migrate_entity('sellers', get_seller_dto(row))
            migrate_entity('meetings', get_meeting_dto(row, client, seller))

def migrate_entity(entity, body):
    response = requests.post(f'{API_URL}/{entity}', json=body)
    print_data(entity, response)
    return response.json()