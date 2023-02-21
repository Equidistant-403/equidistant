import secrets


class Bearer:
    """
    The Bearer object keeps track of authentication tokens given to clients on a successful
    login. This token must be presented every time sensitive data is accessed or modified.
    """

    def __init__(self):
        self.bearer_dict = {}

    def add_token(self, value: str) -> str:
        """
        Adds a token to the bearer object to correspond to the identifying value.
        :param value: a string identifying the client
        :return: a random 512-bit number as a string
        """
        token = secrets.token_hex(16)
        while token in self.bearer_dict.keys():  # guarantee no conflicts
            token = secrets.token_hex(16)
        self.bearer_dict[token] = value
        return token

    def verify_token(self, token: str, value: str) -> bool:
        """
        Verifies that a token belongs to a client, returning true if so, and false if not.
        :param token: the authentication token the client provides for authentication
        :param value: a string identifying the client
        :return: true if the token exists and belongs to the client, and false otherwise
        """
        return token in self.bearer_dict.keys() and self.bearer_dict[token] == value

    def revoke_token(self, token: str):
        """
        Revokes a token. After use, the revoked token can no longer be used for authentication,
        including by the client that originally owned the token.
        :param token: the token to revoke.
        """
        if token in self.bearer_dict.keys():
            self.bearer_dict.pop(token)
