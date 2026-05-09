import json
from django.http import StreamingHttpResponse
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Conversation, Message
from openai import OpenAI
from django.conf import settings

class CoachViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def chat(self, request):
        user_query = request.data.get('query')
        conversation_id = request.data.get('conversation_id')
        
        if not user_query:
            return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)

        if conversation_id:
            conversation = Conversation.objects.get(id=conversation_id, user=request.user)
        else:
            conversation = Conversation.objects.create(user=request.user, title=user_query[:50])

        # Save user message
        Message.objects.create(conversation=conversation, role='user', content=user_query)

        # RAG logic (simplified for now as pgvector requires real Postgres)
        # In a real scenario, we would embed user_query and search in Postgres
        context = "User's fitness history: No recent workouts found." 
        
        client = OpenAI() # Uses environment variable OPENAI_API_KEY

        def stream_response():
            full_response = ""
            stream = client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=[
                    {"role": "system", "content": f"You are PulseCore AI Coach. Use this context: {context}"},
                    {"role": "user", "content": user_query}
                ],
                stream=True
            )
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield content
            
            # Save assistant message after stream ends
            Message.objects.create(conversation=conversation, role='assistant', content=full_response)

        return StreamingHttpResponse(stream_response(), content_type='text/plain')