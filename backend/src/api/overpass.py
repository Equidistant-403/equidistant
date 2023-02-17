import requests
from typing import Tuple

overpass_endpoint = "https://overpass-api.de/api/interpreter"
bounding_query = """
  [out:json][timeout:5];
  node[amenity="restaurant"](around:{0}, {1},{2});
  out;
"""


def nearby_point(lat_long: Tuple[float, float], radius: int) -> dict:
    response = requests.get(overpass_endpoint, params={
        'data': bounding_query.format(
            radius, lat_long[0], lat_long[1]
        )
    })

    if response.status_code != 200:
        # TODO: What's a useful response here
        return None

    response_json = response.json()
    if "elements" not in response_json:
        # TODO: What's a useful response here
        return None

    return response_json['elements']


if __name__ == "__main__":
    print(nearby_point((47.6579925, -122.3133866), 1000))
