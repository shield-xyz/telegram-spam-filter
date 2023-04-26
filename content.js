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
    let loadingDiv;

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
        spamContainer.style.backgroundColor = "white";
        spamContainer.style.display =
          spamContainer.style.display === "none" ? "block" : "none";
      };

      console.log("Adding Spam button");

      headerElement.parentElement.appendChild(spamTab);
    });

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
              spamContainer = document.createElement("div");
              spamContainer.className = "spam-container";
              spamContainer.style.display = "none";
              spamContainer.style.position = "fixed";
              spamContainer.style.top = "150px";
              spamContainer.style.right = "20px";
              spamContainer.style.zIndex = 9999;
              // spamContainer.style.backgroundColor = '#fff';
              spamContainer.style.backgroundColor = "#000";
              spamContainer.style.border = "1px solid #ccc";
              spamContainer.style.padding = "20px";
              spamContainer.style.height = "400px";
              spamContainer.style.overflow = "auto";
              spamContainer.style.width = "500px"; // Adjust the width of the spam box
              const body = document.querySelector("body");

              //Delete all checkboxes button
              // deleteAllContainer = document.createElement("div");
              // deleteAllContainer.style.display = "flex";
              // deleteAllContainer.style.flexDirection = "row";
              // deleteAllContainer.style.alignItems = "center";
              // deleteAllContainer.style.justifyContent = "space-between";

              // deleteAllBox = document.createElement("input");
              // deleteAllBox.type = "checkbox";
              // deleteAllBox.setAttribute("class", "delete-all-checkbox");
              // deleteAllBox.setAttribute("style", "-webkit-appearance: checkbox;");
              // deleteAllBox.style.height = "16px";
              // deleteAllBox.style.width = "16px";
              // deleteAllBox.style.margin = "10px 10px 10px 0px";
              // deleteAllBox.style.opacity = 1;
              // deleteAllBox.style.position = "relative";
              // deleteAllBox.style.zIndex = 10000;

              // deleteEverythingButton = document.createElement("button");
              // deleteEverythingButton.innerHTML = "Delete Selected";
              // deleteEverythingButton.setAttribute("class", "delete-all-button");
              // deleteEverythingButton.style.backgroundColor="#3c87f7";
              // deleteEverythingButton.style.borderRadius="5px";
              // deleteEverythingButton.style.color="white";
              // deleteEverythingButton.style.display="none";
              // deleteEverythingButton.style.fontSize="12px";
              // deleteEverythingButton.style.padding = "7px 10px 5px";

              // deleteAllContainer.appendChild(deleteAllBox);
              // deleteAllContainer.appendChild(deleteEverythingButton);

              // spamContainer.appendChild(deleteAllContainer);
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
            let allStates = [];

            // Rest of the code
            // await delay(500);
            const deleteAllButton = document.createElement("button");
            deleteAllButton.innerHTML = "Delete Selected";
            deleteAllButton.style.margin = "10px 0px 10px 10px";
            deleteAllButton.style.color = "black";
            deleteAllButton.onclick = async function () {
              clearInterval(intervalId); // stop setInterval

              // Create the popup container
              const popupContainer = document.createElement("div");
              popupContainer.style.position = "fixed";
              popupContainer.style.top = "50%";
              popupContainer.style.left = "50%";
              popupContainer.style.transform = "translate(-50%, -50%)";
              popupContainer.style.background = "#fff";
              popupContainer.style.border = "2px solid #000";
              popupContainer.style.borderRadius = "5px";
              popupContainer.style.padding = "20px";
              popupContainer.style.boxShadow =
                "0px 0px 10px rgba(0, 0, 0, 0.5)";
              popupContainer.style.zIndex = "9999";

              // Create the popup message
              const popupMessage = document.createElement("p");
              popupMessage.innerText = "Are you sure you want to continue?";
              popupMessage.style.margin = "0 0 20px 0";

              // Create the "Yes" button
              const yesButton = document.createElement("button");
              yesButton.innerText = "Yes";
              yesButton.style.marginRight = "10px";

              // Create the "No" button
              const noButton = document.createElement("button");
              noButton.innerText = "No";

              // Add event listeners to the buttons
              yesButton.addEventListener("click", async () => {
                // User clicked "Yes"
                // TODO: Continue with action
                popupContainer.remove(); // Remove the popup from the page

                await chrome.storage.local.get(
                  ["buttonStates"],
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

                      for (let i = 0; i < buttonDeleteAllStates.length; i++) {
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
                              const singleItem = buttonDeleteAllStates[i];
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
                        buttonDeleteAllStates.splice(index, 1);
                      }
                      console.log(buttonDeleteAllStates);
                      const promiseForStorage = new Promise(
                        (resolve, reject) => {
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

                      // window.location.reload();

                      // Promise.allSettled(promises).then((results) => {
                      //   console.log(results);
                      // });
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
            selectAllButton.style.color = "black";
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
              // then apply dele functionality on them
              // empty local storage as per they get deleted via promises
            };

            const unselectSelectedElements = document.createElement("button");
            unselectSelectedElements.innerHTML = "UnSelect Selected";
            unselectSelectedElements.style.margin = "10px 0px 10px 10px";
            unselectSelectedElements.style.color = "black";
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
              // then apply dele functionality on them
              // empty local storage as per they get deleted via promises
            };
            const clonedArray = Array.from(clonedMessagesMap.entries());

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
                      await delay(500);
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
                      await delay(1000);

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
                      // const deleteButtonToRemove = spamContainer.querySelector(
                      //   `#id${itemId}`
                      // );
                      itemToRemove.style.display = "none";
                      deleteButton.style.display = "none";
                      deleteCheckbox.style.display = "none";
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

// hiding the popups like leave group , delete group
// confirm message for user that how many chats they are deleeting
