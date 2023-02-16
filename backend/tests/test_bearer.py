from backend.src.bearer.Bearer import Bearer


def test_add_one_token():
    bearer = Bearer()
    client = 'client1'
    token = bearer.add_token(client)
    assert bearer.verify_token(token, client)


def test_one_client_multiple_tokens():
    bearer = Bearer()
    client = 'client1'
    token1 = bearer.add_token(client)
    token2 = bearer.add_token(client)
    assert bearer.verify_token(token1, client)
    assert bearer.verify_token(token2, client)


def test_empty_string():
    bearer = Bearer()
    client = ''
    token = bearer.add_token(client)
    assert bearer.verify_token(token, client)


def test_bad_token():
    bearer = Bearer()
    client = 'client1'
    bearer.add_token(client)
    assert not bearer.verify_token('bad_token', client)


def test_multiple_clients():
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
    bearer = Bearer()
    client = 'client1'
    token = bearer.add_token(client)
    assert bearer.verify_token(token, client)
    bearer.revoke_token(token)
    assert not bearer.verify_token(token, client)
