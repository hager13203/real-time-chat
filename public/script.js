(function () {
  const app = document.querySelector(".app");
  const socket = io();
  let uname;

  // Join chat
  app.querySelector("#join-user").addEventListener("click", function () {
    const username = app.querySelector("#username").value.trim();
    if (!username) return;

    socket.emit("newuser", username);
    uname = username;

    app.querySelector(".join-screen").classList.remove("active");
    app.querySelector(".chat-screen").classList.add("active");
  });

  // Send message
  app.querySelector("#send-message").addEventListener("click", function () {
    let message = app.querySelector("#message-input").value;
    if (message.length === 0) {
      return;
    }
    renderMessage("my", {
      username: uname,
      text: message,
    });
    socket.emit("chat", {
      username: uname,
      text: message,
    });
    app.querySelector("#message-input").value = "";
  });

  // Render message
  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");

    let e1 = document.createElement("div");

    if (type === "my") {
      e1.setAttribute("class", "message my-message");
      e1.innerHTML = `
        <div>
            <div class="name">You</div>
            <div class="text">${message.text}</div>
        </div>`;
      messageContainer.appendChild(e1);
    } else if (type === "other") {
      e1.setAttribute("class", "message other-message");
      e1.innerHTML = `
        <div>
            <div class="name">${message.username}</div>
            <div class="text">${message.text}</div>
        </div>`;
      messageContainer.appendChild(e1);
    } else if (type === "update") {
      e1.setAttribute("class", "update");
      e1.innerText = message;
      messageContainer.appendChild(e1);
    }

    // Scroll to the bottom of the message container
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }

  // Exit chat logic
  app.querySelector("#exit-chat").addEventListener("click", function () {
    socket.emit("exituser", uname);
    app.querySelector(".chat-screen").classList.remove("active");
    app.querySelector(".join-screen").classList.add("active");
    uname = null;
  });

  // Listen for update messages (user joined or left)
  socket.on("update", function (update) {
    renderMessage("update", update);
  });

  // Listen for chat messages from other users
  socket.on("chat", function (message) {
    renderMessage("other", message);
  });
})();
