# Generated by Django 5.2 on 2025-04-12 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_featuredtour_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='featuredtour',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
    ]
