# Generated by Django 3.1.7 on 2021-05-11 14:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('borrowings', '0006_borrowing_returned'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='borrowing',
            name='book',
        ),
    ]
