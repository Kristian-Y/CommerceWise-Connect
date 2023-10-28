from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['owner', 'name', 'description', 'price', 'type']


class ProductSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['owner', 'name', 'description', 'price', 'type', 'id']
