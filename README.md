# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

### Run app in docker

Run 
``` docker build -t expo-app .``` while inside the directory of the file

This will create a docker image called expo app

Next, run 
```
docker run -it -p 8081:8081 expo-app
```

-it: Keeps the container interactive
-p 8081:8081: Maps port 8081 inside the container to port 8081 on your machine (Expo usually runs on this port)

## To Stop the container
```
docker stop <container_id>
docker rm <container_id>
```

### Run app locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start -c
   ```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

## Windows specific note (important)

On Windows, Metro cannot load a custom metro.config without a small patch due to how Node handles absolute paths.

This project includes a patched metro-config using patch-package.

### What this means 
npm install automatically applies the patch, If dependencies are ever reinstalled and metro fails again, regernate patch with npx patch-package metro-config//the patch file lives in patches/ directory and must be commited



## Dependencies
WIP
- expo install expo-media-library
- expo install expo-camera
