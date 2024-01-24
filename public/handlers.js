const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const deleteAll = () => {
  fetch("http://localhost:3000/users/delete/all");
};

const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users/all", headers);
    const userData = await response.json();

    if (!userData.user.length) {
      location.href = "/";
    }

    if (userData && userData.user) {
      userData.user.forEach((user) => {
        createUserCard(user);
      });
    } else {
      console.error("No user data found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const createUserCard = (userData) => {
  var userCard = document.getElementById("userCard");

  var image = document.createElement("img");
  image.src = userData.image[0].value;
  image.alt = "User Image";
  image.className = "user-image";

  var displayName = document.createElement("h2");
  displayName.textContent = userData.displayName;

  var userId = document.createElement("p");
  userId.textContent = "User ID: " + userData._id;

  var twitterId = document.createElement("p");
  twitterId.textContent = "Twitter ID: " + userData.twitterId;

  var username = document.createElement("p");
  username.textContent = "Username: " + userData.username;

  var displayUsername = document.createElement("p");
  displayUsername.textContent = "Display Name: " + userData.displayName;

  userCard.appendChild(image);
  userCard.appendChild(displayName);
  userCard.appendChild(userId);
  userCard.appendChild(twitterId);
  userCard.appendChild(username);
  userCard.appendChild(displayUsername);
};
