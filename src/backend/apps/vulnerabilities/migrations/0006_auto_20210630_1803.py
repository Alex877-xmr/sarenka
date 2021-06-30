# Generated by Django 3.1.7 on 2021-06-30 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vulnerabilities', '0005_auto_20210629_0034'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vector',
            name='cve',
        ),
        migrations.AddField(
            model_name='cve',
            name='vectors',
            field=models.ManyToManyField(to='vulnerabilities.Vector'),
        ),
    ]