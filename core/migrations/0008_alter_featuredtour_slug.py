# Generated by Django 5.2 on 2025-04-12 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_featuredtour_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='featuredtour',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]
