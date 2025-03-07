"""
URL configuration for farmlink project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from rest_framework.routers import DefaultRouter

from rest_framework import routers

from server.views import UserViewSet,EquipmentViewSet,BookingViewSet,PaymentViewSet,ReviewViewSet,BlogViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'all-equipments', EquipmentViewSet, basename='equipments')
router.register(r'all-booking', BookingViewSet, basename='booking')
router.register(r'payment', PaymentViewSet, basename='payment')


admin.site.site_header='FarmLink'
admin.site.site_title='FarmLink Admin'

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
    path('pay/',include('server.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
