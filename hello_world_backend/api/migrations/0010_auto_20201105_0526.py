# Generated by Django 3.1 on 2020-11-05 05:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_blogpost'),
    ]

    operations = [
        migrations.DeleteModel(
            name='HomePage',
        ),
        migrations.DeleteModel(
            name='LoginToken',
        ),
    ]
