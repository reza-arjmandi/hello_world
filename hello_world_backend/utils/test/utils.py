import io

from rest_framework.parsers import JSONParser

class Utils:

    def to_json(str):
        return JSONParser().parse(io.BytesIO(str))