from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from apps.workouts.models import Workout
from apps.recovery.models import RecoveryScore
from apps.habits.models import Habit
from apps.workouts.serializers import WorkoutSerializer
from apps.recovery.serializers import RecoveryScoreSerializer
from apps.habits.serializers import HabitSerializer

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        user = request.user

        # Fetch today's data
        workout = Workout.objects.filter(user=user, date__date=today).first()
        recovery = RecoveryScore.objects.filter(user=user, date=today).first()
        habits = Habit.objects.filter(user=user, is_active=True)

        return Response({
            'today_workout': WorkoutSerializer(workout).data if workout else None,
            'today_recovery': RecoveryScoreSerializer(recovery).data if recovery else None,
            'active_habits': HabitSerializer(habits, many=True).data,
            'date': today
        })