from django.test import TestCase
from django.urls import reverse


# Create your tests here.

class AppTests(TestCase):

    def test_receive_response(self):
        """
        Basic test case to determine if app responds to a request. Should be altered after
        logic is updated.
        """
        response = self.client.get(reverse('user'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Thanks for submitting your data')
