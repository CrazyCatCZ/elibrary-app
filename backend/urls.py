from django.contrib import admin
from django.urls import path, re_path
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView
from graphql_jwt.decorators import jwt_cookie
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql/", jwt_cookie(GraphQLView.as_view(graphiql=True))),
    path('robots.txt', TemplateView.as_view(template_name='static/text/robots.txt')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]