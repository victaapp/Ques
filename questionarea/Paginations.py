from rest_framework.pagination import PageNumberPagination

class QuePagination(PageNumberPagination):
  page_size = 5
  last_page_strings = "end"