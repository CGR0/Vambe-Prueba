from api_checkers import check_api_running, check_if_data_migrated
from migrate import migrate_data

if __name__ == '__main__':
    check_api_running()
    if not check_if_data_migrated():
        migrate_data()
        print('Data migrated successfully')