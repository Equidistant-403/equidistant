from backend.database.Database import Database
from backend import Constants
import array
import bitdotio

class BitdotioDB(Database):
    """
    Implements Database by connecting to bit.io, a database service with a generous free tier.
    Requires the bitdotio Python library.
    """

    def __init__(self, token: str):
        self.db = bitdotio.bitdotio(access_token=token)
        self.db_name = Constants.DB_NAME

    def db_query(self, query: str) -> array:
        try:
            conn = self.db.get_connection(db_name=self.db_name)
            cursor = conn.cursor()
        except:
            raise ConnectionError('Unable to establish connection with database')
        try:
            cursor.execute(query)
            arr = cursor.fetchall()
            cursor.close()
            conn.close()
            return arr
        except:
            raise ValueError('Bad query received')
