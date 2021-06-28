from django.urls import path

from apps.vulnerabilities.api.views import CVEGenericAPIView, CWEGenericAPIView

app_name = 'vulnerabilities'

urlpatterns = [
    path('cves/', CVEGenericAPIView.as_view()),
    path('cves/<str:pk>/', CVEGenericAPIView.as_view()),
    path('cwes/', CWEGenericAPIView.as_view()),
    path('cwes/<str:pk>/', CWEGenericAPIView.as_view()),
    # path('upload', FileUploadView.as_view()),
    # ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
]
