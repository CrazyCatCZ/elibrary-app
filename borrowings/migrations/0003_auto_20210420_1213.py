# Generated by Django 3.1.7 on 2021-04-20 10:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('borrowings', '0002_borrowing_date_string'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='borrowing',
            options={'ordering': ['-date']},
        ),
    ]