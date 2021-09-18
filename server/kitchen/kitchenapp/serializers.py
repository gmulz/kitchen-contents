from rest_framework import serializers

from .models import Food, Category, KitchenArea

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'kitchen_area', 'category', 'expiry_date', 'quantity']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class KitchenAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = KitchenArea
        fields = ['id', 'name']