# team2-frontend

Steps to run to run our React Native app with Expo

1. Clone the repository to your device.

2. You will need a couple things to run this  

  First you will need node/npm.
  You can check if you have this by running the following

  ```
  node -v
  ```
  If you have it, it will tell you the version, otherwise you'll get a command not found error

3. Install expo cli. The following command should work
  
  ```
  npm install -g expo-cli
  ```

4. cd into 'team2-frontend' directory


5. Install necessary packages with the following command.
  ```
  npm i
  ```
  
6. There are acouple options to run the app. The first and probably easiest option is to download the Expo on your mobile device. For the second option, you can download an ios or android simulator on your computer to run locally. This requires more work to download, so probably lookup more documentation if you want to do this. I've only done this on mac for an ios simulator, but I can try to answer questions if you can't figure it out.

7. Run the app by using the following command
  
  ```
  expo start
  ```
  
From here, you will be prompted with options to run the simulator. Based on what you did in step 6, you can either scan the QR code on mobile or launch your specific emulator locally.

You should now be able to see a white screen with some text about our app.
