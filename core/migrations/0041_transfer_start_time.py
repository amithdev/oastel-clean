# Generated by Django 5.2 on 2025-04-30 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0040_featuredtour_start_time_privatetour_start_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='transfer',
            name='start_time',
            field=models.TimeField(default='08:00'),
        ),
    ]
