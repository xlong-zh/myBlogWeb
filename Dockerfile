FROM node
MAINTAINER zhxil

ENV NODE_ENV=production

RUN mkdir -p /home/app  
WORKDIR /home/app
COPY . /home/app
RUN npm install yarn -g
# RUN yarn global add pm2
RUN yarn
EXPOSE 3000

CMD ["npm", "start"]