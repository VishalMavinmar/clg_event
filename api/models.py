# backend/api/models.py
import os
from django.db import models
from django.conf import settings
# Upload path function
def student_image_path(instance, filename):
    return f"students/temp/{filename}"


# CR model
class CR(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Student model
class Student(models.Model):
    cr = models.ForeignKey("CR", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=15, unique=True)
    student_class = models.CharField(max_length=50)
    image = models.ImageField(upload_to=student_image_path, null=True, blank=True)
    token_number = models.AutoField(primary_key=True)

    def save(self, *args, **kwargs):
        is_new = self.token_number is None
        old_image = self.image

        super().save(*args, **kwargs)

        # Only when new & temp folder image exists
        if old_image and "temp" in old_image.name:
            new_path = f"students/{self.token_number}/{os.path.basename(old_image.name)}"

            old_full = os.path.join(settings.MEDIA_ROOT, old_image.name)
            new_full = os.path.join(settings.MEDIA_ROOT, new_path)

            os.makedirs(os.path.dirname(new_full), exist_ok=True)

            try:
                os.rename(old_full, new_full)
            except FileNotFoundError:
                print("Image NOT FOUND! Upload failed.")

            self.image = new_path
            super().save(update_fields=['image'])