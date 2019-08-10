from django.shortcuts import render


def index(request):
    return render(request, 'spa/page_soiree.html')
