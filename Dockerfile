FROM node:10-stretch
RUN mkdir /code
COPY . /code
WORKDIR /code
RUN npm i
RUN npm i -gq forever > /dev/null 2> /dev/null

CMD sh docker_entrypoint.sh