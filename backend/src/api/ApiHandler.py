from typing import Tuple

from backend.src.MapAPI import MapAPI

from backend.src.api.nominatim import get_lat_long
from backend.src.api.overpass import nearby_point
from backend.src.api.osrm import determine_travel_time
from backend.src.api.osrm import TravelOptions


class ApiHandler(MapAPI):
    """
    Implements MapAPI by connecting to three APIs: nominatim, overpass, and OSRM
    Nominatim handles converting addresses to lat, long pairs
    Overpass handles searching for locations in a radius around a center
    OSRM handles routing and time estimations
    All are free and open source
    """

    def convert(self, loc):
        """
        Helper method that converts a given address to a latitude, longitude representation.
        If the given location is already lat, long nothing happens
        :param loc: The given location, either address or lat, long form
        :return: None if error, else the lat, long tuple
        """
        if not isinstance(loc, Tuple):
            # Assume it's an address and convert
            loc = get_lat_long(loc)
        return loc

    def get_travel_time(self, loc_1, loc_2) -> float:
        """
        Note that the input locations can be either in lat, long or address form
        """
        converted_loc_1 = self.convert(loc_1)
        if converted_loc_1 is None:
            raise ValueError(f"loc_1 value: {loc_1} is not an addres or lat, long tuple")
        converted_loc_2 = self.convert(loc_2)
        if converted_loc_2 is None:
            raise ValueError(f"loc_2 value: {loc_2} is not an addres or lat, long tuple")

        return determine_travel_time(converted_loc_1, converted_loc_2, TravelOptions.WALK)

    def get_nearby_options(self, loc, radius: float, n: int) -> list:
        """
        Note that the input location can be either in lat, long or address form
        """
        converted_loc = self.convert(loc)
        if converted_loc is None:
            raise ValueError(f"loc value: {loc} is not an addres or lat, long tuple")

        points = nearby_point(converted_loc, radius)

        # TODO: Look at rating information and reorder list
        return points[:n]
