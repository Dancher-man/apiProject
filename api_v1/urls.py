from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from api_v1.views import QuotesViewSet, index_view, RatingPlusApiView, RatingMinusApiView

# from api_v1.views import ProductViewSet, OrderProductView, LogoutView

app_name = 'api_v1'

router = DefaultRouter()
router.register(r'quotes', QuotesViewSet, basename='quotes')

urlpatterns = [
    path('', include(router.urls)),
    path('rating_plus/<int:pk>', RatingPlusApiView.as_view(), name='rating_plus'),
    path('rating_minus/<int:pk>', RatingMinusApiView.as_view(), name='rating_minus')
    # path('', QuotesViewSet.as_view(), name='index'),
    # path('login/', obtain_auth_token, name='api_token_auth'),
    # path('logout/', LogoutView.as_view()),
    # path('orders', OrderProductView.as_view()),
    # path('orders/<int:pk>', OrderProductView.as_view())
]
