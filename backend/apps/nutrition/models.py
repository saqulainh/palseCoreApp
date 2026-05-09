from django.db import models
from django.conf import settings

class Meal(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='meals')
    name = models.CharField(max_length=255)
    calories = models.IntegerField(null=True, blank=True)
    protein = models.FloatField(null=True, blank=True)
    carbs = models.FloatField(null=True, blank=True)
    fats = models.FloatField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} on {self.date.date()}"

class Hydration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hydration')
    amount_ml = models.IntegerField()
    date = models.DateField(auto_now_add=True)

class BodyMeasurement(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='measurements')
    weight = models.FloatField()
    body_fat_percentage = models.FloatField(null=True, blank=True)
    date = models.DateField(auto_now_add=True)