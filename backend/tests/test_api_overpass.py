import os
import responses
import json
import urllib.parse

from backend.src.httpserver.httpserver.modules.api.overpass import overpass_endpoint, bounding_query
from backend.src.httpserver.httpserver.modules.api.overpass import nearby_point

epsilon = 1e-5
response_files = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "responses")


@responses.activate
def test_nearby_cs_building():
    """
    Verifies that overpass response parsing is working correctly
    """
    radius = 700
    lat_long = (47.6530733, -122.3050129)
    responses.add(
        responses.GET,
        overpass_endpoint +
        "?data=" +
        urllib.parse.quote(bounding_query.format(
            radius, lat_long[0], lat_long[1])),
        json=json.load(open(response_files + '/nearby_cs_building.json')),
        status=200
    )

    result = nearby_point(lat_long, radius)
    assert (result is not None)
    assert (len(result) == 3)

    result_lat_long = result[0].get_lat_long()
    assert (abs(result_lat_long[0] - 47.6554532) <= epsilon)
    assert (abs(result_lat_long[1] - -122.313141) <= epsilon)

    assert (result[0].get_name() == "Basil Viet Kitchen")
    assert (result[0].get_address() ==
            "4002 University Way Northeast Seattle 98105")


@responses.activate
def test_server_error_time():
    """
    Verifies that None is returned on server issue
    """
    radius = 700
    lat_long = (47.6530733, -122.3050129)
    responses.add(
        responses.GET,
        overpass_endpoint +
        "?data=" +
        urllib.parse.quote(bounding_query.format(
            radius, lat_long[0], lat_long[1])),
        status=400
    )

    result = nearby_point(lat_long, radius)
    assert (result is None)


@responses.activate
def test_json_error_time():
    """
    Verifies that None is returned on json issue
    """
    radius = 700
    lat_long = (47.6530733, -122.3050129)

    loaded_json = json.load(open(response_files + '/nearby_cs_building.json'))
    loaded_json.pop("elements")
    responses.add(
        responses.GET,
        overpass_endpoint +
        "?data=" +
        urllib.parse.quote(bounding_query.format(
            radius, lat_long[0], lat_long[1])),
        json=loaded_json,
        status=200
    )

    result = nearby_point(lat_long, radius)
    assert (result is None)
