from django.urls import path
from testdj.users import views
from testdj.users.views import RegistrationView

urlpatterns = [
    path('register-user/', RegistrationView.as_view(), name='register-api'),
    path('user-login/', views.user_login, name='login-api'),
    path('getCompanies/', views.getCompanies, name='get-companies'),
    path('is_user_logged_in/', views.is_user_logged_in, name='is_user_logged_in'),
    path('get_company_by_id/<int:company_id>/', views.getCompany_by_id, name='getCompany_by_id')
]