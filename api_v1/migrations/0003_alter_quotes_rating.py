# Generated by Django 4.1.1 on 2022-09-27 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_v1', '0002_alter_quotes_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quotes',
            name='rating',
            field=models.IntegerField(default='0', verbose_name='Рейтинг'),
        ),
    ]
