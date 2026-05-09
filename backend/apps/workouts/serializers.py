from rest_framework import serializers
from .models import Workout, Exercise, ExerciseSet

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class ExerciseSetSerializer(serializers.ModelSerializer):
    exercise_name = serializers.ReadOnlyField(source='exercise.name')
    
    class Meta:
        model = ExerciseSet
        fields = ('id', 'exercise', 'exercise_name', 'reps', 'weight', 'duration_seconds', 'distance_km', 'completed', 'order')

class WorkoutSerializer(serializers.ModelSerializer):
    sets = ExerciseSetSerializer(many=True)
    
    class Meta:
        model = Workout
        fields = ('id', 'name', 'date', 'notes', 'duration_minutes', 'sets')
        read_only_fields = ('id', 'date')

    def create(self, validated_data):
        sets_data = validated_data.pop('sets')
        workout = Workout.objects.create(**validated_data)
        for set_data in sets_data:
            ExerciseSet.objects.create(workout=workout, **set_data)
        return workout