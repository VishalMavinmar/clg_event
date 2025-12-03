# backend/api/views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CR, Student
from .serializers import CRSerializer, StudentSerializer
from rest_framework.decorators import api_view
from .utils import send_whatsapp_message
import threading
from rest_framework import permissions

# ================= CR Signup =================
class CRSignupView(generics.CreateAPIView):
    queryset = CR.objects.all()
    serializer_class = CRSerializer


# ================= CR Login =================
class CRLoginView(generics.GenericAPIView):
    serializer_class = CRSerializer

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password required"}, status=400)

        cr = CR.objects.filter(email=email, password=password).first()

        if cr:
            return Response({
                "message": "Login successful",
                "cr_id": cr.id
            }, status=200)

        return Response({"error": "Invalid credentials"}, status=400)
        
# ================= Add Student =================
class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):   
        student = serializer.save()
        student.refresh_from_db()

        # Prepare WhatsApp message
        message = (
            f"Hey {student.name}, you are successfully registered for the event! 🎉\n"
            f"Your Token Number is {student.token_number}."
        )

        # Format number
        number = student.number.replace("+", "").replace(" ", "")
        if not number.startswith("91"):
            number = "91" + number

        # Send WhatsApp message
        resp = send_whatsapp_message(number, message)
        print("WHATSAPP RESPONSE:", resp)

        self.response_data = {  
            "name": student.name,
            "token_number": student.token_number,
            "message": "Student registered successfully"
        }
# ================= Search Student by Token =================
class StudentSearchView(generics.RetrieveAPIView):
    serializer_class = StudentSerializer
    lookup_field = 'token_number'
    queryset = Student.objects.all()

class StudentByTokenView(generics.RetrieveAPIView):
    serializer_class = StudentSerializer
    lookup_field = 'token_number'
    queryset = Student.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        return {"request": self.request}
    
    

# @api_view(['GET'])
# def student_count(request):
#     count = Student.objects.count()   # <-- automatically counts all rows
#     return Response({"count": count})