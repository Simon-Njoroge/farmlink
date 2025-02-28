from django.shortcuts import render,redirect
from .models import Equipment,Booking,Payment,Review,Blog
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignupSerializer, LoginSerializer,EquipmentSerializer,BookingSerializer,PaymentSerializer,ReviewSerializer,BlogSerializer
from . credentials import MpesaAccessToken, MpesaPassword
import requests

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
    

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    lookup_field = "id"

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.select_related("equipment").all()
    serializer_class = BookingSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

def makepayment(request):
    return render(request,'pay.html')

def stk_push(request):
    if request.method == "POST":
        phone_number = request.POST.get('phone_number')
        amount = request.POST.get('amount')

        access_token = MpesaAccessToken.validated_token

        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

        headers = {"Authorization": "Bearer %s" % access_token}
        payload={    
           "BusinessShortCode": MpesaPassword.shortcode,    
           "Password": MpesaPassword.decoded_password,    
           "Timestamp":MpesaPassword.timestamp,    
           "TransactionType": "CustomerPayBillOnline",    
           "Amount": amount,    
           "PartyA":phone_number,    
           "PartyB":MpesaPassword.shortcode,    
           "PhoneNumber":phone_number,    
           "CallBackURL": "https://mydomain.com/pat",    
           "AccountReference":"Test",    
           "TransactionDesc":"Test"
}
        response = requests.post(api_url, json=payload, headers=headers)
        return redirect('http://localhost:5173/en-us/safaricom/makepayment/stkpush')
def thank_you(request):
    return render(request,'success.html')