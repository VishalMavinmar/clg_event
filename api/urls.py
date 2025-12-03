# backend/api/urls.py
from django.urls import path
from .views import CRSignupView, CRLoginView, StudentCreateView, StudentSearchView

urlpatterns = [
    path('signup/', CRSignupView.as_view(), name='signup'),
    path('login/', CRLoginView.as_view(), name='login'),
    path('students/', StudentCreateView.as_view(), name='add_student'),
    path('students/<int:token_number>/', StudentSearchView.as_view(), name='search_student'),
    # path('api/student-count/', student_count),
]
