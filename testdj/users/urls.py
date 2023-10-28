from django.urls import path
from testdj.users import views
from testdj.users.views import RegistrationView

urlpatterns = [
    path('register-user/', RegistrationView.as_view(), name='register-api'),
    path('user-login/', views.user_login, name='login-api'),
    path('getCompanies/', views.getCompanies),
    path('is_user_logged_in/', views.is_user_logged_in)
]