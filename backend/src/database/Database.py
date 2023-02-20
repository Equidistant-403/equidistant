from abc import ABC, abstractmethod


class Database(ABC):
    """
    Database is an abstract class which connects to a database
    and is able to make queries to read and write to it.
    """

    @abstractmethod
    def __init__(self, token: str):
        """
        Initializes the Database object. Requires an API token.
        :param token: the API token of the database
        """
        pass

    @abstractmethod
    def db_query(self, query: str) -> list:
        """
        Queries the database, returning all data matching the query.
        :param query: the query sent to the database in SQL-like language
        :return: an array of tuples of all data that matches the passed query.
        If nothing is returned by the database, then this method returns an empty
        array.
        :raises: ValueError if query is malformed
                 ConnectionError if unable to establish connection with the database
        """
        pass
