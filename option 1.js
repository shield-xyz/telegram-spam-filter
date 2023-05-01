// Add a click event listener to the shieldlogo.png button
document.getElementById("shieldlogo").addEventListener("click", function() {
    // Create a new popup window
    var popup = window.open("", "popup", "width=300,height=200");
  
    // Create two buttons for the user to select Option 1 or Option 2
    var option1Button = document.createElement("button");
    option1Button.innerHTML = "Option 1";
    option1Button.addEventListener("click", function() {
      // User selected Option 1
      // Create a new window or tab to display the messages
      var messagesWindow = window.open("", "messages", "width=500,height=500");
  
      // TODO: Display all the messages in the current chat
  
      // TODO: Allow the user to select the messages they want to keep
  
      // TODO: Add a button to delete all the other messages
    });
  
    var option2Button = document.createElement("button");
    option2Button.innerHTML = "Option 2";
    option2Button.addEventListener("click", function() {
      // User selected Option 2
      // Open the spam folder as usual
      chrome.tabs.create({url: "https://web.telegram.org/#/im/spam"});
    });
  
    // Add the buttons to the popup window
    popup.document.body.appendChild(option1Button);
    popup.document.body.appendChild(option2Button);
  });
  