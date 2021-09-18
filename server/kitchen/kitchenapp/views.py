from django.shortcuts import render
from rest_framework import viewsets
from .models import Food, KitchenArea, Category
from .serializers import FoodSerializer, KitchenAreaSerializer, CategorySerializer
from django.http import HttpResponse, JsonResponse
from django.core import serializers
# Create your views here.
def index(request):
    return HttpResponse('this is the kitchen app')

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all().order_by('expiry_date')
    serializer_class = FoodSerializer

class KitchenAreaViewSet(viewsets.ModelViewSet):
    queryset = KitchenArea.objects.all()
    serializer_class = KitchenAreaSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer