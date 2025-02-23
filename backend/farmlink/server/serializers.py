from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()  # Get the custom User model

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('username','email', 'phone', 'first_name', 'last_name', 'password')
        extra_kwargs = {'email': {'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data['email']
        password = data['password']

        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            return {'user': user}

        raise serializers.ValidationError("Invalid credentials")
