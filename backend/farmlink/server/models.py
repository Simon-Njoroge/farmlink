from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        """Create and return a superuser with all permissions."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True, blank=True, null=True)

    USERNAME_FIELD = "email"  # Email is used for authentication
    REQUIRED_FIELDS = []  # Still required but not used for login

    objects = CustomUserManager()  # Use the custom manager

    def __str__(self):
        return self.email
    
class Equipment(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="equipment_list")
    name = models.CharField(max_length=100)
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to="equipment_images/", null=True, blank=True)

    def __str__(self):
        return self.name

# Booking model for renting equipment
class Booking(models.Model):
    farmer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="bookings")
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="bookings")
    start_date = models.DateField()
    end_date = models.DateField()
    status_choices = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    status = models.CharField(max_length=10, choices=status_choices, default='pending')

    def __str__(self):
        return f"{self.farmer.username} booked {self.equipment.name}"

# Payment model
class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method_choices = (
        ('ecocash', 'EcoCash'),
        ('mpesa', 'M-Pesa'),
        ('paypal', 'PayPal'),
    )
    payment_method = models.CharField(max_length=10, choices=payment_method_choices)
    payment_status = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"Payment for {self.booking.equipment.name} by {self.booking.farmer.username}"

# Review model for farmers to rate equipment and services
class Review(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(default=5)  # Rating from 1 to 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.booking.equipment.name} by {self.booking.farmer.username}"

# Blog model for sharing farming-related content
class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="blog_posts")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# FAQs model for storing frequently asked questions
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question

# Contact model for handling user inquiries
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
