from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MealViewSet, HydrationViewSet, BodyMeasurementViewSet

router = DefaultRouter()
router.register(r'meals', MealViewSet, basename='meal')
router.register(r'hydration', HydrationViewSet, basename='hydration')
router.register(r'measurements', BodyMeasurementViewSet, basename='measurement')

urlpatterns = [
    path('', include(router.urls)),
]