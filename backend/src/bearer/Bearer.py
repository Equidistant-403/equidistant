import secrets


class Bearer:
    """
    The Bearer object keeps track of authentication tokens given to clients on a successful
    login. This token must be presented every time sensitive data is accessed or modified.
    """

    def __init__(self):
        self.bearer_dict = {}

    def add_token(self, value: str) -> str:
        token = secrets.token_hex(16)
        while token in self.bearer_dict.keys():  # guarantee no conflicts
            token = secrets.token_hex(16)
        self.bearer_dict[token] = value
        return token

    def verify_token(self, token: str, value: str) -> bool:
        return token in self.bearer_dict.keys() and self.bearer_dict[token] == value
