# Generated by Django 3.1.7 on 2021-05-13 16:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('borrowings', '0014_auto_20210513_1800'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='borrowing',
            name='book_field',
        ),
    ]
