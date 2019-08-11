from django.shortcuts import render


def index(request):
    return render(request, 'spa/user_profil.html')
