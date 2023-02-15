from abc import ABC, abstractmethod
import HTTPMethods


class HTTPHandler(ABC):
    """
    HTTPHandler is an abstract class that handles HTTP requests and responses.
    """

    @abstractmethod
    def connection_start(self):
        """
        Connects the backend to the web, from where it can receive and respond
        to requests from the frontend.
        :return: does not return a value.
        """
        pass

    @abstractmethod
    def connection_close(self):
        """
        Disconnects the backend from the web. After this method has finished
        executing, requests to the backend will inevitably timeout. Requests that
        are currently processing should resolve before this method resolves.
        :return: does not return a value.
        """
        pass

    @abstractmethod
    def add_endpoint(self, http_method: HTTPMethods, uri: str, runtime_method):
        """
        Adds an endpoint for the backend to recognize. If a request is received
        with a matching http_method and uri, then the parameters are passed to
        runtime_method for execution.
        %TODO create a class for runtime_method to avoid ambiguous/unclear calls
        :param http_method: the type of HTTPMethod as an Enum (e.g. GET, POST, etc)
        :param uri: the URI of the resource
        :param runtime_method: the method to call when a request matching this
        resource is made.
        :return: does not return a value.
        """
        pass
