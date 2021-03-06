from datetime import timedelta

GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

# django-graphql-jwt package
GRAPHQL_JWT = {
    'JWT_VERIFY_EXPIRATION': False,
    'JWT_LONG_RUNNING_REFRESH_TOKEN': True,
    'JWT_EXPIRATION_DELTA': timedelta(minutes=15),
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),

    # Rename JWT cookie tokens
    'JWT_COOKIE_NAME': 'accessToken',
    'JWT_REFRESH_TOKEN_COOKIE_NAME': 'refreshToken',
}