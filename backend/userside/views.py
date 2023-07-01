from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
from django.contrib.auth import authenticate, login

from .models import UserMedia
import boto3




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
            print(user.id)

            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        

import boto3
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import MediaUploadSerializer

# class MediaUploadView(APIView):
#     def post(self, request):
#         print(request.data,"llllllllllllllllllllllllllllll")
#         user = request.query_params.get('user')
#         title = request.data.get('title')
#         description = request.data.get('description')
#         media_file = request.data.get('media_file')

        

#         print(request.data)
#         print("hrlooooooooooooooooooooo")
#         # Generate S3 presigned URL
#         s3_client = boto3.client('s3')
#         print(s3_client,"pppppppppppppppppppppppppppp")
#         presigned_url = s3_client.generate_presigned_url(
#             'put_object',
#             Params={'Bucket': 'my-glitchh-media', 'Key': media_file.name},
#             ExpiresIn=3600  # Set the expiration time as needed
#         )

#         print(presigned_url,"ggggggggggggggggggggs")
#         print("helooooooooooooooooooooooooooooooooooo")
#         # Upload media file to S3
#         s3_client.put_object(Body=media_file, Bucket='my-glitchh-media', Key=media_file.name)
#         response = s3_client.put_object(Body=media_file, Bucket='my-glitchh-media', Key=media_file.name)
#         print("dsdsdsdsds")
#         print(response)


#         # Save the media details to the database
#         # You need to define a Post model and import necessary modules
#         print()
#         post = UserMedia.objects.create(
#             user_id=user.id,
#             title=title,
#             description=description,
#             media_type='image',  # or 'video' depending on your form input
#             media_file=media_file,
#             s3_media_path=presigned_url
#         )

#         return Response({'message': 'Media upload successful'})


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
            print(s3_client,"llllllllllllllllllll")
            presigned_url = s3_client.generate_presigned_url(
                'put_object',
                Params={'Bucket': 'my-glitchh-media', 'Key': media_file.name},
                ExpiresIn=3600  # Set the expiration time as needed
            )
            print(presigned_url,"yyyyyyyyyyyyyyyy")
            print("gooooood")
            # Upload media file to S3
            s3_client.put_object(Body=media_file, Bucket='my-glitchh-media', Key=media_file.name)

            # Save the media details to the database
            # serializer = MediaUploadSerializer(data={
            #     'user': user,
            #     'title': title,
            #     'description': description,
            #     'media_type': 'image',  # or 'video' depending on your form input
            #     'media_file': media_file,
            #     's3_media_path': presigned_url
            # })
            # serializer.is_valid(raise_exception=True)
            # post = serializer.save()
            print("tytytytytytyty")
            print(user.id,title,description,media_file,presigned_url,"hhhhhhhhhhhhhhhh")
            UserMedia.objects.create(
            user_id=user.id,
            title=title,
            description=description,
            media_type=media_type,  # or 'video' depending on your form input
            media_file=media_file,
            s3_media_path=presigned_url
            )

            return Response({'message': 'Media upload successful'})
            
        except Exception as e:
            print(f"Error: {e}")
            # Handle the exception as per your requirement
            return Response({'message': 'Media upload failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework import generics
from .models import UserMedia
from .serializers import UserMediaSerializer



class UserMediaListAPIView(generics.ListAPIView):
    queryset = UserMedia.objects.all()
    serializer_class = UserMediaSerializer