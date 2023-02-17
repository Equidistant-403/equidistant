import requests
from typing import Tuple

nominatim_endpoint = "https://nominatim.openstreetmap.org"
address_query = "/search/{0}?format=json"
def get_lat_long(address: str) -> Tuple[float, float]:
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

lat_long_query = "/reverse?lat={0}&lon={1}&format=json"
def lat_long_search(lat_long: Tuple[float, float]) -> dict:
  response = requests.get(nominatim_endpoint + lat_long_query.format(
    lat_long[0], lat_long[1]
  ))

  if response.status_code != 200:
    # TODO: What's an appropriate return type if the request errors?
    return None

  return response.json()

if __name__ == "__main__":
  print(get_lat_long('3800 E Stevens Way NE, Seattle, WA 98195'))