from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage

class AudioUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES['file']  # Retrieve the uploaded audio file
        file_name = default_storage.save(f"audio/{file.name}", file)  # Save the file
        file_url = default_storage.url(file_name)
        return Response({'file_url': file_url}, status=201)