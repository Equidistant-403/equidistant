import requests
from typing import Tuple

# Documentation: https://nominatim.org/release-docs/develop/api/Overview/
nominatim_endpoint = "https://nominatim.openstreetmap.org"
address_query = "/search/{0}?format=json"


def get_lat_long(address: str) -> Tuple[float, float]:
    """
    Returns a latitude, longitude tuple for the given address
    :param address: the address to find lat, long for
    :return: None if error, else the lat, long tuple
    """
    response = requests.get(nominatim_endpoint + address_query.format(address))

    if response.status_code != 200:
        # TODO: What's an appropriate return type if the request errors?
        return None

    response_json = response.json()
    if (len(response_json) == 0 or
            "lat" not in response_json[0] or "lon" not in response_json[0]):
        # TODO: What's an appropriate return type if the request errors?
        return None

    return (float(response_json[0]["lat"]), float(response_json[0]["lon"]))
