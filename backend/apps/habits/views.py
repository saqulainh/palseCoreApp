from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Habit, HabitCompletion
from .serializers import HabitSerializer

class HabitViewSet(viewsets.ModelViewSet):
    serializer_class = HabitSerializer

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle(self, request, pk=None):
        habit = self.get_object()
        today = timezone.now().date()
        completion, created = HabitCompletion.objects.get_or_create(habit=habit, date=today)
        
        if not created:
            completion.completed = not completion.completed
            completion.save()
        
        return Response({'completed': completion.completed, 'streak': self.get_serializer(habit).data['streak']})