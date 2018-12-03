# -*- coding:utf-8 -*-
from rest_framework import serializers
from .models import *


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'todo_count'
        )


class ToDoSerializers(serializers.ModelSerializer):
    category = CategorySerializers(read_only=True)

    class Meta:
        model = ToDo
        fields = (
            'id',
            'category',
            'contents',
            'start_time',
            'end_time',
        )
