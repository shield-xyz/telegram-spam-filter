### Spam Filter for Chat Application
This script provides a simple spam filtering solution for telegram. It moves messages containing specific keywords, such as "hi" and "hello," into a separate spam container, helping to declutter the main chat window. The script also adds a custom "Spam" button to the header, which can be clicked to toggle the visibility of the spam container.

### Features
- Monitors incoming messages for specific keywords (e.g., "hi" and "hello")
- Hides messages containing the specified keywords from the main chat window
- Clones and moves spam messages to a separate spam container
- Adds a "Spam" button to the header for toggling the visibility of the spam container
- Periodically checks for new messages and processes them accordingly

### Installation
1. Download the repository/branch as a zip/folder.
2. (if zip) unzip the zip into a folder
3. Open google chrome and head to https://web.telegram.org/k/ <-- make sure it is /k/ and not /z/ or any other telegram link (currently only working for /k/
4. Go to your google chrome settings, then to extensions/manage extensions, then turn on developer mode.
5. click "load unpacked" and load the downloaded/unzipped folder
6. refresh your web telegram and you should now see the spam button on the upper right section of the screen


### Usage
The spam filter will start working automatically once the script is loaded. It will continue to monitor and process incoming messages every 5 seconds.

To view the spam messages, click on the "Spam" button located in the header. The spam container will appear with a list of hidden messages.

### Customization
You can customize the script by adjusting the following settings:
- Modify the ```waitForElement``` and ```waitForMessages``` functions to change the behavior of the element and message monitoring.
- Change the keywords used for spam filtering by modifying the conditions in the processMessages function.
  ```if ( messagePreview.includes("hi") || messagePreview.includes("hello")) {```
- Adjust the appearance of the spam container and "Spam" button by modifying the corresponding style properties in the script.
