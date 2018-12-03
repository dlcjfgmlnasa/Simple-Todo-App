# -*- coding:utf-8 -*-
from django.urls import path
from .views import *

app_name = 'todo-lists'

urlpatterns = [
    path('v1/category/', CategoryInsertView.as_view()),
    path('v1/category/<int:category_id>/', CategoryDeleteView.as_view()),
    path('v1/category/list/', CategoryListView.as_view()),

    path('v1/todo/', ToDoInsertView.as_view()),
    path('v1/todo/<int:todo_id>/', ToDoReadUpdateDelete.as_view()),
    path('v1/todo/list/', ToDoListView.as_view()),
]
