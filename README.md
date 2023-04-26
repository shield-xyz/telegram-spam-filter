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
3. Open google chrome and head to https://web.telegram.org/k/ <-- make sure it is /k/ and not /z/ or any other telegram link (currently only working for /k/
4. Open Google Chrome and navigate to chrome://extensions/.
5. Enable "Developer mode" by toggling the switch in the top right corner.
6. Click the "Load unpacked" button and select the directory containing the extension files.
7. refresh your web telegram and you should now see the spam button on the upper right section of the screen


## Usage
The spam filter will start working automatically once the script is loaded. It will continue to monitor and process incoming messages every 5 seconds.
To view the spam messages, click on the Shield logo located in the header. The spam container will appear with a list of hidden messages.
Use features like being able to delete all messages contained in the spam folder, or selected messages
