from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'food', views.FoodViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'kitchen_areas', views.KitchenAreaViewSet)


urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
]