import os
import responses
import json
import urllib.parse

from backend.src.httpserver.httpserver.modules.api import ApiHandler

from backend.src.httpserver.httpserver.modules.api import nominatim_endpoint, address_query
from backend.src.httpserver.httpserver.modules.api.overpass import overpass_endpoint, bounding_query
from backend.src.httpserver.httpserver.modules.api import osrm_walk_endpoint, travel_time_query
from backend.src.httpserver.httpserver.modules.api import TravelOptions

epsilon = 1e-5
response_files = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "responses")


@responses.activate
def test_travel_time_lat_long():
    """
    Verifies that the handler can find the travel time between two lat, long coords
    """
    start_lat_long = (47.6530733, -122.3050129)
    end_lat_long = (47.649411549999996, -122.30763828060392)
    type = TravelOptions.WALK
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start_lat_long[1], start_lat_long[0], end_lat_long[1], end_lat_long[0]
        ),
        json=json.load(open(response_files + "/cs_plaza_walk.json")),
        status=200
    )
    handler = ApiHandler()
    result = handler.get_travel_time(start_lat_long, end_lat_long)

    assert (result is not None)
    assert (abs(result - 427.8) <= epsilon)


@responses.activate
def test_travel_time_address():
    """
    Verifies that the handler can find the travel time between two addresses
    """
    start = "3800 E Stevens Way NE, Seattle, WA 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(start),
        json=json.load(open(response_files + '/simple_convert.json')),
        status=200
    )
    end = "1959 Northeast Pacific Street Seattle 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(end),
        json=json.load(open(response_files + '/plaza_convert.json')),
        status=200
    )
    start_lat_long = (47.6530733, -122.3050129)
    end_lat_long = (47.649411549999996, -122.30763828060392)
    type = TravelOptions.WALK
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start_lat_long[1], start_lat_long[0], end_lat_long[1], end_lat_long[0]
        ),
        json=json.load(open(response_files + "/cs_plaza_walk.json")),
        status=200
    )
    handler = ApiHandler()
    result = handler.get_travel_time(start, end)

    assert (result is not None)
    assert (abs(result - 427.8) <= epsilon)


@responses.activate
def test_travel_time_mix():
    """
    Verifies that the handler can find the travel time between a lat, long and an address
    """
    end = "1959 Northeast Pacific Street Seattle 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(end),
        json=json.load(open(response_files + '/plaza_convert.json')),
        status=200
    )
    start_lat_long = (47.6530733, -122.3050129)
    end_lat_long = (47.649411549999996, -122.30763828060392)
    type = TravelOptions.WALK
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start_lat_long[1], start_lat_long[0], end_lat_long[1], end_lat_long[0]
        ),
        json=json.load(open(response_files + "/cs_plaza_walk.json")),
        status=200
    )
    handler = ApiHandler()
    result = handler.get_travel_time(start_lat_long, end)

    assert (result is not None)
    assert (abs(result - 427.8) <= epsilon)


@responses.activate
def test_travel_time_error_one():
    """
    Verifies that the handler can handle an error with nominatim
    """
    start = "3800 E Stevens Way NE, Seattle, WA 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(start),
        status=400
    )
    end = "1959 Northeast Pacific Street Seattle 98195"
    handler = ApiHandler()
    result = handler.get_travel_time(start, end)

    assert (result is None)


@responses.activate
def test_travel_time_error_two():
    """
    Verifies that the handler can handle an error with osrm
    """
    start_lat_long = (47.6530733, -122.3050129)
    end_lat_long = (47.649411549999996, -122.30763828060392)
    type = TravelOptions.WALK
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start_lat_long[1], start_lat_long[0], end_lat_long[1], end_lat_long[0]
        ),
        status=400
    )
    handler = ApiHandler()
    result = handler.get_travel_time(start_lat_long, end_lat_long)

    assert (result is None)


@responses.activate
def test_nearby_options_lat_long():
    """
    Verifies the handler can find locations around a point
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
    handler = ApiHandler()
    result = handler.get_nearby_options(lat_long, radius, 10)

    assert (result is not None)
    assert (len(result) == 3)

    result_lat_long = result[0].get_lat_long()
    assert (abs(result_lat_long[0] - 47.6554532) <= epsilon)
    assert (abs(result_lat_long[1] - -122.313141) <= epsilon)

    assert (result[0].get_name() == "Basil Viet Kitchen")
    assert (result[0].get_address() ==
            "4002 University Way Northeast Seattle 98105")


def test_nearby_options_lat_long_n():
    """
    Verifies the handler can find locations around a point
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
    handler = ApiHandler()
    result = handler.get_nearby_options(lat_long, radius, 1)

    assert (result is not None)
    assert (len(result) == 1)


def test_nearby_options_address():
    """
    Verifies the handler can find locations around a point
    """
    start = "3800 E Stevens Way NE, Seattle, WA 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(start),
        json=json.load(open(response_files + '/simple_convert.json')),
        status=200
    )
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
    handler = ApiHandler()
    result = handler.get_nearby_options(start, radius, 10)

    assert (result is not None)
    assert (len(result) == 3)

    result_lat_long = result[0].get_lat_long()
    assert (abs(result_lat_long[0] - 47.6554532) <= epsilon)
    assert (abs(result_lat_long[1] - -122.313141) <= epsilon)

    assert (result[0].get_name() == "Basil Viet Kitchen")
    assert (result[0].get_address() ==
            "4002 University Way Northeast Seattle 98105")
