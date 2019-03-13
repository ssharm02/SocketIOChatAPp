const socket = io();

socket.on("message", message => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message);
});

document.querySelector("#send-location").addEventListener("click", e => {
  if (!navigator.geolocation) {
    return alert("not supported by your shitty browser");
  }
  navigator.geolocation.getCurrentPosition(position => {
    //callback function

    //emit new event
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});

// socket.on("countUpdated", count => {
//   console.log("the count has been updated", count);
// });

// window.onload = function() {
//   document.querySelector("#increment").addEventListener("click", () => {
//     console.log("clicked");
//     socket.emit("increment");
//   });
// };
