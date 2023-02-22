from typing import Tuple

from httpserver.modules.api.MapAPI import MapAPI

from backend.src.httpserver.httpserver.modules.api.nominatim import get_lat_long
from backend.src.httpserver.httpserver.modules.api.overpass import nearby_point
from backend.src.httpserver.httpserver.modules.api.osrm import determine_travel_time
from backend.src.httpserver.httpserver.modules.api.osrm import TravelOptions


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
        loc_1 = self.convert(loc_1)
        if loc_1 is None:
            return None

        loc_2 = self.convert(loc_2)
        if loc_2 is None:
            return None

        travel_time = determine_travel_time(loc_1, loc_2, TravelOptions.WALK)
        if travel_time is None:
            # TODO: What's an appropriate error here?
            return None

        return travel_time

    def get_nearby_options(self, loc, radius: float, n: int) -> list:
        """
        Note that the input location can be either in lat, long or address form
        """
        loc = self.convert(loc)
        if loc is None:
            # TODO: What's an appropriate error here?
            return None

        points = nearby_point(loc, radius)
        if points is None:
            # TODO: error check
            return []

        # TODO: Look at rating information and reorder list
        return points[:n]
