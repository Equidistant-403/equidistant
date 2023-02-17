import requests
from typing import Tuple, List
from collections import namedtuple


class Node:
    """
    Represents a singular location, called a "node" in overpass
    """

    def __init__(self, id, lat, lon, tags, type):
        """
        Constructs a new node
        :param id: this node's id
        :param lat: this node's latitude
        :param lon: this node's longitude
        :param tags: a dictionary containing all the tags for this node. Tags
            can be found here: https://wiki.openstreetmap.org/wiki/Category:Tags
        """
        self.id, self.lat, self.lon, self.tags = id, lat, lon, tags

    def get_address(self):
        """
        Returns an address representing this node's location
        :return: None if missing necessary tags, otherwise the address
        """
        necessary_tags = ['addr:housenumber',
                          'addr:street', 'addr:city', 'addr:postcode']
        if not all(tag in self.tags for tag in necessary_tags):
            return None

        address = ""
        for tag in necessary_tags:
            address += self.tags[tag] + " "
        return address.strip()

    def get_name(self):
        """
        Returns this node's name
        :return: None if missing name tag, otherwise name
        """
        return self.tags.get('name', None)

    def get_lat_long(self):
        """
        Returns this node's latitude and longitude
        :return: A (lat, long) tuple 
        """
        return (self.lat, self.lon)


# Documentation: https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL
overpass_endpoint = "https://overpass-api.de/api/interpreter"
bounding_query = """
  [out:json][timeout:5];
  node[amenity="restaurant"](around:{0}, {1},{2});
  out;
"""


def nearby_point(lat_long: Tuple[float, float], radius: int) -> List[Node]:
    """
    Finds restaurants within 'radius' around a location given by 'lat_long'
    :param lat_long: a latitude, longitude tuple representing the center of the search
    :param radius: the radius in meters to conduct the search in
    :return: None if error, else estimated travel time in seconds
    """
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

    encoded = [Node(**node) for node in response_json['elements']]
    return encoded
