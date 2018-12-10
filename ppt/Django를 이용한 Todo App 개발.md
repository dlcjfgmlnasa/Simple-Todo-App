<!-- $theme: default -->

Django를 이용한 TODO App 개발
===

https://github.com/dlcjfgmlnasa/Simple-Todo-App

Created by **Choelhui lee**

---
<!-- page_number: true -->
# Python 설치

## Windows 사용자
- [Python 3.6.7 64bit](https://www.python.org/downloads/release/python-367/) 설치
	+ 설치시 열린마음으로 모든 옵션에 체크

## Linux 사용자
- `pyenv` 설치하거나 혹은 `sudo apt install python3-pip python3-venv`로 필요한 패키지 선택

---
# python virtualenv

![python virtualenv](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/2.%20virtualenv%20python.PNG?raw=true)

---

# python virtualenv

+ 윈도우 사용자의 경우 `PowerShell`을 `CMD`로 변경할 것.
	- `작업 표시줄 설정` > `시작 단추를 마우스 오른쪽[...]` > `Windows PowerShell로 바꾸기` > `끔`

```bash
C:\workspace> mkdir Simple-Todo-App
C:\workspace> cd Simple-Todo-App
C:\workspace\Simple-Todo-App> python -m venv venv
C:\workspace\Simple-Todo-App> venv\Scripts\activate
(venv) C:\workspace\Simple-Todo-App>
```

+ `OS X`, `*NIX` 사용자는 `terminal`을 사용할 것

```bash
[.. 위에 부분 동일]
locs@ ~/Workspace/Simple-Todo-App$ python -m venv venv
locs@ ~/Workspace/Simple-Todo-App$ source venv/bin/activate
```

---

# Django 및 필요한 라이브러리 설치

- 커맨드 라인의 `(venv)`를 항상 확인할 것

```bash
(venv) pip list

Package                Version
---------------------- -------
pip                    18.1
setuptools             39.0.1
```

```bash
(venv) pip install django
...
Sucessfully installed django-2.1.3 pytz-2018.7
```

```bash
(venv) pip list
Package                Version
---------------------- -------
Django                 2.1.3
```

```bash
(venv) pip freeze > requirement.txt
```

---

# Introduction to Django
- A framwork
- Not a programming language
- Very fast for developers
- Secure
- Handy
- User by many big guys (instagram, Pinterest, Spotify, NASA)

<br>

![Introduction to Django](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/1.%20Introduction%20Django.PNG?raw=true)

---

# Django Structure

- Model : Model은 데이터 서비스를 제공
- Tempelate : View로부터 전달된 데이터를 템플릿에 적용하여 Dynamic한 웹페이지를 만드는데 사용 `(React와 연동될껏이기 때문에 사용하지는 않음)`

- View : 필요한 데이터를 모델에서 가져와서 적절히 가공하여 웹 페이지 결과를 만들도록 컨트롤하는 역할

---

<p align="center"> 
  <img src="https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/3.%20Django%20Structure.PNG?raw=true">
</p>

---

# Django 프로젝트 생성

```bash
(venv) django-admin startproject backend
(venv) cd backend
(venv) python manage.py runserver
...
Performing system checks...

Run 'python manage.py migrate' to apply them.
December 04, 2018 - 09:45:17
Django version 2.1.3, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

```bash
(venv) python manage.py migrate
...
Applying sessions.0001_initial... OK
```
---

# Django 앱 추가

```bash
(venv) python manage.py startapp todo-lists
```

+ `backend/settings.py`
```python
DJANGO_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'todo-lists',	# App 추가
]
```

---
+ `backend/settings.py`

```python
DJANGO_APPS = [
    # Default Django apps:
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
]

THIRD_PARTY_APPS = [
]

LOCAL_APPS = [
    'todo-lists',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS
```
---
# Django Model 이란?
- Django Models are Python Classes
- They describe the shape of the data of your application
- Django Models create a Table in the Database (ORM)
---
# What is ORM?
- You write Python
- Django Translates
- The DB gets SQL
<br>

```sql
SELECT * FROM users 
WHERE country="colombia" 
ORDER BY created_date
```

`아래와 같음`

```python
User.objects
    .filter(country="colombia")
    .order_by('created_date')
```
---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0001.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0002.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0003.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0004.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0005.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0006.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0007.jpg?raw=true)

---

# Django Model Fields
  - `models.CharFiled()` : 길이 제한이 있는 문자열 필드
  - `models.TextField()` : 길이 제한이 없는 문자열 필드
  - `models.DateTimeField()` : 날짜와 시간을 같는 필드
  - `models.BooleanField()` : true/false 필드. Null을 허용하기 위해서는 `NullBooleanField()`를 사용
  - `models.FileField()` : 파일 업로드 필드
  - ... 기타 등등

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0008.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0009.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0010.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0011.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0012.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0013.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0014.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0015.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0016.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0017.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0018.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0019.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0020.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0021.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0022.jpg?raw=true)

---

![Understanding Django Models](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Understanding%20Django%20Models-images/0023.jpg?raw=true)

---

![Model Relationships1](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0001.jpg?raw=true)

---

![Model Relationships2](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0002.jpg?raw=true)

---

![Model Relationships3](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0003.jpg?raw=true)

---

![Model Relationships4](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0004.jpg?raw=true)

---

![Model Relationships5](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0005.jpg?raw=true)

---

![Model Relationships6](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0006.jpg?raw=true)

---

![Model Relationships7](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0007.jpg?raw=true)

---

![Model Relationships8](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0008.jpg?raw=true)

---

![Model Relationships9](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0009.jpg?raw=true)

---

![Model Relationships10](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0010.jpg?raw=true)

---

![Model Relationships11](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0011.jpg?raw=true)

---

![Model Relationships12](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0012.jpg?raw=true)

---

![Model Relationships13](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0013.jpg?raw=true)

---

![Model Relationships14](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0014.jpg?raw=true)

---

![Model Relationships15](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0015.jpg?raw=true)

---

![Model Relationships16](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0016.jpg?raw=true)

---

![Model Relationships17](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0017.jpg?raw=true)

---

![Model Relationships18](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0018.jpg?raw=true)

---

![Model Relationships19](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0019.jpg?raw=true)

---


![Model Relationships20](https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/Model%20Relationships-images/0020.jpg?raw=true)

---

# Model 추가
+ `backend/todo-lists/models.py`
```python
from django.db import models
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
```

- `auto_now=True` : save될 때마다 현재 날짜로 갱신
- `auto_now_add=True` : 최초 저장시에만 현재날짜를 적용
- `abstract = True` : model이 실제로 생성되지는 않음
---

## Category Model
	
```python
@python_2_unicode_compatible
class Category(TimeStampedModel):
    name = models.CharField(max_length=100, db_column='NAME')

    class Meta:
        db_table = 'CATEGORY'
        ordering = ['-name']

    def __str__(self):
        return self.name

    def todo_count(self):
        return self.todo.count()

```

- `max_length=100` : 최대 글자 100개 까지
- `ordering` : name 의 역순서대로 정렬
- `db_column` : Column 이름
- `db_table` : Table 이름 

---

## Todo Model

```python
@python_2_unicode_compatible
class ToDo(TimeStampedModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='todo',
        db_column='CATEGORY_ID',
        null=True)
    contents = models.CharField(max_length=200)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'TODO'
        ordering = ['start_time', 'end_time']

    def __str__(self):
        return self.contents
```
---

```python
category = models.ForeignKey(
              Category,
              on_delete=models.PROTECT,
              related_name='todo',
              db_column='CATEGORY_ID',
              null=True)
```
- `on_delete` : 
- `related_name` : 
- `null=True` : DB에서 Null이 허용된다
- `black=True` : `form.is_valud()`가 호출될 때 폼 유효성 검사

---
# Django REST Framework 설치

- **Django** 안에서 **RESTful API**를 쉽게 구축할 수 있도록 도와주는 오픈 소스 라이브러리

<br>

```bash
C:\workspace\Simple-Todo-App> venv\Scripts\activate
(venv) $> pip install djangorestframework
(venv) $> pip install djangorestframework-jwt
```

```bash
(venv) $> cd requirements
(venv) $ requirements> pip freeze > requirements.txt
```
---

- `backend\backend\setting.py`
```python
# REST_FRAMEWORK Setting
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# REST_FRAMEWORK_JWT Setting
JWT_AUTH = {
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': False,
    'JWT_AUTH_HEADER_PREFIX': 'JWT',
}
```

---

# Serializers 추가

- Serializer는 직렬화하는 클래스로서 **모델 인스턴스와 같은 복잡한 JSON, XML 또는 다른 콘텐츠 유형으로 쉽게 변환 가능**
- Serializer는 받는 데이터의 **유효성(validation)** 을 검사한 다음, 복잡한 타입으로 형변환을 할 수 있도록 serialization을 제공

<br>

```bash
[serializers 파일 생성]

$ backend>cd todo-lists
$ backend\todo-lists> vim serializers.py	
```

---
```python
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
```
---

# views 추가

- `backend\todo-lists\views.py`
    
```
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ToDoSerializers, CategorySerializers
from .models import ToDo, Category

class CategoryInsertView(APIView):
    def post(self, request):
    	data = request.data
        serializers_cls = CategorySerializers(data)
        if serializers_cls.is_valid():
            serializers_cls.save()
            return Response(
            	serializers_cls.data, 
                status=status.HTTP_200_OK)
        return Response(
        	serializers_cls.errors, 
            	status=status.HTTP_400_BAD_REQUEST)
```
---

```python
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
        serializers_cls = CategorySerializers(
        	categories, many=True)
            
        return Response(
            serializers_cls.data, 
            status=status.HTTP_200_OK)
```

---

```python
class ToDoInsertView(APIView):
    def post(self, request):
        category = request.GET.get('category')
        if category:
            try:
                category = Category.objects.get(id=category)
            except Category.DoesNotExist:
                return Response(
                	status=status.HTTP_404_NOT_FOUND)

        serializers_cls = ToDoSerializers(data=request.data)
        if serializers_cls.is_valid():
            serializers_cls.save(category=category)
            return Response(
            	serializers_cls.data, 
                status=status.HTTP_200_OK)
        return Response(
        	serializers_cls.errors, 
            status=status.HTTP_400_BAD_REQUEST)
```

---

```python
class ToDoListView(APIView):
    def get(self, request):
        todo_list = ToDo.objects.all()
        serializers_cls =ToDoSerializers(todo_list,many=True)
        return Response(serializers_cls.data, 
                        status=status.HTTP_200_OK)

    def delete(self, request):
        pk_list = request.POST.getlist('pk')
        todo_list = ToDo.objects.filter(id__in=pk_list)
        if len(pk_list) != todo_list.count():
            return Response(status=status.HTTP_404_NOT_FOUND)
        todo_list.delete()

        return Response(status=status.HTTP_202_ACCEPTED)
```

---

```python
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
            return Response(serializers_cls.data, 
            		    status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    .... 아래에 계속 ....
```

---

```python
    def put(self, request, todo_id):
        todo = self.get_todo_objects(todo_id)
        if todo:
            data=request.data
            serializers_cls = ToDoSerializers(todo, data=data)
            if serializers_cls.is_valid():
                serializers_cls.save()
                return Response(
                	serializers_cls.data, 
                        status=status.HTTP_200_OK)
            return Response(serializers_cls.errors, 
            		    status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, todo_id):
        todo = self.get_todo_objects(todo_id)
        if todo:
            todo.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_404_NOT_FOUND)
```
---

# URL 추가

- `backend\todo-lists\urls.py`

```python
# -*- coding:utf-8 -*-
from django.urls import path
from .views import *

app_name = 'todo-lists'

urlpatterns = [
    # category URL
    path('v1/category/', CategoryInsertView.as_view()),
    path('v1/category/<int:category_id>/', 
    			 CategoryDeleteView.as_view()),
    path('v1/category/list/', CategoryListView.as_view()),
    
    # TODO URL
    path('v1/todo/', ToDoInsertView.as_view()),
    path('v1/todo/<int:todo_id>/', 
    			  ToDoReadUpdateDelete.as_view()),
    path('v1/todo/list/', ToDoListView.as_view()),
]
```

---
- `backend\backend\urls.py`

```python
# -*- coding:utf-8 -*-
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token

urlpatterns = [
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh', refresh_jwt_token),
    # todo-lists urls 추가
    path('todo-lists/', 
    	include('todo-lists.urls', namespace='todo-lists')),
]
```
---

# React-Django 연동

---

# Django CORS 설치

## Cross-Domain
- Cross Domain이란 서로 다른 도메인에서 Javascript로 접근하려 하거나 다름 서버에 Ajax 통신의 결과를 받는 행위

## 동일 출처 정책(Cross-Domain Policy)
- 스크립트는 자신을 포함한 문서와 다른 서버에서 불러온 문서의 내용은 읽을 수 없고 다른 서버에서 불러운 문서에는 이벤트 리스너를 등록할 수 없다. 
- 이것은 스크립트가 사용자의 입력을 캐내어 다른 페이지로 흘려보내는 것을 막기 위함이다.(보안상의 이유)

---

## CORS(Cross-Origin Resource Sharing)
- 요즘 사용되는 모던 브라우저는 자바스크립트 인터프린터가 도입됐으며 보안상의 문제를 막기위해 JS의 동일 출처 정책으로 Cross-Domain 이슈를 제한함(Cross-Domain Policy)
- 보안상의 문제 없이 Ajax등의 통신을 하기 위해 사용되는 메커니즘이 CORS임
- CORS 표준은 웹 브라우저가 사용하는 정보를 읽을 수 있도록 허가된 출처 집합를 서버에게 알려주도록 허용하는 HTTP 헤더를 추가함으로써 동작

---

## Django REST API에 CORS 적용
- Django App에서 CORS 메커니즘을 적용하기위해 Response Header에 CORS Header를 추가

```bash
(venv) pip install django-cors-headers
```
- `backend\backend\settings.py`

```python
INSTALLED_APPS = (
    ...
    'corsheaders',
    ...
)
```

```
MIDDLEWARE = [  
    'corsheaders.middleware.CorsMiddleware', # 반드시 최상단에
    'django.middleware.common.CommonMiddleware',
    ...
]
```

---

# React App Build

```bash
locs@locs-ThinkStation-P910:$ cd frontend
locs@locs-ThinkStation-P910:$ yarn install # React 페키지 설치
locs@locs-ThinkStation-P910:$ yarn build   # React 빌드
```
- 아래와 같이 `build` 파일 생성

```
drwxrwxr-x   6 locs locs   4096 12월  6 17:52 ./
drwxrwxr-x  10 locs locs   4096 12월  6 17:51 ../
drwxrwxr-x   3 locs locs   4096 12월  6 17:52 build/
-rw-rw-r--   1 locs locs    285 12월  6 17:51 .gitignore
drwxrwxr-x 896 locs locs  32768 12월  6 17:52 node_modules/
-rw-rw-r--   1 locs locs    448 12월  6 17:51 package.json
drwxrwxr-x   2 locs locs   4096 12월  6 17:51 public/
-rw-rw-r--   1 locs locs     64 12월  6 17:51 README.md
drwxrwxr-x   7 locs locs   4096 12월  6 17:51 src/
-rw-rw-r--   1 locs locs  42017 12월  6 17:51 TUTORIAL.md
-rw-rw-r--   1 locs locs 235420 12월  6 17:51 yarn.lock
```

---

# React Page Veiw 작성

- `backend/backend/views.py`
```
from django.http import HttpResponse
from django.conf import settings
from django.utils.encoding import python_2_unicode_compatible
from django.views.generic import View
import os


@python_2_unicode_compatible
class ReactAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(str(settings.ROOT_DIR), 
            	'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                index.html not found ! build your react app!!
                """,
                status=501)
```

---

# React URL 추가

- `backend/backend/urls.py`

```python
[ ... ]

from backend.views import ReactAppView

urlpatterns = [
    path('', ReactAppView.as_view()),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    [ ... ]
]

```

---

# React -  JS, CSS static Collecting

- `cd frontend\build\`
- `index.html` 파일과 함께 js, css 파일을 함께 들고와야됨
```
drwxrwxr-x 3 locs locs 4096 12월  6 17:52 ./
drwxrwxr-x 6 locs locs 4096 12월  6 17:52 ../
-rw-rw-r-- 1 locs locs  196 12월  6 17:52 asset-manifest.json
-rw-rw-r-- 1 locs locs 3870 12월  6 17:52 favicon.ico
-rw-rw-r-- 1 locs locs  548 12월  6 17:52 index.html
-rw-rw-r-- 1 locs locs  317 12월  6 17:52 manifest.json
-rw-rw-r-- 1 locs locs 3174 12월  6 17:52 service-worker.js
drwxrwxr-x 4 locs locs 4096 12월  6 17:52 static/ # 중요!
```

---

```bash
locs@locs-ThinkStation-P910:$ cd backend
locs@locs-ThinkStation-P910:$ mkdir static # static 파일 생성
```
- `backend/backend/settings.py`


```python
# static 파일 위치 추가
STATIC_ROOT = os.path.join(BASE_DIR, 'static') 

# Collect JS CSS 파일 위치
STATICFILES_DIRS = [
    str(APPS_DIR.path('static')),
    str(ROOT_DIR.path('frontend', 'build', 'static')),
]
```

- `STATICFILES_DIRS` 이용하여 `REACT APP`에 필요한 JS, CSS 파일들을 들고온다

---

- `cd backend` 
- `STATICFILES_DIRS` 파일 들고오기

```bash
locs@locs-ThinkStation-P910:$ python manage.py collectstatic


location as specified in your settings:

    /home/locs/Workspace/Simple-Todo-App/backend/static

This will overwrite existing files!
Are you sure you want to do this?

Type 'yes' to continue, or 'no' to cancel: yes # yes 입력
```

---

- 완료 후 `STATICFILES_DIRS` 주석 처리
- `backend\backend\settings.py`
```python
"""
# Collect JS CSS 파일 위치
STATICFILES_DIRS = [
    str(APPS_DIR.path('static')),
    str(ROOT_DIR.path('frontend', 'build', 'static')),
]
"""
```

---

# TODO APP 실행
- [TODO APP URL](http://164.125.141.205:8002)
- **성공!!**

<p align="center"> 
  <img src="https://github.com/dlcjfgmlnasa/Simple-Todo-App/blob/master/ppt/image/TODO%20APP%20%EC%8B%A4%ED%96%89%20%EA%B2%B0%EA%B3%BC.PNG?raw=true">
</p>

---

<center>
  

# 감사합니다

</center>