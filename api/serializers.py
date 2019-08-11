from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FriendRequest, Product, Party, Command


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=200, write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        read_only = ["id"]

    def create(self, validated_data):
        return User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])


class FriendRequestsSerializer(serializers.ModelSerializer):

    status = serializers.ChoiceField(['PENDING', 'ACCEPTED', 'REJECTED'], default='PENDING')

    class Meta:
        model = FriendRequest
        fields = ["sender", "target", "request_date", "status"]
        read_only_fields = ['request_date']


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = []
        depth = 1


class PartySerializer(serializers.ModelSerializer):

    class Meta:
        model = Party
        fields = ["id", "total_price", "leader", "status", "members", "commands", "date", "price_per_user"]
        read_only_fields = ["id", "total_price", "leader", "status", "members", "commands", "date", "price_per_user"]


class CommandSerializer(serializers.ModelSerializer):

    product = ProductSerializer()

    class Meta:
        model = Command
        fields = ["author", "product", "contributions", "date", "total_price"]
