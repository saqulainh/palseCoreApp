from rest_framework import serializers
from .models import RecoveryScore, MuscleSoreness

class MuscleSorenessSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleSoreness
        fields = ('muscle_group', 'level')

class RecoveryScoreSerializer(serializers.ModelSerializer):
    muscle_soreness = MuscleSorenessSerializer(many=True, required=False)
    
    class Meta:
        model = RecoveryScore
        fields = ('id', 'date', 'sleep_hours', 'sleep_quality', 'stress_level', 'hrv', 'rhr', 'score', 'muscle_soreness')
        read_only_fields = ('id', 'date', 'score')

    def create(self, validated_data):
        soreness_data = validated_data.pop('muscle_soreness', [])
        
        # Simple logic to aggregate today's recovery score
        sleep = validated_data.get('sleep_quality', 5) * 10
        stress = (11 - validated_data.get('stress_level', 5)) * 10
        validated_data['score'] = int((sleep + stress) / 2)
        
        recovery_score = RecoveryScore.objects.create(**validated_data)
        for soreness in soreness_data:
            MuscleSoreness.objects.create(recovery_score=recovery_score, **soreness)
        return recovery_score