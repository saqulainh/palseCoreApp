from rest_framework import serializers
from .models import Habit, HabitCompletion
from django.utils import timezone

class HabitCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitCompletion
        fields = ('date', 'completed')

class HabitSerializer(serializers.ModelSerializer):
    streak = serializers.SerializerMethodField()
    completed_today = serializers.SerializerMethodField()
    
    class Meta:
        model = Habit
        fields = ('id', 'name', 'description', 'is_active', 'streak', 'completed_today')

    def get_streak(self, obj):
        # Simple streak calculation logic
        completions = obj.completions.filter(completed=True).order_by('-date')
        streak = 0
        current_date = timezone.now().date()
        
        for completion in completions:
            if completion.date == current_date:
                streak += 1
                current_date -= timezone.timedelta(days=1)
            elif completion.date == current_date - timezone.timedelta(days=1):
                streak += 1
                current_date = completion.date - timezone.timedelta(days=1)
            else:
                break
        return streak

    def get_completed_today(self, obj):
        return obj.completions.filter(date=timezone.now().date(), completed=True).exists()