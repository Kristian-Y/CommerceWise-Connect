from django.urls import path
from testdj.products import views

urlpatterns = [
    path('create-product/', views.createProduct, name='create-product')
]