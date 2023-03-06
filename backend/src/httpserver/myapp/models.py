from django.db import models


# Create your models here.

class Bearer(models.Model):
    token = models.CharField(max_length=50, primary_key=True)
    value = models.CharField(max_length=100)

