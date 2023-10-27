from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


# Create your models here.

class CustomUser(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        Group,
        blank=True,
        related_name='customuser_groups'  # Use a unique related_name
    )

    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name='customuser_user_permissions'  # Use a unique related_name
    )


class CompanyUser(AbstractUser):
    companyName = models.CharField(max_length=30)
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        Group,
        blank=True,
        related_name='CompanyUser_groups'  # Use a unique related_name
    )

    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name='CompanyUser_user_permissions'  # Use a unique related_name
    )
