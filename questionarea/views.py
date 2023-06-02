from django.http import HttpResponse
from urllib import request
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from django.http import JsonResponse

from rest_framework.pagination import PageNumberPagination

from .Paginations import QuePagination
from .serializers import *
# Create your views here.




class RegisterView(APIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        request_data = request.data.copy()
        request_data['username'] = request.data.get('email')
        serializer = self.serializer_class(data= request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




class QuestionApiView(APIView):
    serializer_class = QuesSerializer

    def get(self, request):
        qs = Question.objects.all().order_by('-id')
        if qs:
            serializer = self.serializer_class(qs, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:    
            return Response({"result":"data not found"}, status = status.HTTP_404_NOT_FOUND)


class QuestionView(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    # pagination_class = QuePagination
    serializer_class = QuestionSerializer
    queryset = Question.objects.all().order_by('-id')
    

    def get_queryset(self):
        self.permission_classes = [AllowAny,]
        return super().get_queryset()

    def create(self, request):
        request_data = request.data.copy()
        request_data["ask_by"] = request.user.id
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get",], permission_classes=(AllowAny,))
    def answers(self, request, pk=None):
        qs = Answer.objects.filter(question=pk)
        serializer = AnswerSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnswerView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all().order_by('-id')


    def create(self, request):
        request_data = request.data.copy()
        request_data["ans_by"] = request.user.id
        request_data["question"] = int(request.data['question'])
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




class que(APIView):
    def get(self,request):
        return HttpResponse("ASDAFD")