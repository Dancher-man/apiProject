from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework.authtoken.models import Token
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, IsAuthenticated, DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from api_v1.models import Quotes
from api_v1.serializers import QuotesModelSerializer, QuotesPutSerializer


def index_view(request):
    return render(request, 'index.html')


class QuotesViewSet(ModelViewSet):
    queryset = Quotes.objects.all()
    serializer_class = QuotesModelSerializer

    # permission_classes = [IsAdminUser, DjangoModelPermissions]

    def get_queryset(self):
        print(self.request.session)
        # print(self.serializer_class)
        # print(self.request.user.has_perm('can_view_moderated'))
        # print(self.kwargs.get('pk'))
        if self.request.user.has_perm('can_view_moderated'):
            quotes = Quotes.objects.all()
        else:
            quotes = Quotes.objects.filter(status='moderated')
        if self.kwargs.get('pk'):
            if self.request.user.has_perm('can_view_moderated'):
                quotes = Quotes.objects.filter(pk=self.kwargs.get('pk'))
            else:
                quotes = Quotes.objects.filter(pk=self.kwargs.get('pk'), status='moderated')
        return quotes

    def get_serializer_class(self):
        if self.request.method == "PUT":
            return QuotesPutSerializer
        return QuotesModelSerializer

    def update(self, request, *args, **kwargs):
        if not self.request.user.has_perm('can_view_moderated'):
            return Response({'error': 'Нет прав'})
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not self.request.user.has_perm('can_view_moderated'):
            return Response({'error': 'Нет прав'})
        return super().destroy(request, *args, **kwargs)


class RatingPlusApiView(View):

    def get(self, request, *args, pk, **kwargs):
        print(pk)
        quote = get_object_or_404(Quotes, pk=pk)
        quote.rating += 1
        quote.save()
        context = {
            'rating': quote.rating,
            'id': quote.pk
        }
        return JsonResponse(context)


class RatingMinusApiView(View):

    def get(self, request, *args, pk, **kwargs):
        print(pk)
        quote = get_object_or_404(Quotes, pk=pk)
        quote.rating -= 1
        quote.save()
        context = {
            'rating': quote.rating,
            'id': quote.pk
        }
        return JsonResponse(context)