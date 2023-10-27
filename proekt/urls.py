
from django.contrib import admin
from django.urls import path, include
from proekt import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('usermanagment/', include('proekt.usermanagement.urls'))
]
