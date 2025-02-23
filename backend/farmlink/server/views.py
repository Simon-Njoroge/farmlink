from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignupSerializer, LoginSerializer

User = get_user_model()

class UserViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response({
                    'message': 'User created successfully',
                    'user': serializer.data
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(f"Error during user creation: {e}")
                return Response(
                    {"detail": "An error occurred while creating the user."}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.validated_data['user']
                refresh = RefreshToken.for_user(user)

                return Response({
                    'message': 'Login successful',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'phone': user.phone
                    }
                }, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Error during login: {e}")
                return Response(
                    {"detail": "An error occurred while processing your request."}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

