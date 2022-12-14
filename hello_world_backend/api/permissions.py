from api.sub_models.profile_info import ProfileInfo
from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_superuser:
            return True

        return False

class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'owner'):
            return request.user.is_superuser or request.user == obj.owner
        elif hasattr(obj, 'profile_info'):
            return request.user.is_superuser or \
                request.user == obj.profile_info.owner
        return False
            
class IsOwnerOrAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_superuser:
            return True

        return False
        
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_superuser or request.user == obj.owner:
            return True

        return False

class IsTeacherOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_superuser:
            return True

        if not hasattr(request.user, 'ProfileInfo'):
            return False

        if request.user.ProfileInfo.all()[0].user_type == 'teacher':
            return True

        return False
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not hasattr(request.user, 'ProfileInfo'):
            return False

        if request.user.is_superuser \
            or (request.user.ProfileInfo.all()[0].user_type == 'teacher' \
                and request.user == obj.owner):
            return True

        return False
