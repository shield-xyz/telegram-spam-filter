(function () {
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
      setTimeout(
        () => waitForMessages(selector, callback, maxRetries - 1),
        100
      );
    }
  }

  let processedMessages = new Set();
  let clonedMessages = new Set();
  let clonedMessagesMap = new Map();

  function moveMessagesToSpam() {
    waitForElement(".sidebar-header__btn-container", (headerElement) => {
      const spamTab = document.createElement("button");
      //const headerElement = document.querySelector('.sidebar-header__btn-container');
      spamTab.className = "custom-spam-button";
      spamTab.style.position = "fixed";
      spamTab.style.right = "20px";
      spamTab.style.top = "80px";
      spamTab.style.zIndex = "9999";

      spamTab.style.width = "50px";
      spamTab.style.height = "50px";
      spamTab.style.backgroundImage =
        'url("' + chrome.runtime.getURL("images/icon.png") + '")';
      spamTab.style.backgroundSize = "cover";

      console.log("Spam icon URL:", spamTab.style.backgroundImage);

      // const spamIcon = document.createElement('img');
      // spamIcon.src = chrome.runtime.getURL('images/icon.png');
      // console.log("Spam icon URL:", spamIcon.src);
      // spamIcon.style.width = '50px';
      // spamIcon.style.height = '50px';
      // spamIcon.style.marginRight = '5px'; // Adjust the margin to position the icon

      // const spamText = document.createTextNode('Spam');

      // spamTab.appendChild(spamIcon);
      // spamTab.appendChild(spamText);

      spamTab.onclick = () => {
        const spamContainer = document.querySelector(".spam-container");
        spamContainer.style.display =
          spamContainer.style.display === "none" ? "block" : "none";
      };

      console.log("Adding Spam button");
      headerElement.parentElement.appendChild(spamTab);
    });

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

    function triggerLeftClick(element) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        button: 0, // 0 for left button, 1 for middle button, 2 for right button
      });

      element.dispatchEvent(event);
    }

    let intervalId;

    function processMessages() {
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
            if (!spamContainerCurrent) {
              spamContainer = document.createElement("div");
              spamContainer.className = "spam-container";
              spamContainer.style.display = "none";
              spamContainer.style.position = "fixed";
              spamContainer.style.top = "150px";
              spamContainer.style.right = "20px";
              spamContainer.style.zIndex = 9999;
              // spamContainer.style.backgroundColor = '#fff';
              spamContainer.style.backgroundColor = "#fff";
              spamContainer.style.border = "1px solid #ccc";
              spamContainer.style.padding = "20px";
              spamContainer.style.height = "400px";
              spamContainer.style.overflow = "auto";
              spamContainer.style.width = "700px"; // Adjust the width of the spam box
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
              const messagePreview = messagePreviewMatch
                ? messagePreviewMatch.toLowerCase()
                : null;
              // const messagePreview = messageList[i].querySelector('.row-subtitle').textContent.match(/(?:[^:]*: )(.*)/)[1]

              //console.log('Message preview:', messagePreview);
              try {
                // console.log(messagePreview, "messagePreview");
                if (
                  // messagePreview.includes("🔥") ||
                  // messagePreview.includes("🚀") ||
                  // messagePreview.includes("hi") ||
                  // messagePreview.includes("hello")
                  messagePreview.includes("pancake")
                ) {
                  // console.log('Including message:', messagePreview);

                  message.style.display = "none";

                  const clonedMessage = message.cloneNode(true);

                  // Mark the message as processed
                  if (!processedMessages.has(message)) {
                    processedMessages.add(message);

                    // Add some custom styling to make the messages visible inside the spam container
                    clonedMessage.style.display = "flex";
                    clonedMessage.style.padding = "10px";
                    clonedMessage.style.flexDirection = "column";
                    clonedMessage.style.border = "1px solid #ccc";
                    clonedMessage.style.marginBottom = "10px";
                    clonedMessage.style.backgroundColor = "#f7f7f7";
                    clonedMessage.style.color = "#333";
                    clonedMessage.style.id = i + messagePreview[0];

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
              } catch (error) {}
            }
            console.log(spamContainer, "spam containerx");

            // adding button on spamContainer

            while (spamContainer.firstChild) {
              spamContainer.removeChild(spamContainer.firstChild);
            }

            let buttonStates = [];

            // Rest of the code
            // await delay(500);
            const deleteAllButton = document.createElement("button");
            deleteAllButton.innerHTML = "Delete all";
            deleteAllButton.style.margin = "10px 0px 10px 10px";
            deleteAllButton.onclick = async function (element) {
              clearInterval(intervalId); // stop setInterval

              await chrome.storage.local.get(
                ["buttonStates"],
                async function (result) {
                  let buttonDeleteAllStates = result.buttonStates || [];
                  console.log(buttonDeleteAllStates, "buttondeleteallstates");
                  const promises = [];
                  const indexArray = [];

                  if (buttonDeleteAllStates.length > 0) {
                    for (let i = 0; i < buttonDeleteAllStates.length; i++) {
                      await new Promise((resolve) => {
                        setTimeout(async function () {
                          // const promise = new Promise(async (resolve, reject) => {
                          try {
                            const spamContainer =
                              document.querySelector(".spam-container");
                            // spamContainer.style.display =
                            //   spamContainer.style.display === "none"
                            //     ? "block"
                            //     : "none";
                            const delay = (ms) =>
                              new Promise((resolve) => setTimeout(resolve, ms));

                            // console.log(key)
                            const singleItem = buttonDeleteAllStates[i];
                            // Remove the    url and just get the Message ID
                            // Remove the telegram url and just get the Message ID
                            const toRemove = "https://web.telegram.org/k/";
                            let itemId = singleItem.replace(toRemove, "");
                            itemId = itemId.replace(/[^\w\s]/gi, ""); // remove special characters

                            console.log(itemId, "itemId");
                            const el = spamContainer.querySelector(
                              `#id${itemId}`
                            );
                            if (!el) {
                              console.log(
                                `Message ${itemId} not found in the spam container.`
                              );
                              resolve(null);
                            }
                            console.log(el);
                            // await delay(1000);

                            if (el) {
                              await el.click();
                            }
                            const respones = await delay(2000);

                            // const el = document.querySelector(`[href="${itemId}"]`);

                            // // Right-click on the message
                            // if (el) triggerRightClick(el);
                            // else {
                            //   alert("Something went wrong.");
                            // }

                            // // Click the delete button the menu
                            // await delay(500);
                            // try {
                            //   const menuDeleteButton = document.querySelector(
                            //     ".tgico-delete.danger"
                            //   );

                            //   console.log("deleteButton", deleteButton);
                            //   if (menuDeleteButton) menuDeleteButton.click();
                            //   else {
                            //     alert("Something went wrong.");
                            //   }
                            // } catch (e) {
                            //   console.log(e);
                            // }
                            // // Click the delete button confirmation
                            // await delay(1000);
                            // try {
                            //   const confirmDeleteButton =
                            //     document.querySelector(".btn.danger.rp");
                            //   if (confirmDeleteButton) {
                            //     confirmDeleteButton.click();
                            //     alert(`Message ${itemId} successfully deleted.`);
                            //   } else {
                            //     alert("Something went wrong.");
                            //   }
                            // } catch (e) {
                            //   console.log(e);
                            // }
                            // await delay(2000);
                            // indexArray.push(i);
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

                    indexArray.sort((a, b) => b - a);
                    for (const index of indexArray) {
                      buttonDeleteAllStates.splice(index, 1);
                    }

                    const promiseForStorage = new Promise((resolve, reject) => {
                      chrome.storage.local.set(
                        { buttonStates: buttonDeleteAllStates },
                        () => {
                          if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                          } else {
                            resolve("Button states saved to storage");
                          }
                        }
                      );
                    });

                    promiseForStorage
                      .then((message) => {
                        window.location.reload();
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
              // then apply dele functionality on them
              // empty local storage as per they get deleted via promises
            };

            spamContainer.appendChild(deleteAllButton);

            const clonedArray = Array.from(clonedMessagesMap.entries());

            const renderMessageContainer = async () => {
              await chrome.storage.local.get(
                ["buttonStates"],
                function (result) {
                  buttonStates = result.buttonStates || [];
                  console.log(buttonStates, "buttonStates outside array");

                  console.log(buttonStates, "buttonStates outside array");

                  for (let [key, item] of clonedArray) {
                    messageContainer = document.createElement("div");
                    messageContainer.border = "2px solid white";
                    messageContainer.style.display = "flex";
                    messageContainer.style.flexDirection = "row";
                    messageContainer.style.alignItems = "center";
                    messageContainer.style.justifyContent = "center";

                    const deleteButton = document.createElement("button");
                    const toRemoveLink = "https://web.telegram.org/k/";
                    let copyKey = key;
                    let itemId = copyKey.replace(toRemoveLink, "");
                    itemId = itemId.replace(/[^\w\s]/gi, ""); // remove special characters

                    console.log(itemId, "itemId");
                    deleteButton.id = `id${itemId}`;
                    deleteButton.innerHTML = "x";
                    deleteButton.style.margin = "10px 0px 10px 10px";
                    deleteButton.onclick = async function (element) {
                      const spamContainer =
                        document.querySelector(".spam-container");
                      spamContainer.style.display =
                        spamContainer.style.display === "none"
                          ? "block"
                          : "none";
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
                      if (el) await triggerRightClick(el);
                      else {
                        // alert("Something went wrong.");
                      }

                      // Click the delete button the menu
                      await delay(500);
                      const menuDeleteButton = document.querySelector(
                        ".tgico-delete.danger"
                      );
                      console.log("deleteButton", deleteButton);
                      if (menuDeleteButton) await menuDeleteButton.click();
                      else {
                        // alert("Something went wrong.");
                      }

                      // Click the delete button confirmation
                      await delay(1000);
                      const confirmDeleteButton =
                        document.querySelector(".btn.danger.rp");
                      if (confirmDeleteButton) {
                        await confirmDeleteButton.click();
                        // alert(`Message ${itemId} successfully deleted.`);
                      } else {
                        // alert("Something went wrong.");
                      }
                      const itemToRemove = spamContainer.querySelector(
                        `[href="${localItemId}"]`
                      );
                      // const deleteButtonToRemove = spamContainer.querySelector(
                      //   `#id${itemId}`
                      // );
                      itemToRemove.style.display = "none";
                      deleteButton.style.display = "none";
                      // messageContainer.removeChild
                      await delay(1000);
                      // await renderMessageContainer();
                      // messageContainer.removeChild(el);

                      // Right-click on the message

                      // window.open(key, "_self");
                      // const menuButton = document.querySelector(".tgico-more");
                      // if (menuButton) {
                      //   menuButton.click();
                      //   await delay(500);
                      //   // Click on the Delete button
                      //   const deleteButton = document.querySelector(".tgico-delete");
                      //   if (deleteButton) {
                      //     deleteButton.click();

                      //     await delay(1000);

                      //     // Click on the confirmation button to delete the message
                      //     const confirmationButton = document.querySelector(
                      //       ".popup-buttons button:first-child"
                      //     );
                      //     if (confirmationButton) {
                      //       // confirmationButton.click();

                      //       clonedMessagesMap.delete(key);
                      //     }
                      //   }
                      // }
                    };
                    if (!buttonStates.includes(key)) {
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
                    }

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
`;
  document.head.appendChild(style);
})();

// const toggleButton = document.createElement("button");
//                 let copyKey = key;
//                 const toRemove = "https://web.telegram.org/k/#";
//                 const itemId = copyKey.replace(toRemove, "");
//                 console.log(itemId, "itemId");
//                 toggleButton.id = `id${itemId}`;
//                 toggleButton.innerHTML = "Toggle";
//                 toggleButton.style.margin = "10px";
//                 toggleButton.style.backgroundColor = "green";

//                 console.log(
//                   buttonStates,
//                   buttonStates.includes(key),
//                   key,
//                   "inside"
//                 );
//                 // if buttonStates inclused this keyid
//                 if (buttonStates.includes(key)) {
//                   // ${key}id

//                   // const childElement = document.querySelector(`#id${itemId}`);
//                   // console.log(childElement);
//                   // try {
//                   //   messageContainer.removeChild(childElement);
//                   // } catch (error) {
//                   //   console.log(error);
//                   // }
//                   toggleButton.style.backgroundColor = "blue";
//                   messageContainer.appendChild(toggleButton);

//                   // add button state or index to an array or object here
//                   console.log("Button is now blue");
//                   console.log(buttonStates, "button states");
//                   console.log("togglebutton", true);
//                 } else {
//                   console.log("togglebutton", false);
//                   messageContainer.appendChild(toggleButton);
//                 }
//                 // add the toggle button to the message container
//                 messageContainer.appendChild(item);

//                 messageContainer.appendChild(toggleButton);

//                 messageContainer.appendChild(deleteButton);
//                 spamContainer.appendChild(messageContainer);
//                 toggleButton.style.backgroundColor = "green";
//                 toggleButton.style.color = "white";
//                 toggleButton.onclick = async function () {
//                   if (toggleButton.style.backgroundColor === "green") {
//                     toggleButton.style.backgroundColor = "blue";
//                     // add button state or index to an array or object here
//                     console.log("Button is now blue");
//                     buttonStates.push(key);

//                     await chrome.storage.local.set(
//                       { buttonStates: buttonStates },
//                       function () {
//                         console.log(key);
//                         console.log("Button states saved to storage");
//                       }
//                     );

//                     console.log(buttonStates, "button states");
//                   } else {
//                     toggleButton.style.backgroundColor = "green";
//                     // add button state or index to an array or object here
//                     console.log("Button is now green");
//                     // remove element from array button states
//                     const index = buttonStates.indexOf(key);
//                     buttonStates.splice(index, 1);

//                     await chrome.storage.local.set(
//                       { buttonStates: buttonStates },
//                       function () {
//                         console.log(key);
//                         console.log("Button states delete to storage");
//                       }
//                     );

//                     console.log(buttonStates, "button states");
//                   }
//                 };
