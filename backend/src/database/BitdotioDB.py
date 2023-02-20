import psycopg2

from backend.src.database.Database import Database
from backend.src import Constants
import bitdotio


class BitdotioDB(Database):
    """
    Implements Database by connecting to bit.io, a database service with a generous free tier.
    Requires the bitdotio Python library.
    """

    def __init__(self, token: str):
        self.db = bitdotio.bitdotio(access_token=token)
        self.db_name = Constants.DB_NAME

    def db_query(self, query: str) -> list:
        conn = self.db.get_connection(db_name=self.db_name)
        cursor = conn.cursor()
        cursor.execute(query)
        try:
            arr = cursor.fetchall()
        except psycopg2.ProgrammingError:  # nothing to fetch
            arr = ()
        conn.commit()
        cursor.close()
        conn.close()
        return arr
