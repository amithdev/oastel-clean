# Generated by Django 5.2 on 2025-04-26 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0034_transfer_child_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='featuredtour',
            name='min_travelers',
            field=models.PositiveIntegerField(default=1, help_text='Minimum number of adults required to book this tour'),
        ),
        migrations.AddField(
            model_name='privatetour',
            name='min_travelers',
            field=models.PositiveIntegerField(default=1, help_text='Minimum number of adults required to book this private tour'),
        ),
    ]
