from django.db import models


# Create your models here.


class BearerManager(models.Manager):

    def verify_token(self, token: str, value: str) -> bool:
        query_set = self.filter(token=token, value=value)
        return query_set.count() > 0

    def revoke_token(self, token: str):
        query_set = self.filter(token=token)
        if query_set.count() > 0:
            bearer = query_set[0]
            bearer.delete()


class Bearer(models.Model):
    token = models.CharField(max_length=50, primary_key=True)
    value = models.CharField(max_length=100)
    objects = BearerManager()
