from rest_framework import serializers
from django.contrib.auth.models import User

from proekt.usermanagement.models import CustomUser, CompanyUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('firstName', 'lastName', 'email', 'password')


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyUser
        fields = ('companyName', 'email', 'password')
