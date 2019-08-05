from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


class ViewTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = {'username': 'BrokenSwing', 'password': 'abc'}
        self.response = self.client.post(
            reverse('register'),
            self.user,
            format='json'
        )

    def test_api_can_create_an_user(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
