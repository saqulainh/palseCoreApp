from rest_framework import viewsets
from .models import RecoveryScore
from .serializers import RecoveryScoreSerializer

class RecoveryScoreViewSet(viewsets.ModelViewSet):
    serializer_class = RecoveryScoreSerializer

    def get_queryset(self):
        return RecoveryScore.objects.filter(user=self.request.user).prefetch_related('muscle_soreness')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)