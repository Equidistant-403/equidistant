import requests
import urllib.parse
from typing import Tuple

address_endpoint = "https://nominatim.openstreetmap.org/search/{0}?format=json"
def get_lat_long(address: str) -> Tuple[float, float]:
  response = requests.get(address_endpoint.format(urllib.parse.quote(address)))
  if response.status_code != 200:
    # TODO: What's an appropriate return type if the request errors?
    return None

  response_json = response.json()

  if len(response_json) == 0:
    # Issue with the request, can't parse
    return None
  if "lat" not in response_json[0] or "lon" not in response_json[0]:
    # Issue with the request, can't parse
    return None

  return (float(response_json[0]["lat"]), float(response_json[0]["lon"]))

if __name__ == "__main__":
  # print(get_lat_long('Shivaji Nagar, Bangalore, KA 560001'))
  pass