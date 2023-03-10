import os
import responses
import json
import pytest

from httpserver.modules.api.ApiExceptions import ExternalAPIError, NoRouteFound
from httpserver.modules.api.osrm import TravelOptions
from httpserver.modules.api.osrm import osrm_walk_endpoint, travel_time_query
from httpserver.modules.api.osrm import determine_travel_time

epsilon = 1e-5
response_files = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "responses")


@responses.activate
def test_travel_time():
    """
    Verifies that osrm response parsing is working correctly
    """
    start = (47.6530733, -122.3050129)
    end = (47.649378, -122.3077192)
    type = TravelOptions.WALK
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start[1], start[0], end[1], end[0]
        ),
        json=json.load(open(response_files + '/cs_plaza_walk.json')),
        status=200
    )

    result = determine_travel_time(start, end, type)
    assert (result is not None)
    assert (abs(result - 427.8) <= epsilon)


@responses.activate
def test_server_error_time():
    """
    Verifies that error is raised on server issue
    """
    start = (47.6530733, -122.3050129)
    end = (47.649378, -122.3077192)
    type = TravelOptions.WALK
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start[1], start[0], end[1], end[0]
        ),
        status=400
    )

    with pytest.raises(ExternalAPIError):
        determine_travel_time(start, end, type)


@responses.activate
def test_json_error_time():
    """
    Verifies that error is raised when no path is found
    """
    start = (47.6530733, -122.3050129)
    end = (47.649378, -122.3077192)
    type = TravelOptions.WALK

    loaded_json = json.load(open(response_files + '/cs_plaza_walk.json'))
    loaded_json['routes'] = []
    responses.add(
        responses.GET,
        osrm_walk_endpoint + travel_time_query.format(
            type.value, start[1], start[0], end[1], end[0]
        ),
        json=loaded_json,
        status=200
    )

    with pytest.raises(NoRouteFound):
        determine_travel_time(start, end, type)
