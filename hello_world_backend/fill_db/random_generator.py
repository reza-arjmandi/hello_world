import random
import string
from datetime import datetime, timedelta

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

    def generate_file(self, path):
        with open(path, 'w') as file:
            file.write(self.generate_string(10, 1000))

    def generate_email(self):
        user = self.generate_string(2, 10)
        host = self.generate_string(2, 5)
        domin = self.generate_string(2, 4)
        return f'{user}@{host}.{domin}'

    def generate_url(self):
        host = self.generate_string(2, 5)
        url = f'http://{host}.com'
        number_of_res = random.randint(2, 20)
        for i in range(number_of_res):
            res = self.generate_string(2, 10)
            url += f'/{res}'
        return url