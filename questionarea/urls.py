from questionarea.views import QuestionView, RegisterView, QuestionApiView, AnswerView
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'all-questions', QuestionView, basename='all-questions')
router.register(r'answer', AnswerView, basename='answer')

urlpatterns = [
    path('', include(router.urls)),
    path('ques/', QuestionApiView.as_view(), name='ques'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user-registeration/', RegisterView.as_view(), name='create_note'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]