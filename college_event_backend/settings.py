"""
Django settings for college_event_backend project.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------------
# WhatsApp Cloud API Credentials
# -------------------------------
WHATSAPP_PHONE_ID = "878429672009946"   # Example: 878429672009946
WHATSAPP_TOKEN = "EAATm0Pa2vZCYBQLbElO8ZAsUHdjMu0uiAjNGw9M7x0vIUPoviRlhZAJZCnnMlhlnJeaGLa28yNVkAUemmyt7ZCLDyUkwXyQHf4ZAL5ZCHNGvH9nwx7rtzB24LZAhuSThpsewsxAFnYkS9PytSZCLaPKSjLaPmaZAd8ZBIOkx3WbmFnr6kKVRqVCsAO5YJzyjaXlgfE6NgZDZD"

# -------------------------------
# Security
# -------------------------------
SECRET_KEY = "django-insecure-(kcup)zqm&2oe+7o=hk^&kl#%^u010d^h@%5d#lvr1=#yze*c7"

DEBUG = True

ALLOWED_HOSTS = [
    "*",
    "localhost",
    "127.0.0.1",
    "college-event-backend-unsk.onrender.com",
]

# -------------------------------
# Installed Apps
# -------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",

    "api",
]

# -------------------------------
# Middleware
# -------------------------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# -------------------------------
# URLs & WSGI
# -------------------------------
ROOT_URLCONF = "college_event_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "college_event_backend.wsgi.application"

# -------------------------------
# Database
# -------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "event_register_db1",
        "USER": "root",
        "PASSWORD": "vishal1234",
        "HOST": "localhost",
        "PORT": "3306",
    }
}

# -------------------------------
# Password Validators
# -------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -------------------------------
# Internationalization
# -------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# -------------------------------
# Static & Media
# -------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# -------------------------------
# REST Framework
# -------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_PERMISSION_CLASSES": [],
}

# -------------------------------
# CORS (Expo Needs This)
# -------------------------------
CORS_ALLOW_ALL_ORIGINS = True
