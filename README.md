# 👨‍🍳 Recommendy - Restaurant Recommendation App
Recommendy is a rudimentary voice assistant that gives restaurant 
recommendations according to the user input. The project consists of
**two parts** the **mobile app** (this repository) and the **NLP engine**
which can be found [here](https://github.com/Poolshark/recommendAi).

This mobile app is based on the [Expo framework](https://expo.dev) and
created with 
[`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
The chosen package manager for this project is [Bun](https://bun.sh/).

For the functionality of the voice assistant, additional packages are
required:

- `expo-speech` > For speech-to-text STT and text-to-speech TTS recognition
- `@react-native-voice/voice` > For audio recording and generating

> This project is part of a university assignment and is not intended for production use. 
> Feel free to use the code as a reference for your own projects. **NOTE: This chatbot only
> uses a bunch of pre-defined questions and responses. It does not use any machine learning. THIS APP WILL NOT WORK WITHOUT INSTALLING AND RUNNING THE `recommendyAI` PACKAGE!**

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
    bunx expo start
   ```

   or
   ```bash
   bun run ios
   bun run android
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
