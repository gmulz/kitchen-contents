from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64)

class KitchenArea(models.Model):
    name = models.CharField(max_length=64)

class Food(models.Model):
    name = models.CharField(max_length=256)
    expiry_date = models.DateField()
    quantity = models.IntegerField()
    kitchen_area= models.ForeignKey(
        KitchenArea,
        on_delete=models.CASCADE,
        related_name='foods',
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='foods',
    )