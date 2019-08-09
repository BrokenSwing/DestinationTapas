# Generated by Django 2.2.3 on 2019-08-09 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20190804_1016'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.CharField(choices=[('FOOD', 'FOOD'), ('COCKTAIL', 'COCKTAIL'), ('SHOT', 'SHOT'), ('OTHER', 'OTHER')], default=('OTHER', 'OTHER'), max_length=10),
            preserve_default=False,
        ),
    ]
