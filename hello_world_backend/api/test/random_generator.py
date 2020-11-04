import random
import string
from datetime import datetime, timedelta

from django.contrib.auth.models import User

class RandomGenerator:

    def generate_string(self, min_length, max_length):
        random_length = random.randint(min_length, max_length)
        list_of_choices = string.ascii_letters + string.digits
        random_chars = [random.choice(list_of_choices) 
                            for i in range(random_length)]
        return ''.join(random_chars)

    def generate_bool(self):
        return random.choice([True, False])

    def generate_real(self, min, max):
        return random.random() * (max - min) + min

    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    def generate_date_time(
            self, min_year = 1900, max_year = datetime.now().year):
        start = datetime(min_year, 1, 1, 00, 00, 00)
        years = max_year - min_year + 1
        end = start + timedelta(days = 365 * years)
        return start + (end - start) * random.random()

    def generate_user(self):
        username = self.generate_string(2, 10)
        server = self.generate_string(2, 10)
        return User.objects.create_user(
            username,
            email=f'{username}@{server}.com',
            password=User.objects.make_random_password())
    
    def generate_admin_user(self):
        return User.objects.create_superuser(
            self.generate_string(2, 10),
            password=User.objects.make_random_password())

    def generate_file(self, path):
        with open(path, 'w') as file:
            file.write(self.generate_string(10, 1000))