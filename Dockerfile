FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g expo-cli && npm install

COPY . .

ENV EXPO_USERNAME=edajve
ENV EXPO_PASSWORD=34Dwanna1!

# Set environment variable for Expo authentication
ENV EXPO_TOKEN=${EXPO_TOKEN}

CMD ["npx", "expo", "start", "--lan"]