from django.db import models
from django.conf import settings

class RecoveryScore(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recovery_scores')
    date = models.DateField(auto_now_add=True)
    sleep_hours = models.FloatField(null=True, blank=True)
    sleep_quality = models.IntegerField(null=True, blank=True) # 1-10
    stress_level = models.IntegerField(null=True, blank=True) # 1-10
    hrv = models.IntegerField(null=True, blank=True) # Heart Rate Variability
    rhr = models.IntegerField(null=True, blank=True) # Resting Heart Rate
    score = models.IntegerField(null=True, blank=True) # Calculated 0-100
    
    class Meta:
        unique_together = ('user', 'date')

class MuscleSoreness(models.Model):
    recovery_score = models.ForeignKey(RecoveryScore, on_delete=models.CASCADE, related_name='muscle_soreness')
    muscle_group = models.CharField(max_length=100)
    level = models.IntegerField() # 1-10