from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
# usermanagement/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import CompanyUser, CustomUser
from .serializers import UserSerializer, CompanySerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def registerCompanyUser(request):
    serializer = CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def custom_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if the username exists in either user model
    company_user = CompanyUser.objects.filter(email=email).first()
    custom_user = CustomUser.objects.filter(email=email).first()

    if company_user:
        user = authenticate(request, email=company_user.email, password=password)
    elif custom_user:
        user = authenticate(request, email=custom_user.email, password=password)
    else:
        user = None

    if user is not None:
        login(request, user)
        return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
    return Response({'detail': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def test(request):
    email = request.data.get('email')
    password = request.data.get('password')
    username = email.split('@')[0]
    # Check if the username exists in either user model
    company_user = CompanyUser.objects.filter(username=username).first()
    custom_user = CustomUser.objects.filter(username=username).first()

    if company_user and company_user.password == password:
        login(request, company_user)
        return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
    elif custom_user and custom_user.password == password:
        login(request, custom_user)
        print('custom_user')
        return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        print('test')
        return Response({'detail': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)
