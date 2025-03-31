from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    # path('stk_push/',views.stk_push, name='stk_push'),
    # path('daraja/makepayment/stk_push/',views.makepayment, name='makepayment')
    path('mpesa/stkpush/', views.stk_push, name='stk'),
    path('mpesa/callback/', views.mpesa_callback, name='mpesa_callback'),
    path('payment/status/<str:transaction_id>/', views.check_payment_status, name='check_payment_status'),

]