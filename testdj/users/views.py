from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
# usermanagement/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group
from rest_framework.views import APIView

from .models import CompanyUser, CustomUser, ClientUser
from .serializers import CompanySerializerGet, RegistrationSerializerCompany, RegistrationSerializerClient


class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if 'company_name' in request.data:
            serializer = RegistrationSerializerCompany(data=request.data)
            user_type = 'company'
        else:
            serializer = RegistrationSerializerClient(data=request.data)
            user_type = 'client'

        if serializer.is_valid():
            user = serializer.save()
            if user_type == 'company':
                user.groups.add(Group.objects.get(name='company'))
            else:
                user.groups.add(Group.objects.get(name='client'))
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            return Response({'message': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def getCompanies(request):
    final_data = []
    companies = CompanyUser.objects.all()
    for company in companies:
        serializer = CompanySerializerGet(company)
        final_data.append(serializer.data)

    return Response(final_data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_user_logged_in(request):
    user = request.user
    data = {
        'is_authenticated': True,
        'username': user.username
    }
    return Response(data)
