# Generated by Django 3.1 on 2020-10-02 08:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20201002_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileavatar',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Avatar', to='api.profileinfo'),
        ),
    ]