import os
import responses
import json

from backend.src.httpserver.httpserver.modules.api.nominatim import nominatim_endpoint, address_query
from backend.src.httpserver.httpserver.modules.api.nominatim import get_lat_long

epsilon = 1e-5
response_files = os.path.join(os.path.dirname(os.path.abspath(__file__)), "responses")


@responses.activate
def test_simple_convert():
    """
    Verifies that nominatim response parsing is working correctly
    """
    address = "3800 E Stevens Way NE, Seattle, WA 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(address),
        json=json.load(open(response_files + '/simple_convert.json')),
        status=200
    )

    result = get_lat_long(address)
    assert (result is not None)
    assert (abs(result[0] - 47.6530733) <= epsilon)
    assert (abs(result[1] - -122.3050129) <= epsilon)


@responses.activate
def test_error_convert():
    """
    Verifies that None is returned on server issue
    """
    address = "3800 E Stevens Way NE, Seattle, WA 98195"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(address),
        status=400
    )

    result = get_lat_long(address)
    assert (result is None)


@responses.activate
def test_missing_convert():
    """
    Verifies that None is returned on json missing key information
    """
    address = "3800 E Stevens Way NE, Seattle, WA 98195"

    loaded_json = json.load(open(response_files + '/simple_convert.json'))
    loaded_json[0].pop('lat')
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(address),
        json=loaded_json,
        status=200
    )

    result = get_lat_long(address)
    assert (result is None)


@responses.activate
def test_no_convert():
    """
    Verifies that None is returned on no locations being found
    """
    address = "3800 E Stevens Way NE, Seattle, WA 98196"
    responses.add(
        responses.GET,
        nominatim_endpoint + address_query.format(address),
        json=[],
        status=200
    )

    result = get_lat_long(address)
    assert (result is None)
