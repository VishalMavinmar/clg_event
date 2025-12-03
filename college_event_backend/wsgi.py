"""
WSGI config for college_event_backend project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "college_event_backend.settings")

application = get_wsgi_application()
