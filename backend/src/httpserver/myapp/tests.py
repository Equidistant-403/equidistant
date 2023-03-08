from django.test import TestCase
from django.urls import reverse
import secrets


# Create your tests here.

class AppTests(TestCase):

    """
    Testing parameters:
    User 'test@email.com' exists with password 'password123'. Is friends with 'blah@email.com'. Has a pending
    friend request from 'test1@email.com'.
    User 'test1@email.com' exists with password 'password987', with a pending friend request to 'test@email.com'
    """

    TEST_EMAIL = 'test@email.com'
    TEST_PW = 'password123'

    def test_login(self):
        """
        Database is populated with a user "test@email.com" with password "password123"
        """
        response = self.client.get(reverse('login'), {'email': self.TEST_EMAIL, 'password': self.TEST_PW})
        self.assertEqual(response.status_code, 200)
        user = response.json()['user']
        self.assertEqual(user['email'], self.TEST_EMAIL)

    def test_login_fail_no_email(self):
        """
        Attempts to login with a non-existent email should return invalid login credentials.
        """
        random_str = secrets.token_hex(16) + '@email.com'
        password = 'pw'
        response = self.client.get(reverse('login'), {'email': random_str, 'password': password})
        self.assertEqual(response.status_code, 401)
        self.assertTrue('error' in response.json())
        self.assertEqual(response.json()['error'], 'Invalid login credentials')

    def test_login_fail_wrong_password(self):
        """
        Attempts to login with an existing email but incorrect password should return invalid login credentials.
        """
        password = 'pw'
        response = self.client.get(reverse('login'), {'email': self.TEST_EMAIL, 'password': password})
        self.assertEqual(response.status_code, 401)
        self.assertTrue('error' in response.json())
        self.assertEqual(response.json()['error'], 'Invalid login credentials')

    def test_create_user(self):
        """
        Create a new user. Generates random login credentials and attempts to create an account.
        """
        email = secrets.token_hex(16) + '@email.com'
        pw = secrets.token_hex(8)
        addr = 'blah'
        response = self.client.post(reverse('create'), {'email': email, 'password': pw, 'address': addr})
        self.assertEqual(response.status_code, 201)
        self.assertTrue('email' in response.json())
        self.assertTrue('address' in response.json())
        self.assertEqual(response.json()['email'], email)
        self.assertEqual(response.json()['address'], addr)

    def test_no_duplicate_users(self):
        """
        Attempting to create a user with an email that already exists should fail.
        """
        addr = 'blah'
        response = self.client.post(reverse('create'), {'email': self.TEST_EMAIL, 'password': self.TEST_PW, 'address': addr})
        self.assertEqual(response.status_code, 400)
        self.assertTrue('error' in response.json())
        self.assertEqual(response.json()['error'], 'Cannot make account with provided parameters')

    def test_get_user(self):
        """
        Must login first to obtain authentication token. This test assumes that all login tests pass.
        """
        login_response = self.client.get(reverse('login'), {'email': self.TEST_EMAIL, 'password': self.TEST_PW})
        token = login_response.json()['bearer']

        user_response = self.client.get(reverse('user'), {'email': self.TEST_EMAIL}, HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(user_response.status_code, 200)
        self.assertTrue('email' in user_response.json())
        self.assertEqual(user_response.json()['email'], self.TEST_EMAIL)

    def test_user_requires_token(self):
        """
        If attempt to access the token endpoint does not have an authorization header, access fails.
        """
        user_response = self.client.get(reverse('user'), {'email': self.TEST_EMAIL})
        self.assertEqual(user_response.status_code, 401)
        self.assertTrue('error' in user_response.json())
        self.assertEqual(user_response.json()['error'], 'access forbidden')

    def test_get_friends(self):
        """
        Must login first to obtain token.
        """
        login_response = self.client.get(reverse('login'), {'email': self.TEST_EMAIL, 'password': self.TEST_PW})
        token = login_response.json()['bearer']

        friend_response = self.client.get(reverse('friends'), {'email': self.TEST_EMAIL}, HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(friend_response.status_code, 200)
        self.assertTrue('friends' in friend_response.json())
        self.assertTrue('friend_requests' in friend_response.json())
        self.assertEqual(len(friend_response.json()['friends']), 1)
        self.assertEqual(friend_response.json()['friends'][0]['email'], 'blah@email.com')
        self.assertEqual(len(friend_response.json()['friend_requests']), 1)
        self.assertEqual(friend_response.json()['friend_requests'][0]['email'], 'test1@email.com')

