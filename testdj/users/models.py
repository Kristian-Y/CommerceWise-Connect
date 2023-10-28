from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class CustomUser(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name='custom_user_groups'  # Specify a unique related_name
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='custom_user_permissions'  # Specify a unique related_name
    )


class CompanyUser(CustomUser):
    company_name = models.CharField(max_length=40)
    description = models.TextField()


class ClientUser(CustomUser):
    pass


group, created = Group.objects.get_or_create(name='company')
group, created = Group.objects.get_or_create(name='client')
