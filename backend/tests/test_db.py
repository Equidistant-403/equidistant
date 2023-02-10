from backend.src import Constants
from backend.src.database.BitdotioDB import BitdotioDB
import os


def test_access_table():
    db = BitdotioDB(token=os.getenv('BITIO_API_TOKEN'))
    db.db_query('SELECT')  # If this statement errors, then connection has failed


def test_read_write_from_table():
    db = BitdotioDB(token=os.getenv('BITIO_API_TOKEN'))
    tuples = db.db_query(f'DELETE FROM {Constants.DB_TEST}')  # delete all data from the test table
    assert len(tuples) == 0
    tuples = db.db_query(f'INSERT INTO {Constants.DB_TEST} VALUES (\'some_string\', 42)')
    assert len(tuples) == 0
    tuples = db.db_query(f'SELECT * FROM {Constants.DB_TEST}')
    assert len(tuples) == 1
    assert tuples[0] == ('some_string', 42)


def test_read_no_entries_selected():
    db = BitdotioDB(token=os.getenv('BITIO_API_TOKEN'))
    tuples = db.db_query(f'DELETE FROM {Constants.DB_TEST}')  # delete all data from the test table
    assert len(tuples) == 0
    tuples = db.db_query(f'SELECT * FROM {Constants.DB_TEST}')
    assert len(tuples) == 0
