from django.urls import path
from proekt.usermanagement import views


urlpatterns = [
    path('register-user/', views.register),
    path('register-company-user/', views.registerCompanyUser),
    path('user-login/', views.login),
    path('test/', views.test)
]