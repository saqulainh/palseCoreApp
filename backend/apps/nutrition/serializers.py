from rest_framework import viewsets, serializers
from .models import Meal, Hydration, BodyMeasurement

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'
        read_only_fields = ('user', 'date')

class HydrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hydration
        fields = '__all__'
        read_only_fields = ('user', 'date')

class BodyMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BodyMeasurement
        fields = '__all__'
        read_only_fields = ('user', 'date')