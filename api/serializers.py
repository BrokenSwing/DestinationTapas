from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Party, Command, UserMisc, CommandContribution


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=25, write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        read_only = ["id"]

    def create(self, validated_data):
        return User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = []
        depth = 1


class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ["id", "total_price", "leader", "status", "members", "commands", "date", "price_per_user", "end_date"]
        read_only_fields = ["id", "total_price", "leader", "status", "members", "commands", "date", "price_per_user",
                            "end_date"]


class MemberOperationSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=["ADD", "REMOVE"])
    user = serializers.IntegerField()


class UserMiscSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMisc
        fields = ["total_spent"]


class UserFriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMisc
        fields = ["received_requests", "friends", "sent_requests"]


class FriendOperationSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['ACCEPT', 'REFUSE', 'CANCEL', 'REMOVE', 'ADD'])
    user = serializers.IntegerField()


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandContribution
        fields = ["id", "user", "part", "product"]
        read_ony_fields = ["id"]


class CommandSerializer(serializers.ModelSerializer):
    contributions = ContributionSerializer(many=True)

    class Meta:
        model = Command
        fields = ["id", "author", "product", "date", "total_price", "participants", "contributions", "is_complete"]
        read_only_fields = ["id", "author", "date", "total_price", "participants", "is_complete"]
