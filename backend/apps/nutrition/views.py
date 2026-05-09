from rest_framework import viewsets, serializers
from .models import Meal, Hydration, BodyMeasurement
from .serializers import MealSerializer, HydrationSerializer, BodyMeasurementSerializer

class MealViewSet(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    def get_queryset(self):
        return Meal.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HydrationViewSet(viewsets.ModelViewSet):
    serializer_class = HydrationSerializer
    def get_queryset(self):
        return Hydration.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BodyMeasurementViewSet(viewsets.ModelViewSet):
    serializer_class = BodyMeasurementSerializer
    def get_queryset(self):
        return BodyMeasurement.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)