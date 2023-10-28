from rest_framework import serializers
from django.contrib.auth.models import User

from testdj.users.models import CustomUser, CompanyUser, ClientUser
from rest_framework import serializers


class RegistrationSerializerClient(serializers.ModelSerializer):
    class Meta:
        model = ClientUser
        fields = ['username', 'email', 'password', 'first_name', 'last_name']


class RegistrationSerializerCompany(serializers.ModelSerializer):
    class Meta:
        model = CompanyUser
        fields = ['username', 'email', 'password', 'company_name', 'description']


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class CompanySerializerGet(serializers.ModelSerializer):
    class Meta:
        model = CompanyUser
        fields = ('username', 'company_name', 'email', 'id', 'description')
