def get_client_dto(row):
    return {
        'name': row['Nombre'],
        'email': row['Correo Electronico'],
        'phone': row['Numero de Telefono'],
    }

def get_seller_dto(row):
    return {
        'name': row['Vendedor asignado'],
    }

def get_meeting_dto(row, client, seller):
    return {
        'date': row['Fecha de la Reunion'],
        'closed': row['closed'] == 1,
        'transcription': row['Transcripcion'],
        'clientId': client['id'],
        'sellerId': seller['id'],
    }