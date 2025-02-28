from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('stk_push/',views.stk_push, name='stk_push'),
    path('daraja/makepayment/stk_push/',views.makepayment, name='makepayment')
]