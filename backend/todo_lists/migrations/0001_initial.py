# Generated by Django 2.1.4 on 2018-12-10 04:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_column='CREATED_AT')),
                ('updated_at', models.DateTimeField(auto_now=True, db_column='UPDATE_AT')),
                ('name', models.CharField(db_column='NAME', max_length=100)),
            ],
            options={
                'db_table': 'CATEGORY',
                'ordering': ['-name'],
            },
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_column='CREATED_AT')),
                ('updated_at', models.DateTimeField(auto_now=True, db_column='UPDATE_AT')),
                ('contents', models.CharField(db_column='CONTENTS', max_length=200)),
                ('start_time', models.DateTimeField(db_column='START_TIME', null=True)),
                ('end_time', models.DateTimeField(db_column='END_TIME', null=True)),
                ('category', models.ForeignKey(db_column='CATEGORY_ID', null=True, on_delete=django.db.models.deletion.PROTECT, related_name='todo', to='todo_lists.Category')),
            ],
            options={
                'db_table': 'TODO',
                'ordering': ['start_time', 'end_time'],
            },
        ),
    ]
