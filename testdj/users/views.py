from django.core.exceptions import ObjectDoesNotExist
# usermanagement/views.py
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, Group
from rest_framework.views import APIView

from .models import CompanyUser, CustomUser, ClientUser
from .serializers import CompanySerializerGet, RegistrationSerializerCompany, RegistrationSerializerClient, \
    LoginSerializer


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


@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['email']
            password = serializer.data['password']

            user = None
            if '@' in username:
                try:
                    user_data = CustomUser.objects.get(email=username)
                    if user_data.password == password:
                        user = CustomUser.objects.get(email=username)
                    else:
                        return Response({'error': 'Invalid password or email'}, status=status.HTTP_401_UNAUTHORIZED)
                except ObjectDoesNotExist:
                    pass
            else:
                return Response({'error': 'Invalid email'}, status=status.HTTP_401_UNAUTHORIZED)

            if user:
                print('Test')
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                user_group = user.groups.first().name
                return Response({'token': token.key, 'user_group': user_group}, status=status.HTTP_200_OK)

        return Response({'error': serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)


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
@permission_classes([AllowAny])
def getCompany_by_id(request, company_id):
    company = CompanyUser.objects.get(id=company_id)
    if company:
        serializer = CompanySerializerGet(company)
        print(serializer.data)
        return Response(serializer.data, status=200)
    return Response("Nqma takava", status=404)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def is_user_logged_in(request):
    user = request.user
    if user:
        data = {
            'user': user.email,
            'is_authenticated': True,
            'company_name': ''
        }
        return Response(data, status=200)
    return Response('nqma', status=401)
