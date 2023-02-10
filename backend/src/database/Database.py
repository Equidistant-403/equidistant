import array
from abc import ABC, abstractmethod


class Database(ABC):
    """
    Database is an abstract class which connects to a database
    and is able to make queries to read and write to it.
    """

    @abstractmethod
    def read(self, query: str) -> array:
        """
        Performs a read operation on the database, returning all
        data matching the query.
        :param query: the read query sent to the database
        :return: an array (possibly multidimensional) of all data that
        matches the passed query
        """
        pass

    @abstractmethod
    def write(self, query: str) -> array:
        """
        Performs a write operation on the database, optionally returning
        data as specified by the query.
        :param query: the write query sent to the database
        :return: an array, if nothing is returned by the database then
        an empty array is returned.
        """
        pass
