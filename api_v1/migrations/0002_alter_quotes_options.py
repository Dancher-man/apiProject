# Generated by Django 4.1.1 on 2022-09-26 07:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_v1', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quotes',
            options={'permissions': [('can_view_moderated', 'Может видеть модерированные цитаты')], 'verbose_name': 'Цитата', 'verbose_name_plural': 'Цитаты'},
        ),
    ]