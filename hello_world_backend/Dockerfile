# pull official base image
FROM python:3.8.3-alpine

# set work directory
WORKDIR /usr/src/hello_world_backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update
RUN apk add zlib-dev
RUN apk add jpeg-dev
RUN apk add build-base
RUN apk add postgresql-dev
RUN apk add python3-dev
RUN apk add musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .

# copy project
COPY . .

# run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]