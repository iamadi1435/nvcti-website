FROM node:latest
WORKDIR /nvcti
COPY ["./package.json", "./package-lock.json*", "./"]
RUN npm i --production
COPY [".", "."]
CMD ["npm", "start"]
