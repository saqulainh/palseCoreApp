from django.db import models
from django.conf import settings

class Exercise(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True) # e.g., Strength, Cardio
    
    def __str__(self):
        return self.name

class Workout(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='workouts')
    name = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    duration_minutes = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} on {self.date.date()}"

class ExerciseSet(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='sets')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    reps = models.IntegerField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    duration_seconds = models.IntegerField(null=True, blank=True)
    distance_km = models.FloatField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']