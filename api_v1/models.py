# from django.db import models
#
# DEFAULT_CATEGORY = 'new'
# CATEGORY_CHOICES = (
#     (DEFAULT_CATEGORY, 'Новая'),
#     ('moderated', 'модерированная')
# )
#
#
# # Create your models here.
# class BaseModel(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
#     updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата изменения")
#
#     class Meta:
#         abstract = True
#
#
# class Quotes(BaseModel):
#     username = models.CharField(max_length=100, verbose_name='Имя')
#     description = models.TextField(max_length=2000, verbose_name='Текст')
#     email = models.EmailField(max_length=254, blank=False)
#     rating = models.IntegerField(default='0', verbose_name='Рейтинг')
#     status = models.CharField(max_length=20, default=DEFAULT_CATEGORY, choices=CATEGORY_CHOICES, verbose_name='Статус')
#
#     def __str__(self):
#         return f"{self.id}. {self.username}"
#
#     class Meta:
#         db_table = "quotes"
#         verbose_name = "Цитата"
#         verbose_name_plural = "Цитаты"
#         permissions = [
#             ('can_view_moderated', 'Может видеть модерированные цитаты')
#         ]
