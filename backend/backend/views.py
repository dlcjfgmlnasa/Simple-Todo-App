# -*- coding:utf-8 -*-
from django.http import HttpResponse
from django.conf import settings
from django.utils.encoding import python_2_unicode_compatible
from django.views.generic import View


@python_2_unicode_compatible
class ReactAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(str(settings.ROOT_DIR), 'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                index.html not found ! build your react app!!
                """,
                status=501,
            )