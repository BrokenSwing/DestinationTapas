# Generated by Django 2.2.3 on 2019-08-04 08:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.contrib.auth.models import User


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0007_auto_20190803_1853'),
    ]

    operations = [
        migrations.AddField(
            model_name='command',
            name='author',
            field=models.ForeignKey(default=User.objects.get(username="Simon").id, on_delete=django.db.models.deletion.CASCADE, related_name='command_author', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='commandcontribution',
            name='product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Product'),
            preserve_default=False,
        ),
    ]