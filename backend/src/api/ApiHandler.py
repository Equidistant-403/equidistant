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

    def convert(loc):
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
