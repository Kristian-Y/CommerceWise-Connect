from django.urls import path
from testdj.products import views

urlpatterns = [
    path('create-product/', views.createProduct, name='create-product'),
    path('products/by_owner/<int:owner_id>/', views.products_by_owner, name='products-by-owner'),
    path('product/by_id/<int:product_id>/', views.products_by_id, name='products-by-id'),
]