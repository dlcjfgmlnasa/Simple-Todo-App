# -*- coding:utf-8 -*-
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ToDoSerializers, CategorySerializers
from .models import ToDo, Category


class CategoryInsertView(APIView):
    def post(self, request):
        serializers_cls = CategorySerializers(data=request.data)
        if serializers_cls.is_valid():
            serializers_cls.save()
            return Response(serializers_cls.data, status=status.HTTP_200_OK)
        return Response(serializers_cls.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDeleteView(APIView):
    def delete(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            category.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializers_cls = CategorySerializers(categories, many=True)
        return Response(serializers_cls.data, status=status.HTTP_200_OK)


class ToDoInsertView(APIView):
    def post(self, request):
        category = request.GET.get('category')
        if category:
            try:
                category = Category.objects.get(id=category)
            except Category.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        serializers_cls = ToDoSerializers(data=request.data)
        if serializers_cls.is_valid():
            serializers_cls.save(category=category)
            return Response(serializers_cls.data, status=status.HTTP_200_OK)
        return Response(serializers_cls.errors, status=status.HTTP_400_BAD_REQUEST)


class ToDoReadUpdateDelete(APIView):
    @staticmethod
    def get_todo_objects(todo_id):
        try:
            return ToDo.objects.get(id=todo_id)
        except ToDo.DoesNotExist:
            return None

    def get(self, request, todo_id):
        todo = self.get_todo_objects(todo_id)

        if todo:
            serializers_cls = ToDoSerializers(todo)
            return Response(serializers_cls.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, todo_id):
        todo = self.get_todo_objects(todo_id)
        if todo:
            serializers_cls = ToDoSerializers(todo, data=request.data)
            if serializers_cls.is_valid():
                serializers_cls.save()
                return Response(serializers_cls.data, status=status.HTTP_200_OK)
            return Response(serializers_cls.errors, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, todo_id):
        todo = self.get_todo_objects(todo_id)
        if todo:
            todo.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_404_NOT_FOUND)


class ToDoListView(APIView):
    def get(self, request):
        todo_list = ToDo.objects.all()
        serializers_cls = ToDoSerializers(todo_list, many=True)
        return Response(serializers_cls.data, status=status.HTTP_200_OK)

    def delete(self, request):
        pk_list = request.POST.getlist('pk')
        todo_list = ToDo.objects.filter(id__in=pk_list)
        if len(pk_list) != todo_list.count():
            return Response(status=status.HTTP_404_NOT_FOUND)
        todo_list.delete()

        return Response(status=status.HTTP_202_ACCEPTED)
