class ExternalAPIError(Exception):
    """
    Exception for when there's an issue with an external API
    """
    pass

class NoRouteFound(Exception):
    """
    Exception for when no route is found between two locations
    """
    pass
