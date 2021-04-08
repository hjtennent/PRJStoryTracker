# PRJStoryTracker
An app for users to track news stories they're interested in over a long period of time.

## Installation

`git clone 'https://github.com/hjtennent/PRJStoryTracker.git'`

`cd PRJStoryTracker/StoryTracker`

`npm i`

## Running the Application

Android Studio must be installed and an Android emulator should be running. This emulator should be running API 29 and target Android 10.0. To setup an emulator, follow the guide given below. To run the app on the emulator, open the AVD Manager from the main Android Studio menu and press the green play button next to the suitable emulator. Next, run the following command:

`npx react-native run-android`

To run tests:

`npm test`

## Setting up an Android Emulator

<img width="778" alt="MainASMenu" src="https://user-images.githubusercontent.com/7073476/113590280-5c85d680-962a-11eb-8e79-87743e2ecd6c.png">

First, open Android Studio and navigate to the main menu shown above. From this menu, select 'Configure' and in the sub-menu, select 'AVD Manager'. This menu shows all of the currently installed emulators. An example of what the AVD Manager may look like is given below.

<img width="777" alt="AVDManager" src="https://user-images.githubusercontent.com/7073476/113589489-4f1c1c80-9629-11eb-9973-5d806ed69298.png">

If a suitable emulator has been installed previously, (an emulator running API 29 and targeting Android 10.0) then select the green play button to open the emulator and use the commands above to run the app. If no suitable emulator exists, select the option at the bottom named 'Create Virtual Device'. 

The next step is to select the device to emulate. For this application, a Pixel 3A is chosen. Then click 'Next'.

<img width="1001" alt="AVDDeviceConfig" src="https://user-images.githubusercontent.com/7073476/113589650-8985b980-9629-11eb-95ea-5095b5b4b29a.png">

The screen allows you to select the system image for the emulator. The 'Q' system image should be selected. Click 'Next'.

<img width="1001" alt="AVDSystemImage" src="https://user-images.githubusercontent.com/7073476/113589835-c5b91a00-9629-11eb-9d9f-fb9c5e2e0e79.png">

After verifing that the emulator built runs on API 29 and targets Android 10.0, press 'Finish'.

<img width="1001" alt="AVDVerifyConfig" src="https://user-images.githubusercontent.com/7073476/113590004-fe58f380-9629-11eb-9ba0-529ba7a95a34.png">

Upon returning to the AVD Manager, the emulator should be shown 'Your Virtual Devices'. Press the green play button to start the emulator. After this, the commands given above can be used to run the application.

## Troubleshooting

If the tests are run without using the application beforehand, some tests may fail. This is due to Heroku using dynamic servers which are given more resources as they are used. When they have not been called recently, API calls can take longer than usual and this can result in some tests failing from taking too long. To resolve this issue, the tests should be run again, and they should pass as Heroku devotes more resources to the server.

