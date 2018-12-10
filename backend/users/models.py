# -*- coding:utf-8 -*-
# https://wikidocs.net/6651 참고!!
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator


class UserManager(BaseUserManager):
    def create_user(self, username, email, phone_number=None, password=None):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            phone_number=phone_number
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, phone_number=None):
        user = self.create_user(
            username=username,
            email=email,
            phone_number=phone_number,
            password=password
        )
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_regex = RegexValidator(regex='^\d{11}$', message='Phone length has to be 11 & Only number')

    username = models.CharField(unique=True, null=False, max_length=100)
    email = models.EmailField(unique=True, null=False, max_length=254)
    phone_number = models.CharField(null=True, blank=True, max_length=11, validators=[phone_regex])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.username

    def get_full_name(self):
        return 'email : {0} username : {1}'.format(self.email, self.username)

    def get_short_name(self):
        return self.username

    @property
    def is_staff(self):
        return self.is_superuser
