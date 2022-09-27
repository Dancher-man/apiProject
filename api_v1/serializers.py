from rest_framework import serializers

from api_v1.models import Quotes


class QuotesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotes
        fields = ['id', 'username', 'description', 'email', 'rating', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']


class QuotesPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotes
        fields = ['username', 'description', 'email', 'rating', 'status', 'created_at', 'updated_at']
        read_only_fields = ['username', 'id', 'email', 'created_at', 'updated_at', 'rating']
