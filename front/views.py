from django.shortcuts import render


def index(request):
    return render(request, 'spa/plateau_shooter.html')
