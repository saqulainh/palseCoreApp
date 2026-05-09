from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet, ExerciseViewSet

router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet)
router.register(r'', WorkoutViewSet, basename='workout')

urlpatterns = [
    path('', include(router.urls)),
]