import requests
from typing import Tuple
from enum import Enum
from backend.src.api.ApiExceptions import ExternalAPIError, NoRouteFound


class TravelOptions(Enum):
    WALK = "foot"


# Documentation: http://project-osrm.org/docs/v5.5.1/api/#general-options
osrm_walk_endpoint = "https://routing.openstreetmap.de/routed-foot/route/v1/"
travel_time_query = "{0}/{1},{2};{3},{4}?overview=false"


def determine_travel_time(start: Tuple[float, float], end: Tuple[float, float], type: TravelOptions) -> float:
    """
    Determines the amount of time in seconds to travel from 'start' to 'end' via 'type'
    :param start: a latitude, longitude tuple representing the start position
    :param end: a latitude, longitude tuple representing the destination
    :param type: the means by which the user will be traveling
    :return: None if error, else estimated travel time in seconds
    """
    response = requests.get(osrm_walk_endpoint + travel_time_query.format(
        type.value, start[1], start[0], end[1], end[0]
    ))

    if not response.ok:
        raise ExternalAPIError("Issue with external OSRM API")

    response_json = response.json()
    if "routes" not in response_json or len(response_json["routes"]) == 0:
        raise NoRouteFound(f"No route found between {start} and {end}")

    return response_json["routes"][0]['duration']
