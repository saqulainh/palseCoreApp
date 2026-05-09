from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/workouts/', include('apps.workouts.urls')),
    path('api/v1/recovery/', include('apps.recovery.urls')),
    path('api/v1/habits/', include('apps.habits.urls')),
    path('api/v1/nutrition/', include('apps.nutrition.urls')),
    path('api/v1/coach/', include('apps.coach.urls')),
    path('api/v1/', include('apps.core.urls')),
]

# API Documentation
urlpatterns += [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]