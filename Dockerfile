FROM node:18-alpine 
WORKDIR /app 
COPY package.json . 
RUN npm install -g 
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]