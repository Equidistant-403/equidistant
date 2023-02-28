import array
from abc import ABC, abstractmethod
from mapbox import DirectionsMatrix, Geocoder


class MapboxAPI(MapAPI):
    """
    Using Mapbox API in this case, casue it is the best option we have when it comes to a free and python centric api
    """

    def __init__(self, access_token):
        self.access_token = access_token
        self.directions_matrix = DirectionsMatrix(access_token=self.access_token)
        self.geocoder = Geocoder(access_token=self.access_token)

    def get_travel_time(self, loc_1, loc_2):
        coords_1 = self._get_coordinates(loc_1)
        coords_2 = self._get_coordinates(loc_2)
        response = self.directions_matrix.matrix(
            coords_1, coords_2, annotations=["duration"], profile="driving-traffic"
        )
        return response["durations"][0][0] / 60.0

    def get_nearby_options(self, loc, radius, n):
        coords = self._get_coordinates(loc)
        response = self.geocoder.forward(
            query="", proximity=coords, types=["poi"], limit=n
        )
        options = []
        for feature in response.geojson()["features"]:
            feature_coords = feature["geometry"]["coordinates"]
            distance = self._get_distance(coords, feature_coords)
            if distance <= radius:
                options.append(feature_coords)
        return array.array("f", [option for coords in options for option in coords])

    def _get_coordinates(self, loc):
        response = self.geocoder.forward(query=loc)
        coords = response.geojson()["features"][0]["geometry"]["coordinates"]
        return coords

    def _get_distance(self, coords_1, coords_2):
        response = self.directions_matrix.matrix(
            coords_1,
            coords_2,
            annotations=["distance"],
            profile="driving-traffic",
        )
        return response["distances"][0][0] / 1609.34
