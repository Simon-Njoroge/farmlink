from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """Custom permission to allow only the owner of a booking to access it."""

    def has_object_permission(self, request, view, obj):
        return obj.farmer == request.user  # Allow only the owner of the booking
