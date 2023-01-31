import array
from abc import ABC, abstractmethod


class MapAPI(ABC):
    """
    MapAPI interacts with an external map service API to handle various
    distance and location-related queries.
    """

    @abstractmethod
    def get_travel_time(self, loc_1, loc_2) -> float:
        """
        Gets an approximate travel time from loc_1 to loc_2.
        %TODO determine an appropriate way to represent locations.
        :param loc_1: the origin location
        :param loc_2: the destination
        :return: a float representing time in minutes to travel from
        loc_1 to loc_2
        """

    @abstractmethod
    def get_nearby_options(self, loc, radius: float, n: int) -> array:
        """
        Gets a list of recommended locations within a certain distance from
        a location.
        %TODO determine an appropriate way to represent locations.
        :param loc: the center of the search
        :param radius: the radius (in miles) of the search; all recommended
        locations should be at most this far from loc
        :param n: the number of options to return
        :return: an array of locations that match the passed parameters.
        """