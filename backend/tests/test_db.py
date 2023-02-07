import unittest
from backend.database.BitdotioDB import BitdotioDB
from backend import Constants


class TestDatabase(unittest.TestCase):

    def test_test_table(self):
        db = BitdotioDB(token='v2_3yqLc_FLiJXrBwLYR65zHT5shxqNs')
        db.db_query(f'DELETE FROM {Constants.DB_TEST}')  # delete all data from the test table
        tuples = db.db_query(f'INSERT INTO Test VALUES (\'some_string\', 42)')
        self.assertEqual(len(tuples), 0)
        tuples = db.db_query(f'SELECT * FROM Test')
        self.assertEqual(len(tuples), 1)
        self.assertEqual(tuples[0], 'some_string')
        self.assertEqual(tuples[1], 42)

    def test_raises_error(self):
        pass


if __name__ == '__main__':
    unittest.main()
