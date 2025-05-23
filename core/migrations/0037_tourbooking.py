# Generated by Django 5.2 on 2025-04-27 10:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0036_featuredtour_max_bookings_per_day_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TourBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('hotel_address', models.CharField(blank=True, max_length=500, null=True)),
                ('pickup_map_url', models.URLField(blank=True, null=True)),
                ('date', models.DateField()),
                ('time', models.CharField(max_length=50)),
                ('adults', models.PositiveIntegerField(default=1)),
                ('children', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('featured_tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.featuredtour')),
                ('private_tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.privatetour')),
            ],
        ),
    ]
