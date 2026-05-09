from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecoveryScoreViewSet

router = DefaultRouter()
router.register(r'', RecoveryScoreViewSet, basename='recovery')

urlpatterns = [
    path('', include(router.urls)),
]