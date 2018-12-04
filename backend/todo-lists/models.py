# -*- coding:utf-8 -*-
from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_column='CREATED_AT')
    updated_at = models.DateTimeField(auto_now=True, db_column='UPDATE_AT')

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Category(TimeStampedModel):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'CATEGORY'
        ordering = ['-name']

    def __str__(self):
        return self.name

    def todo_count(self):
        return self.todo.count()


@python_2_unicode_compatible
class ToDo(TimeStampedModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='todo',
        db_column='CATEGORY_ID',
        null=True,
    )
    contents = models.CharField(max_length=200, db_column='CONTENTS')
    start_time = models.DateTimeField(null=True, blank=True, db_column='START_TIME')
    end_time = models.DateTimeField(null=True, blank=True, db_column='END_TIME')

    class Meta:
        db_table = 'TODO'
        ordering = ['start_time', 'end_time']
