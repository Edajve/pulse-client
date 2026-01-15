FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g expo-cli && npm install

COPY . .

# Inject sensitive credentials via environment variables
ENV EXPO_USERNAME=${EXPO_USERNAME}
ENV EXPO_PASSWORD=${EXPO_PASSWORD}
ENV EXPO_TOKEN=${EXPO_TOKEN}

CMD ["npx", "expo", "start", "--lan"]