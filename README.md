# Telegram Spam Filter Chrome Extension
This Chrome extension provides a simple spam filtering solution for the Telegram web application. It moves messages falling under a specific criteria into a separate spam container, helping to declutter the main chat window. The extension also adds a custom "Spam" button to the header, which can be clicked to toggle the visibility of the spam container.

## Features
- Monitors incoming messages for specific keywords
- Checks for Frequency of messages
- If unread message count is above 1000
- Hides messages containing the specified keywords from the main chat window
- Clones and moves spam messages to a separate spam container
- Adds a "Spam" folder to the header for toggling the visibility of the spam container
- Periodically checks for new messages and processes them accordingly

## Installation
1. Download the repository/branch as a zip/folder.
2. (if zip) unzip the zip into a folder
<img width="1318" alt="Screenshot 2023-04-27 at 1 11 00 AM" src="https://user-images.githubusercontent.com/86547292/234651790-6b3f099a-9166-4ed8-8cd9-67e4b0d97321.png">
3. Open google chrome and head to https://web.telegram.org/k/ <-- make sure it is /k/ and not /z/ or any other telegram link (currently only working for /k/
4. Open Google Chrome and navigate to chrome://extensions/.
5. Enable "Developer mode" by toggling the switch in the top right corner.
<img width="268" alt="Screenshot 2023-04-27 at 1 08 24 AM" src="https://user-images.githubusercontent.com/86547292/234651282-5d390b63-63d4-4a57-a318-6d9566079293.png"> 

6. Click the "Load unpacked" button and select the directory containing the extension files.
<img width="564" alt="Screenshot 2023-04-27 at 1 08 28 AM" src="https://user-images.githubusercontent.com/86547292/234651202-97183813-8661-4c22-a3de-699339162350.png">
7. refresh your web telegram and you should now see the shield button on the upper right section of the screen


## Usage
The spam filter will start working automatically once the script is loaded. It will continue to monitor and process incoming messages every 5 seconds.
To view the spam messages, click on the Shield logo located in the header. The spam container will appear with a list of hidden messages.
Use features like being able to delete all messages contained in the spam folder, or selected messages
