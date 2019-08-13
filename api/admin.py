from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register([
    Party,
    Product,
    Shot,
    Command,
    FriendRequest,
    Ingredient,
    CommandContribution,
    UserMisc
])
