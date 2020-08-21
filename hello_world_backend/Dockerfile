###########
# BUILDER #
###########

# pull official base image
FROM python:3.8.3-alpine as builder

# set work directory
WORKDIR /usr/src/hello_world_backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apk update
RUN apk add zlib-dev
RUN apk add jpeg-dev
RUN apk add build-base
RUN apk add postgresql-dev
RUN apk add python3-dev
RUN apk add musl-dev

# lint
RUN pip install --upgrade pip
# RUN pip install flake8
COPY . .
# RUN flake8 --ignore=E501,F401 .

# install dependencies
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/hello_world_backend/wheels -r requirements.txt

#########
# FINAL #
#########

# pull official base image
FROM python:3.8.3-alpine

# create directory for the app user
RUN mkdir -p /home/hello_world_backend

# create the app user
RUN addgroup -S hello_world_backend && adduser -S hello_world_backend -G hello_world_backend

# create the appropriate directories
ENV HOME=/home/hello_world_backend
ENV APP_HOME=/home/hello_world_backend/api
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install dependencies
RUN apk update && apk add libpq
COPY --from=builder /usr/src/hello_world_backend/wheels /wheels
COPY --from=builder /usr/src/hello_world_backend/requirements.txt .
RUN pip install --no-cache /wheels/*

# copy entrypoint-prod.sh
COPY ./entrypoint.sh $APP_HOME

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R hello_world_backend:hello_world_backend $APP_HOME

# change to the app user
USER hello_world_backend

# run entrypoint.prod.sh
ENTRYPOINT ["/home/hello_world_backend/api/entrypoint.sh"]