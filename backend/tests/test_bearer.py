from httpserver.modules.bearer.Bearer import Bearer


def test_add_one_token():
    """
    Basic functionality, after a token is generated we should be able to verify
    possession of the token by the generating client
    """
    bearer = Bearer()
    client = 'client1'
    token = bearer.add_token(client)
    assert bearer.verify_token(token, client)


def test_one_client_multiple_tokens():
    """
    It is ok for a user to have multiple authentication tokens (e.g. logging in from
    multiple devices).
    """
    bearer = Bearer()
    client = 'client1'
    token1 = bearer.add_token(client)
    token2 = bearer.add_token(client)
    assert bearer.verify_token(token1, client)
    assert bearer.verify_token(token2, client)


def test_empty_string():
    """
    It is valid for a client string to be empty - note that this probably shouldn't
    actually happen but it should be allowed behavior.
    """
    bearer = Bearer()
    client = ''
    token = bearer.add_token(client)
    assert bearer.verify_token(token, client)


def test_bad_token():
    """
    If a bearer receives a token that does not exist, no verification should be returned.
    """
    bearer = Bearer()
    client = 'client1'
    bearer.add_token(client)
    assert not bearer.verify_token('bad_token', client)


def test_wrong_client():
    """
    If a bearer receives a token that exists but belongs to a different client, no verification
    should be returned.
    """
    bearer = Bearer()
    client1 = 'client1'
    client2 = 'client2'
    token = bearer.add_token(client1)
    assert not bearer.verify_token(token, client2)


def test_multiple_clients():
    """
    The system should work with multiple clients and multiple tokens.
    """
    bearer = Bearer()
    client1 = 'client1'
    client2 = 'client2'
    token1 = bearer.add_token(client1)
    token2 = bearer.add_token(client2)
    assert bearer.verify_token(token1, client1)
    assert bearer.verify_token(token2, client2)
    assert not bearer.verify_token(token1, client2)
    assert not bearer.verify_token(token2, client1)


def test_revoke_token():
    """Revoking a token should cause the token to no longer verify a client."""
    bearer = Bearer()
    client = 'client1'
    token = bearer.add_token(client)
    assert bearer.verify_token(token, client)
    bearer.revoke_token(token)
    assert not bearer.verify_token(token, client)
