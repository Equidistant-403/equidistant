from httpserver.modules import Constants
from httpserver.modules.database.BitdotioDB import BitdotioDB

import os


def test_retrieve_db_token():
    """
    This test verifies that the BITIO_API_TOKEN environmental variable
    is set. Without such an environmental variable, connection with the
    database cannot proceed.
    """
    assert os.getenv('BITIO_API_TOKEN') is not None


def test_access_table():
    """
    This test simply checks if a connection to the bit.io database can
    be established. If this test errors, then connection has failed.
    """
    db = BitdotioDB(token=os.getenv('BITIO_API_TOKEN'))
    db.db_query('SELECT')


def test_read_write_from_table():
    """
    This test verifies that it is possible to both read and write to the
    bit.io database.
    """
    db = BitdotioDB(token=os.getenv('BITIO_API_TOKEN'))
    tuples = db.db_query(f'DELETE FROM {Constants.DB_TEST}')  # delete all data from the test table
    assert len(tuples) == 0
    tuples = db.db_query(f'INSERT INTO {Constants.DB_TEST} VALUES (\'some_string\', 42)')
    assert len(tuples) == 0
    tuples = db.db_query(f'SELECT * FROM {Constants.DB_TEST}')
    assert len(tuples) == 1
    assert tuples[0] == ('some_string', 42)


def test_read_no_entries_selected():
    """
    This test ensures correct edge behavior should a read query return
    no matching rows: that is, an empty list.
    """
    db = BitdotioDB(token=os.getenv('BITIO_API_TOKEN'))
    tuples = db.db_query(f'DELETE FROM {Constants.DB_TEST}')  # delete all data from the test table
    assert len(tuples) == 0
    tuples = db.db_query(f'SELECT * FROM {Constants.DB_TEST}')
    assert len(tuples) == 0
