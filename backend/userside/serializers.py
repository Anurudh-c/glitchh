from rest_framework import serializers
from .models import User,UserMedia


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        return user


from rest_framework import serializers
from userside.models import UserMedia

class MediaUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = ['user', 'title', 'description', 'media_type', 'media_file', 's3_media_path']
        read_only_fields = ['s3_media_path']

    def create(self, validated_data):
        user = self.context['request'].user
        post = UserMedia.objects.create(user=user, **validated_data)
        return post


class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = '__all__'
