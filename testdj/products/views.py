from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from testdj.products.models import Product
from testdj.products.serializers import ProductSerializer, ProductSerializerGet


# Create your views here.
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createProduct(request):
    serializer = ProductSerializer(data=request.data)
    serializer.initial_data['owner'] = request.user.id
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    print(serializer.errors)
    return Response('pederas', status=401)


@api_view(['GET'])
@permission_classes([AllowAny])
def products_by_owner(request, owner_id):
    try:
        print(owner_id)
        products = Product.objects.filter(owner=owner_id)
        serializer = ProductSerializerGet(products, many=True)

        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'message': 'Owner not found or has no products.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def products_by_id(request, product_id):
    try:
        print(product_id)
        products = Product.objects.get(id=product_id)
        serializer = ProductSerializerGet(products)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'message': 'Owner not found or has no products.'}, status=status.HTTP_404_NOT_FOUND)
