from backend.src import Constants
from backend.src.database.BitdotioDB import BitdotioDB


def test_access_table():
    db = BitdotioDB(token='v2_3ywUP_6X5W3jrBqMZQx7Vkyp9DAdN')
    tuples = db.db_query(f'DELETE FROM {Constants.DB_TEST}')  # delete all data from the test table
    assert len(tuples) == 0
    tuples = db.db_query(f'INSERT INTO {Constants.DB_TEST} VALUES (\'some_string\', 42)')
    assert len(tuples) == 0
    tuples = db.db_query(f'SELECT * FROM {Constants.DB_TEST}')
    assert len(tuples) == 1
    assert tuples[0] == ('some_string', 42)

