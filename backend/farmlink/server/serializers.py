from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Equipment,Booking,Payment,Review,Blog
User = get_user_model()  # Get the custom User model

class SignupSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('id','username','email', 'phone', 'first_name', 'last_name', 'password')
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
        email = data['email'].strip().lower()
        password = data['password']

        user = User.objects.filter(email__iexact=email).first()

        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            return {'user': user,"id": user.id}

        raise serializers.ValidationError("Invalid credentials")

class EquipmentSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Equipment
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None

class BookingSerializer(serializers.ModelSerializer):
    equipment_id = serializers.PrimaryKeyRelatedField(
        queryset=Equipment.objects.all(), source="equipment", write_only=True
    )
    
    equipment = EquipmentSerializer(read_only=True)  

    class Meta:
        model = Booking
        fields = '__all__'

    def create(self, validated_data):
        """
        When a new booking is created, the equipment should be marked as unavailable.
        """
        booking = super().create(validated_data)

        # Set equipment to unavailable when booking is created
        booking.equipment.available = False
        booking.equipment.save()

        return booking

    def update(self, instance, validated_data):
        """
        Update booking status and equipment availability accordingly.
        """
        previous_status = instance.status
        new_status = validated_data.get('status', instance.status)

        instance.status = new_status
        instance.save()

        # Update equipment availability based on booking status
        if previous_status == "confirmed" and new_status in ["completed", "cancelled"]:
            instance.equipment.available = True  # Make equipment available again
        elif previous_status in ["pending", "cancelled"] and new_status == "confirmed":
            instance.equipment.available = False  # Make equipment unavailable

        instance.equipment.save()
        return instance


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

