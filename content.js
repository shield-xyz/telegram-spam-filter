const shieldButton = document.createElement("button");

const addShieldButton = () => {
  waitForElement(".sidebar-header__btn-container", (headerElement) => {
    //const headerElement = document.querySelector('.sidebar-header__btn-container');
    shieldButton.className = "custom-spam-button";
    shieldButton.style.position = "fixed";
    shieldButton.style.right = "20px";
    shieldButton.style.top = "80px";
    shieldButton.style.zIndex = "9999";

    shieldButton.style.width = "50px";
    shieldButton.style.height = "50px";
    shieldButton.style.backgroundImage =
      'url("' + chrome.runtime.getURL("images/icon.png") + '")';
    shieldButton.style.backgroundSize = "cover";
    shieldButton.style.backgroundColor = "rgba(1, 6, 51, 1)";
    shieldButton.style.borderRadius = "10px";

    console.log("Spam icon URL:", shieldButton.style.backgroundImage);

    // const spamIcon = document.createElement('img');
    // spamIcon.src = chrome.runtime.getURL('images/icon.png');
    // console.log("Spam icon URL:", spamIcon.src);
    // spamIcon.style.width = '50px';
    // spamIcon.style.height = '50px';
    // spamIcon.style.marginRight = '5px'; // Adjust the margin to position the icon

    // const spamText = document.createTextNode('Spam');

    // shieldButton.appendChild(spamIcon);
    // shieldButton.appendChild(spamText);

    shieldButton.onclick = () => {
      const shieldContainer = document.querySelector(".shield-container");
      console.log('shieldContainer.style.display', shieldContainer.style.display)
      shieldContainer.style.display =
        shieldContainer.style.display === "none" ? "flex" : "none";

<<<<<<< Updated upstream
        chrome.storage.local.clear(function() {
          console.log('Local storage cleared');
        });
        
=======
      chrome.storage.local.clear(function () {
        console.log('Local storage cleared');
      });
>>>>>>> Stashed changes
    };

    console.log("Adding Shield button");

    headerElement.parentElement.appendChild(shieldButton);
  });

  //Create Shield Extension Menu
  shieldContainer = document.createElement("div");
  shieldContainer.className = "shield-container";
  shieldContainer.style.display = "none";
  shieldContainer.style.justifyContent = "center";
  shieldContainer.style.flexDirection = "column";
  shieldContainer.style.alignItems = "center";
  shieldContainer.style.position = "fixed";
  shieldContainer.style.top = "150px";
  shieldContainer.style.right = "20px";
  shieldContainer.style.zIndex = 9999;

  shieldContainer.style.backgroundColor = "rgba(1, 6, 51, 1)";
  shieldContainer.style.border = "0";
  shieldContainer.style.borderRadius = "10px";
  shieldContainer.style.padding = "20px";
  shieldContainer.style.height = "fit-content";
  shieldContainer.style.overflow = "auto";
  shieldContainer.style.width = "500px";

  shieldContainerTitle = document.createElement("p");
  shieldContainerTitle.innerHTML = "What should Shield TG Cleaner do?";
  shieldContainerTitle.style.fontSize = "22px";
  shieldContainerTitle.style.fontWeight = "800";
  shieldContainerTitle.style.color = "#06C1FF";
  shieldContainerTitle.style.width = "100%";
  shieldContainerTitle.style.margin = "5px 0px 10px 0px";
  shieldContainerTitle.style.textAlign = "center";

  //Create Option 1 button
  option1 = document.createElement("div");
  option1.style.display = "flex";
  option1.style.alignItems = "flex-start";
  option1.style.justifyContent = "flex-start";
  option1.style.flexDirection = "column";
  option1.style.backgroundColor = "white";
  option1.style.width = "100%";
  option1.style.height = "110px";
  option1.style.cursor = "pointer";
  option1.style.borderRadius = "10px";
  option1.style.padding = "10px";
  option1.style.fontFamily = "Century Gothic";
  option1.style.marginBottom = "20px";

  option1Title = document.createElement("p");
  option1Title.innerHTML = "Option 1";
  option1Title.style.fontSize = "27px";
  option1Title.style.fontWeight = "800";
  option1Title.style.color = "rgb(1, 6, 51)";
  option1Title.style.margin = "0";

  option1Text = document.createElement("p");
  option1Text.innerHTML =
    "Select messages you want to keep and have Shield TG Cleaner delete the rest";
  option1Text.style.fontSize = "16px";
  option1Text.style.fontWeight = "400";
  option1Text.style.color = "rgb(1, 6, 51)";
  option1Text.style.margin = "0";

  option1.appendChild(option1Title);
  option1.appendChild(option1Text);

  //Create Option 2 button
  option2 = document.createElement("div");
  option2.style.display = "flex";
  option2.style.alignItems = "flex-start";
  option2.style.justifyContent = "flex-start";
  option2.style.flexDirection = "column";
  option2.style.backgroundColor = "white";
  option2.style.width = "100%";
  option2.style.height = "130px";
  option2.style.cursor = "pointer";
  option2.style.borderRadius = "10px";
  option2.style.padding = "10px";
  option2.style.fontFamily = "Century Gothic";

  option2Title = document.createElement("p");
  option2Title.innerHTML = "Option 2";
  option2Title.style.fontSize = "27px";
  option2Title.style.fontWeight = "800";
  option2Title.style.color = "rgb(1, 6, 51)";
  option2Title.style.margin = "0";

  option2Text = document.createElement("p");
  option2Text.innerHTML =
    "Shield TG Cleaner will automatically filter your messages for suspected spam. Select which messages to keep and delete the rest";
  option2Text.style.fontSize = "16px";
  option2Text.style.fontWeight = "400";
  option2Text.style.color = "rgb(1, 6, 51)";
  option2Text.style.margin = "0";

  option1.onclick = () => {
    console.log("Start Option 1");
    shieldContainer.removeChild(option1);
    shieldContainer.removeChild(option2);

    shieldContainerTitle.innerHTML = "Select the messages you want to keep";
    option1Button = document.createElement("button");
    option1Button.innerHTML = "Start Selecting";
    option1Button.style.fontSize = "22px";
    option1Button.style.fontWeight = "800";
    option1Button.style.color = "rgb(1, 6, 51)";
    option1Button.style.margin = "0";
    option1Button.style.backgroundColor = "white";
    option1Button.style.width = "180px";
    option1Button.style.padding = "10px";
    option1Button.style.borderRadius = "10px";

    shieldContainer.appendChild(option1Button);
    //Initialize Option2
    startOption2(true);

    //Change function attached to shield button on click
    shieldButton.onclick = () => {
      const spamContainer = document.querySelector(".spam-container");
      spamContainer.style.display =
        spamContainer.style.display === "none" ? "block" : "none";
    };
  };

  option2.onclick = () => {
    console.log("Start Option 2");

    shieldContainerTitle.innerHTML = "Please wait...";
    shieldContainer.removeChild(option1);
    shieldContainer.removeChild(option2);

    //Initialize Option2
    startOption2(false);

    //Change function attached to shield button on click
    shieldButton.onclick = () => {
      const spamContainer = document.querySelector(".spam-container");
      spamContainer.style.display =
        spamContainer.style.display === "none" ? "block" : "none";
    };
  };

  option2.appendChild(option2Title);
  option2.appendChild(option2Text);

  shieldContainer.appendChild(shieldContainerTitle);
  shieldContainer.appendChild(option1);
  shieldContainer.appendChild(option2);
  const body = document.querySelector("body");
  body.appendChild(shieldContainer);
};

function triggerRightClick(element) {
  const event = new MouseEvent("contextmenu", {
    bubbles: true,
    cancelable: true,
    view: window,
    button: 2,
    buttons: 2,
  });

  element.dispatchEvent(event);
}

function scrollToElement(element) {
  console.log(element);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function triggerLeftClick(element) {
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0, // 0 for left button, 1 for middle button, 2 for right button
  });

  element.dispatchEvent(event);
}

function waitForElement(selector, callback, maxRetries = 50) {
  const element = document.querySelector(selector);
  if (element) {
    // console.log('Element found:', selector);
    callback(element);
  } else if (maxRetries <= 0) {
    // console.log('Element not found, giving up:', selector);
  } else {
    // console.log('Element not found yet, retrying:', selector);
    setTimeout(() => waitForElement(selector, callback, maxRetries - 1), 100);
  }
}

function waitForMessages(selector, callback, maxRetries = 50) {
  const messages = document.querySelectorAll(selector);

  let allMessagesHaveContent = true;
  for (const message of messages) {
    const messagePreview = message.querySelector(".row-subtitle");
    if (!messagePreview || messagePreview.textContent.trim() === "") {
      allMessagesHaveContent = false;
      break;
    }
  }

  if (messages.length > 0 && allMessagesHaveContent) {
    // console.log('Messages found:', selector);
    callback(messages);
  } else if (maxRetries <= 0) {
    // console.log('Messages not found, giving up:', selector);
  } else {
    // console.log('Messages not found yet, retrying:', selector);
    setTimeout(() => waitForMessages(selector, callback, maxRetries - 1), 100);
  }
}

const startOption2 = (isStartOption1) => {
  let loadingDiv;
  let processedMessages = new Set();
  let clonedMessages = new Set();
  let clonedMessagesMap = new Map();

  //Loading Div
  waitForElement(".chat-background-item", (headerElement) => {
    loadingDiv = document.createElement("div");
    loadingDiv.style.position = "fixed";
    loadingDiv.style.zIndex = "9999";

    loadingDiv.style.bottom = "0";
    loadingDiv.style.left = "50%";
    loadingDiv.style.transform = "translateX(-50%)";
    loadingDiv.innerText = "hello world";
    loadingDiv.height = "100px";
    loadingDiv.width = "100px";
    loadingDiv.innerHTML =
      "<img src=" + chrome.runtime.getURL("images/loading.gif") + ">";

    loadingDiv.style.display = "none";
    // loading display true
    // loadingDiv.style.display = "inline-block";
    headerElement.parentElement.appendChild(loadingDiv);
  });

  function moveMessagesToSpam() {
    // let loadingDiv;
    let intervalId;

    function processMessages() {
      let currentIndex = 0;

      console.log("Processing Messages"); //Delete on production
      waitForMessages(
        'ul.chatlist[data-autonomous="0"] a.chatlist-chat',
        async (messageList) => {
          // console.log('Processing message list');
          // console.log('Total messages:', messageList.length);
          // console.log(processedMessages);
          // console.log( messageList[0]);
          if (messageList.length > 0) {
            let spamContainer;
            let spamContainerCurrent =
              document.querySelector(".spam-container");

            //Create spam container if it doesn't exist yet
            if (!spamContainerCurrent) {
              //Remove start menu upon loading
              const shieldContainer =
                document.querySelector(".shield-container");
              shieldContainer.style.display = "none";

              //Create spam menu
              spamContainer = document.createElement("div");
              spamContainer.className = "spam-container";
              spamContainer.style.display = "block";
              spamContainer.style.position = "fixed";
              spamContainer.style.top = "150px";
              spamContainer.style.right = "20px";
              spamContainer.style.zIndex = 9999;
              spamContainer.style.backgroundColor = "rgb(1, 6, 51)";
              spamContainer.style.border = "0";
              spamContainer.style.borderRadius = "10px";
              spamContainer.style.padding = "20px";
              spamContainer.style.height = "400px";
              spamContainer.style.overflow = "auto";
              spamContainer.style.width = "500px"; // Adjust the width of the spam box
              spamContainer.style.scrollbarWidth = "12px";

              const body = document.querySelector("body");

              body.appendChild(spamContainer);
            } else {
              spamContainer = document.querySelector(".spam-container");
            }

            for (let i = 0; i < messageList.length; i++) {
              const message = messageList[i];

              // Log the message element to inspect it
              //console.log('Message element:', message);
              //console.log('PREVIEW:',messageList[i].querySelector('.row-subtitle').textContent)

              const messagePreviewElement =
                message.querySelector(".row-subtitle");
              // const className = messagePreviewElement.href;
              // console.log(className);
              const messagePreviewRegex = /(?:[^:]*: )(.*)/;
              // const messagePreviewMatch = messagePreviewElement.textContent.match(messagePreviewRegex);
              const messagePreviewMatch = messagePreviewElement.textContent;
              const unreadMessages = message.querySelector(
                ".dialog-subtitle-badge.badge.badge-22.is-visible.unread"
              );

              const messagePreview = messagePreviewMatch
                ? messagePreviewMatch.toLowerCase()
                : null;
              // const messagePreview = messageList[i].querySelector('.row-subtitle').textContent.match(/(?:[^:]*: )(.*)/)[1]

              // select the element

              // initialize the message count and spam flag
              let messageCount = unreadMessages?.textContent
                ? parseInt(unreadMessages.textContent)
                : null;
              let isSpam = false;

              if (messageCount) {
                setInterval(() => {
                  const newCount = parseInt(unreadMessages.textContent);
                  if (newCount === messageCount + 1) {
                    messageCount = newCount;
                    isSpam = true;
                    console.log("Flagged as SPAM");
                  } else {
                    messageCount = newCount;
                    isSpam = false;
                  }
                }, 10000); // check every 10 seconds
              }
              // update the spam flag if the message count increases by 1

              //console.log('Message preview:', messagePreview);
              try {
                // console.log(unreadMessages.textContent, "messagePreview");
                if (
                  isStartOption1 ||
                  // messagePreview.includes("🔥") ||
                  // messagePreview.includes("🚀") ||
                  messagePreview.includes("hi") ||
                  messagePreview.includes("hello") ||
                  messagePreview.includes("project") ||
                  messagePreview.includes("Growth") ||
                  messagePreview.includes("Likes") ||
                  messagePreview.includes("Followers") ||
                  messagePreview.includes("Comments") ||
                  messagePreview.includes("Instagram") ||
                  messagePreview.includes("Moon") ||
                  messagePreview.includes("Dollar") ||
                  messagePreview.includes("P2P") ||
                  messagePreview.includes("Cash") ||
                  messagePreview.includes("Money") ||
                  unreadMessages?.textContent >= 1000 ||
                  isSpam ||
                  messagePreview.includes("💰") ||
                  messagePreview.includes("GIF") ||
                  messagePreview.includes("services") ||
                  messagePreview.includes("offers") ||
                  messagePreview.includes("get rich") ||
                  messagePreview.includes("profit") ||
                  messagePreview.includes("blockchain developer")
                ) {
                  // console.log('Including message:', messagePreview);

                  // message.style.display = "none";

                  const clonedMessage = message.cloneNode(true);

                  // Mark the message as processed
                  if (!processedMessages.has(message)) {
                    processedMessages.add(message);

                    // Add some custom styling to make the messages visible inside the spam container
                    clonedMessage.style.display = "flex";
                    clonedMessage.style.padding = "10px";
                    clonedMessage.style.flexDirection = "column";
                    clonedMessage.style.border = "1px solid #06C1FF";
                    clonedMessage.style.marginBottom = "10px";
                    clonedMessage.style.backgroundColor = "#f7f7f7";
                    clonedMessage.style.color = "white";
                    clonedMessage.style.id = i + messagePreview[0];
                    clonedMessage.style.width = "100%";

                    // Adjust the location of the chat box profile picture
                    const avatar = clonedMessage.querySelector(".avatar-like");
                    if (avatar) {
                      avatar.style.marginBottom = "5px";
                    }

                    // Swap the position of message name and message preview
                    const rowTitleRow =
                      clonedMessage.querySelector(".row-title-row");
                    const rowSubtitleRow =
                      clonedMessage.querySelector(".row-subtitle-row");
                    // rowSubtitleRow.style.color = "blue"
                    if (rowTitleRow && rowSubtitleRow) {
                      rowTitleRow.parentElement.insertBefore(
                        rowSubtitleRow,
                        rowTitleRow
                      );
                    }
                    // Create a unique identifier for the message (e.g., a combination of the message URL and message content)
                    const messageIdentifier = message.href;

                    // Only add the cloned message to the clonedMessagesMap if it doesn't already exist
                    if (!clonedMessagesMap.has(messageIdentifier)) {
                      clonedMessagesMap.set(messageIdentifier, clonedMessage);
                    }
                  }
                } else {
                  // console.log('Excluding message:', messagePreview ? messagePreview : 'No preview');
                }
              } catch (error) { }
            }
            console.log(spamContainer, "spam containerx");

            // adding button on spamContainer

            while (spamContainer.firstChild) {
              spamContainer.removeChild(spamContainer.firstChild);
            }

            let buttonStates = [];
            let allStates = [];

            // Rest of the code
            // await delay(500);
            const deleteAllButton = document.createElement("button");
            deleteAllButton.innerHTML = "Delete Unselected";
            deleteAllButton.style.margin = "10px 0px 10px 10px";
            deleteAllButton.style.color = "#06C1FF";
            deleteAllButton.onclick = async function () {
              clearInterval(intervalId); // stop setInterval

              // Create the popup container
              const popupContainer = document.createElement("div");
              popupContainer.style.position = "fixed";
              popupContainer.style.top = "50%";
              popupContainer.style.left = "50%";
              popupContainer.style.transform = "translate(-50%, -50%)";
              popupContainer.style.background = "rgb(1, 6, 51)";
              popupContainer.style.border = "0";
              popupContainer.style.borderRadius = "10px";
              popupContainer.style.padding = "20px";
              popupContainer.style.color = "white";
              popupContainer.style.boxShadow =
                "0px 0px 10px rgba(0, 0, 0, 0.5)";
              popupContainer.style.zIndex = "9999";

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
              // count messages to be deleted
              let arrCounter = clonedArray.map((el) => el[0]);
              let selectedCount = 0;

              console.log(
                "arrayCounter:",
                arrCounter.length
              );


              const popupMessage = document.createElement("p");

              await chrome.storage.local.get(
                ["buttonStates"],
                function (result) {
                  buttonStates = result.buttonStates || [];
                  selectedCount = buttonStates.length
                  console.log(buttonStates, "SELECTED COUNTER");

                  console.log(arrCounter.length)
                  console.log(selectedCount)
                  // arrCounter = arrCounter.length - buttonStates.length;
                  let numToDel = 0
                  numToDel  = arrCounter.length - selectedCount;

                  // number that is non-selected to delete
                  console.log("numToDel:" + numToDel);

                

                  let min = 0;
                  let sec = 0
                  sec = numToDel * 3.5;
                  
                  if (sec > 60) {
                    min = sec / 60;
                    min = Math.trunc(min);
                  }
                  sec = sec % 60;
                  let message = "";

                  if (min >= 1) {
                    message = min + " minute(s) " + sec + " second(s) ";
                  } else {
                    message = sec + "second(s)";
                  }

                  
                  popupMessage.innerText =
                    "You are about to delete all "+ numToDel +" NON-selected messages. Estimated time to delete " + message + " Do you want to continue?";
                  popupMessage.style.margin = "0 0 20px 0";

                }
              );
<<<<<<< Updated upstream



              // console.log(min)
              // console.log(sec)
              // console.log(message)


              // Create the popup message

=======
>>>>>>> Stashed changes

              // Create the "Yes" button
              const yesButton = document.createElement("button");
              yesButton.innerText = "Yes";
              yesButton.style.color = "white";
              yesButton.style.marginRight = "30px";

              // Create the "No" button
              const noButton = document.createElement("button");
              noButton.innerText = "No";
              noButton.style.color = "white";

              // Add event listeners to the buttons
              yesButton.addEventListener("click", async () => {
                // User clicked "Yes"

                // Go to Top-most message before deleting
                const chatboxTop = document.querySelector('.chatlist-top')
                scrollToElement(chatboxTop)

                const delay = (ms) =>
                  new Promise((resolve) =>
                    setTimeout(resolve, ms)
                  );

                await delay(1000)

                // TODO: Continue with action
                popupContainer.remove(); // Remove the popup from the page

                await chrome.storage.local.get(
                  ["allStates"],
                  async function (result) {
                    let buttonDeleteAllStates = result.buttonStates || [];
                    console.log(buttonDeleteAllStates, "buttondeleteallstates");
                    const promises = [];
                    const indexArray = [];

                    if (buttonDeleteAllStates.length > 0) {
                      const spamContainer =
                        document.querySelector(".spam-container");
                      spamContainer.style.display = "none";
                      loadingDiv.style.display = "inline-block";

                      const disableDiv = document.createElement("div");
                      disableDiv.style.position = "fixed";
                      disableDiv.style.top = "0";
                      disableDiv.style.left = "0";
                      disableDiv.style.width = "100%";
                      disableDiv.style.height = "100%";
                      disableDiv.style.backgroundColor = "black";
                      disableDiv.style.opacity = "0.5";
                      disableDiv.style.zIndex = "9999";

                      // Add the loading and disable divs to the body element
                      document.body.appendChild(disableDiv);

                      const allMessagesArray = clonedArray.map((el) => el[0]);

                      let messagesToDeleteArray;
                      if (isStartOption1) {
                        messagesToDeleteArray = allMessagesArray.filter(
                          (el) => buttonDeleteAllStates.indexOf(el) > 0
                        );
                      } else {
                        messagesToDeleteArray = allMessagesArray.filter(
                          (el) => buttonDeleteAllStates.indexOf(el) < 0
                        );
                      }

                      console.log(
                        "messagesToDeleteArray",
                        messagesToDeleteArray
                      );

                      for (let i = 0; i < messagesToDeleteArray.length; i++) {
                        await new Promise((resolve) => {
                          setTimeout(async function () {
                            // const promise = new Promise(async (resolve, reject) => {
                            try {
                              // spamContainer.style.display =
                              //   spamContainer.style.display === "none"
                              //     ? "block"
                              //     : "none";
                              const delay = (ms) =>
                                new Promise((resolve) =>
                                  setTimeout(resolve, ms)
                                );

                              // console.log(key)
                              const singleItem = messagesToDeleteArray[i];
                              // Remove the    url and just get the Message ID
                              // Remove the telegram url and just get the Message ID
                              const toRemove = "https://web.telegram.org/k/";
                              let itemId = singleItem.replace(toRemove, "");
                              itemId = itemId.replace(/[^\w\s]/gi, ""); // remove special characters

                              const localItemId = singleItem.replace(
                                toRemove,
                                ""
                              );
                              const elementInDoc = document.querySelector(
                                `[href="${localItemId}"]`
                              );

                              console.log(itemId, "itemId");
                              const el = spamContainer.querySelector(
                                `#id${itemId}`
                              );

                              console.log(elementInDoc, "elementInDoc");

                              if (elementInDoc) {
                                try {
                                  await scrollToElement(elementInDoc);
                                } catch (e) {
                                  console.log("scroll", e);
                                }
                              }

                              if (!el) {
                                console.log(
                                  `Message ${itemId} not found in the spam container.`
                                );
                                resolve(null);
                              }
                              console.log(el);
                              await delay(1000);

                              function onClickElement(element) {
                                return new Promise((resolve, reject) => {
                                  element.click();

                                  setTimeout(() => {
                                    resolve("Element clicked successfully!");
                                  }, 100);

                                  // reject the promise after a timeout of 5 seconds if the element is not clicked
                                  setTimeout(() => {
                                    reject("Element click timed out!");
                                  }, 1000);
                                });
                              }
                              if (el) {
                                await onClickElement(el);
                                // await el.click();
                              }
                              const respones = await delay(2000);

                              indexArray.push(i);
                              resolve(respones);
                            } catch (error) {
                              console.log(error, "promises push errro");
                            }
                          }, Math.random() * 1000);
                        });

                        // });

                        // promises.push(promise);
                        // promise
                        //   .then((message) => {
                        //     console.log("final promise executed");
                        //     // alert("promise executed");
                        //   })
                        //   .catch((error) => {
                        //     console.log("final promise failed");

                        //     // alert("promise failed");
                        //   });
                      }
                      document.body.removeChild(disableDiv);
                      loadingDiv.style.display = "none";

                      indexArray.sort((a, b) => b - a);
                      for (const index of indexArray) {
                        messagesToDeleteArray.splice(index, 1);
                      }
                      console.log(messagesToDeleteArray);
                      const promiseForStorage = new Promise(
                        (resolve, reject) => {
                          chrome.storage.local.set(
                            { buttonStates: messagesToDeleteArray },
                            () => {
                              if (chrome.runtime.lastError) {
                                reject(chrome.runtime.lastError);
                              } else {
                                resolve("Button states saved to storage");
                              }
                            }
                          );
                        }
                      );
                      console.log(promiseForStorage, "promiseForStorage");
                      promiseForStorage
                        .then((message) => {
                          // window.location.reload();
                        })
                        .catch((error) => {
                          // alert("promise failed");
                        });
                    } else {
                      alert("nothing to delete");
                    }
                  }
                );
              });

              noButton.addEventListener("click", () => {
                // User clicked "No"
                popupContainer.remove(); // Remove the popup from the page

                return;
              });

              // Add the message and buttons to the popup container
              popupContainer.appendChild(popupMessage);
              popupContainer.appendChild(yesButton);
              popupContainer.appendChild(noButton);

              // Add the popup container to the page
              document.body.appendChild(popupContainer);

              // key tasks
              // get button states from chrome local storage
              // then apply dele functionality on them
              // empty local storage as per they get deleted via promises
            };

            const selectAllButton = document.createElement("button");
            selectAllButton.innerHTML = "Select All";
            selectAllButton.style.margin = "10px 0px 10px 10px";
            selectAllButton.style.color = "#06C1FF";
            selectAllButton.onclick = async function () {
              clearInterval(intervalId); // stop setInterval

              await chrome.storage.local.get(
                ["allStates"],
                async function (result) {
                  let allStatesInside = result.allStates || [];
                  console.log(allStatesInside, "  ");

                  const indexArray = [];

                  if (allStatesInside.length > 0) {
                    const promiseForStorage = new Promise((resolve, reject) => {
                      chrome.storage.local.set(
                        { buttonStates: allStatesInside },
                        () => {
                          if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                          } else {
                            resolve("Button states saved to storage");
                          }
                        }
                      );
                    });
                    console.log(promiseForStorage, "promiseForStorage");
                    promiseForStorage
                      .then((message) => {
                        renderMessageContainer();
                        // window.location.reload();
                      })
                      .catch((error) => {
                        // alert("promise failed");
                      });

                    // window.location.reload();

                    // Promise.allSettled(promises).then((results) => {
                    //   console.log(results);
                    // });
                  } else {
                    alert("nothing to delete");
                  }
                }
              );
              // key tasks
              // get button states from chrome local storage
              // then apply delete functionality on them
              // empty local storage as per they get deleted via promises
            };

            const unselectSelectedElements = document.createElement("button");
            unselectSelectedElements.innerHTML = "Unselect All";
            unselectSelectedElements.style.margin = "10px 0px 10px 10px";
            unselectSelectedElements.style.color = "#06C1FF";
            unselectSelectedElements.onclick = async function () {
              clearInterval(intervalId); // stop setInterval

              await chrome.storage.local.get(
                ["allStates"],
                async function (result) {
                  let allStatesInside = result.allStates || [];
                  console.log(allStatesInside, "  ");

                  const indexArray = [];

                  if (allStatesInside.length > 0) {
                    const promiseForStorage = new Promise((resolve, reject) => {
                      chrome.storage.local.set({ buttonStates: [] }, () => {
                        if (chrome.runtime.lastError) {
                          reject(chrome.runtime.lastError);
                        } else {
                          resolve("Button states saved to storage");
                        }
                      });
                    });
                    console.log(promiseForStorage, "promiseForStorage");
                    promiseForStorage
                      .then((message) => {
                        renderMessageContainer();
                        // window.location.reload();
                      })
                      .catch((error) => {
                        // alert("promise failed");
                      });

                    // window.location.reload();

                    // Promise.allSettled(promises).then((results) => {
                    //   console.log(results);
                    // });
                  } else {
                    alert("nothing to delete");
                  }
                }
              );
              // key tasks
              // get button states from chrome local storage
              // then apply delete functionality on them
              // empty local storage as per they get deleted via promises
            };
            const clonedArray = Array.from(clonedMessagesMap.entries());
            console.log("clonedArray", clonedArray);

            const renderMessageContainer = async () => {
              spamContainer.innerHTML = "";
              spamContainer.appendChild(deleteAllButton);
              spamContainer.appendChild(selectAllButton);
              spamContainer.appendChild(unselectSelectedElements);
              await chrome.storage.local.get(
                ["buttonStates", "allStates"],
                function (result) {
                  buttonStates = result.buttonStates || [];
                  allStates = result.allStates || [];
                  console.log(allStates, "allStates inside array");

                  console.log(buttonStates, "buttonStates inside array");
                  selectedCount = buttonStates.length;

                  for (let [key, item] of clonedArray) {
                    messageContainer = document.createElement("div");
                    messageContainer.border = "2px solid white";
                    messageContainer.style.display = "flex";
                    messageContainer.style.flexDirection = "row";
                    messageContainer.style.alignItems = "center";
                    messageContainer.style.justifyContent = "center";

                    const toRemoveLink = "https://web.telegram.org/k/";
                    let copyKey = key;
                    let itemId = copyKey.replace(toRemoveLink, "");
                    itemId = itemId.replace(/[^\w\s]/gi, ""); // remove special characters

                    console.log(itemId, "itemId");

                    // Delete Checkbox
                    const deleteCheckbox = document.createElement("input");
                    deleteCheckbox.type = "checkbox";
                    deleteCheckbox.setAttribute("class", "delete-checkbox");
                    deleteCheckbox.setAttribute(
                      "style",
                      "-webkit-appearance: checkbox;"
                    );
                    deleteCheckbox.style.height = "16px";
                    deleteCheckbox.style.width = "16px";
                    deleteCheckbox.style.margin = "10px 10px 10px 0px";
                    deleteCheckbox.style.opacity = 1;
                    deleteCheckbox.style.position = "relative";
                    deleteCheckbox.style.zIndex = 10000;
                    deleteCheckbox.checked = buttonStates.includes(key)
                      ? true
                      : false;

                    deleteCheckbox.onclick = async function () {
                      if (!buttonStates.includes(key)) {
                        deleteCheckbox.checked = true;
                        buttonStates.push(key);
                        const promise = new Promise((resolve, reject) => {
                          chrome.storage.local.set(
                            { buttonStates: buttonStates },
                            () => {
                              if (chrome.runtime.lastError) {
                                reject(chrome.runtime.lastError);
                              } else {
                                resolve("Button states saved to storage");
                              }
                            }
                          );
                        });

                        promise
                          .then((message) => {
                            console.log(key);
                            console.log(message);
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      } else {
                        deleteCheckbox.checked = false;
                        console.log(buttonStates, "buttonStates");
                        // if (buttonStates.includes(key)) {
                        console.log(key, "key");
                        let index = -1; // Initialize index to -1 in case the element is not found
                        for (let i = 0; i < buttonStates.length; i++) {
                          if (buttonStates[i] === key) {
                            index = i;
                            break; // Exit the loop once the element is found
                          }
                        }
                        console.log(index);
                        if (index !== -1) {
                          buttonStates.splice(index, 1);

                          const promise = new Promise((resolve, reject) => {
                            chrome.storage.local.set(
                              { buttonStates: buttonStates },
                              () => {
                                if (chrome.runtime.lastError) {
                                  reject(chrome.runtime.lastError);
                                } else {
                                  resolve("Button states saved to storage");
                                }
                              }
                            );
                          });

                          promise
                            .then((message) => {
                              console.log(key);
                              console.log(message);
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                        }

                        // }
                      }
                    };

                    const deleteButton = document.createElement("button");

                    deleteButton.id = `id${itemId}`;
                    deleteButton.innerHTML = "x";
                    deleteButton.style.color = "white";
                    deleteButton.style.margin = "10px 0px 10px 10px";
                    deleteButton.onclick = async function (element) {
                      const spamContainer =
                        document.querySelector(".spam-container");
                      // spamContainer.style.display =
                      //   spamContainer.style.display === "none"
                      //     ? "block"
                      //     : "none";
                      const delay = (ms) =>
                        new Promise((resolve) => setTimeout(resolve, ms));

                      // console.log(key)

                      // Remove the telegram url and just get the Message ID
                      const toRemove = "https://web.telegram.org/k/";
                      const localItemId = key.replace(toRemove, "");
                      const el = document.querySelector(
                        `[href="${localItemId}"]`
                      );

                      // Right-click on the message
                      if (el) {
                        el.style.display = "none";
                        await triggerRightClick(el);
                      } else {
                        // alert("Something went wrong.");
                      }

                      // the delete button containing message body
                      // const dynamicClass = "my-dynamic-class"; // replace this with your dynamic class
                      const afterRightClickMenu = document.querySelector(
                        ".btn-menu.contextmenu"
                      );
                      if (afterRightClickMenu) {
                        afterRightClickMenu.style.display = "none";
                      }
                      console.log(afterRightClickMenu, "afterRightClickMenu");
                      // Click the delete button the menu
                      await delay(1000);
                      const menuDeleteButton = document.querySelector(
                        ".tgico-delete.danger"
                      );
                      console.log("deleteButton", deleteButton);
                      if (menuDeleteButton) {
                        // menuDeleteButton.style.display = "none";
                        await menuDeleteButton.click();
                      } else {
                        // alert("Something went wrong.");
                      }

                      function onClickElement(element) {
                        return new Promise((resolve, reject) => {
                          element.click();

                          setTimeout(() => {
                            resolve("Element clicked successfully!");
                          }, 100);

                          // reject the promise after a timeout of 5 seconds if the element is not clicked
                          setTimeout(() => {
                            reject("Element click timed out!");
                          }, 5000);
                        });
                      }

                      // Click the delete button confirmation
                      await delay(1200);

                      const deletePopupFinal = document.querySelector(
                        "popup.popup-peer.popup-delete-chat"
                      );

                      if (deletePopupFinal) {
                        deletePopupFinal.style.display = "none";
                      }

                      const confirmDeleteButton =
                        document.querySelector(".btn.danger.rp");

                      if (confirmDeleteButton) {
                        await onClickElement(confirmDeleteButton);
                        // alert(`Message ${itemId} successfully deleted.`);
                      } else {
                        // alert("Something went wrong.");
                      }
                      const itemToRemove = spamContainer.querySelector(
                        `[href="${localItemId}"]`
                      );
                      itemToRemove.style.display = "none";
                      deleteButton.style.display = "none";
                      deleteCheckbox.style.display = "none";
                      await delay(1000);
                    };

                    // all states saving
                    if (!allStates.includes(key)) {
                      allStates.push(key);
                      const promise = new Promise((resolve, reject) => {
                        chrome.storage.local.set(
                          { allStates: allStates },
                          () => {
                            if (chrome.runtime.lastError) {
                              reject(chrome.runtime.lastError);
                            } else {
                              resolve("Button states saved to storage");
                            }
                          }
                        );
                      });

                      promise
                        .then((message) => {
                          console.log(key);
                          console.log(message);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }

                    messageContainer.appendChild(deleteCheckbox);

                    // add the toggle button to the message container
                    messageContainer.appendChild(item);

                    // messageContainer.appendChild(toggleButton);

                    messageContainer.appendChild(deleteButton);

                    spamContainer.appendChild(messageContainer);
                  }
                }
              );
            };
            await renderMessageContainer();
          }
        }
      );
    }

    // Call processMessages every 5 seconds to check for new messages
    // processMessages();
    intervalId = setInterval(processMessages, 5000);
  }

  moveMessagesToSpam();

  const style = document.createElement("style");
  style.innerHTML = `
  .custom-spam-button {
    background-color: white;
    color: blue;
    border: 1px solid blue;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
  }
  .custom-spam-button:hover {
    background-color: blue;
    color: white;
  }

  .spam-container::-webkit-scrollbar {
    width: 12px;
  }
  .spam-container::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .spam-container::-webkit-scrollbar-thumb {
    background-color: rgb(6 193 255 / 29%);
    border-radius: 10px;
  }
  .spam-container::-webkit-scrollbar-thumb:hover {
    background-color: rgb(6 193 255);
  }
  .spam-container .row-title,.spam-container .primary-text,.spam-container .badge{
    color:black!important;
  }
  .spam-container .badge{
    z-index : 2;
    color:black!important;
  }
  .spam-container .c-ripple{
    background-color : white!important;
  }
`;
  document.head.appendChild(style);
};

//This is the main function
(function () {
  console.log("Start Extension");
  addShieldButton();
})();

//May 1, 2023
//Put some functions outside
//Separated the codes that would start Option 2
