from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Equipment,Booking,Payment,Review,FAQ,Contact

admin.site.register(CustomUser, UserAdmin)
admin.site.register(Equipment)
admin.site.register(Booking)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(FAQ)
admin.site.register(Contact)
