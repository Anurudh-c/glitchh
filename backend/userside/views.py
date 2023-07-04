from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer,UserMediaSerializer,UserLoginSerializer
from django.contrib.auth import authenticate, login
from .models import UserMedia
import boto3
from .models import *
from datetime import datetime, timedelta
from rest_framework import generics
from .serializers import UserMediaSerializer
from django.contrib.auth import logout
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class UserLoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)

            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            serializer = UserLoginSerializer({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'access_token': access_token,
            })
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        

class UserLogoutAPIView(APIView):
    def delete(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


class MediaUploadView(APIView):
    def post(self, request):
        try:
            user_id = request.query_params.get('user')
            title = request.data.get('title')
            description = request.data.get('description')
            media_type = request.data.get('media_type')
            media_file = request.data.get('media_file')
            print(request.data,"kkkkkkkkkkkkkkkkkkkkkkkkkk")
            # Get the user instance based on the user ID
            user = User.objects.get(id=user_id)
            print(user,"jjjjjjjjjjjjjjjjjjjjjj")
            # Generate S3 presigned URL
            s3_client = boto3.client('s3')
            expiration_time = datetime.now() + timedelta(days=30)
            expiration_seconds = int((expiration_time - datetime(1970, 1, 1)).total_seconds())
            print(s3_client,"llllllllllllllllllll")
            presigned_url = s3_client.generate_presigned_url(
                'put_object',
                Params={'Bucket': 'glichh-aws-bucket', 'Key': media_file.name},
                ExpiresIn=expiration_seconds  
            )
            print(presigned_url,"yyyyyyyyyyyyyyyy")
            print("gooooood")
            # Upload media file to S3
            s3_client.put_object(Body=media_file, Bucket='glichh-aws-bucket', Key=media_file.name)

            print("tytytytytytyty")
            print(user.id,title,description,media_file,presigned_url,"hhhhhhhhhhhhhhhh")
            UserMedia.objects.create(
            user_id=user.id,
            title=title,
            description=description,
            media_type=media_type,  
            media_file=media_file,
            s3_media_path=presigned_url
            )

            return Response({'message': 'Media upload successful'})
            
        except Exception as e:
            print(f"Error: {e}")
            return Response({'message': 'Media upload failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UserMediaListAPIView(generics.ListAPIView):
    queryset = UserMedia.objects.all()
    serializer_class = UserMediaSerializer

