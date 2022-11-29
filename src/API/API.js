import Parse from "parse";

const CreateUser = async function (
  username,
  password,
  email,
  nativeLanguage,
  targetLanguage,
  profilePicture
) {
  console.log("Creating new user");
  // const navigate = useNavigate();

  
  try {
    const user = new Parse.User();
    console.log("Creating new user");
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("nativeLanguage", nativeLanguage);
    user.set("targetLanguage", targetLanguage);
    user.set("profilePicture", new Parse.File("catIcon.img", { base64: profilePicture }));
    await user.signUp();
    //alert(`User ${user.getUsername()} created`);
    //navigate("/");
  } catch (error) {
    alert(`Error when trying to create a new user! ${error}`);
  }
};

/* const creaeUser = async function (
  username,
  password,
  email,
  nativeLanguage,
  targetLanguage
) {
  let userData = {
    username: username,
    password: password,
    email: email,
    nativeLanguage: nativeLanguage,
    targetLanguage: targetLanguage,
  };

  fetch("https://parseapi.back4app.com/classes/User", {
    method: "POST",
    headers: {
      "X-Parse-Application-Id": "oyvNGU2jDF7KZjkNpZCyXZh9xpBaIh0Mrzg6fwpg",
      "X-Parse-REST-API-Id": "7UoEqMNtD3gvlWIumvtqBujB5gBcDn9Ej17su4I0",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) =>
      console.log(`Error when trying to create a new user: ${error}`)
    );
};

 */

/* curl -X POST \
-H "X-Parse-Application-Id: BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f" \
-H "X-Parse-REST-API-Key: swrFFIXJlFudtF3HkZPtfybDFRTmS7sPwvGUzQ9w" \
-H "Content-Type: application/json" \
-d '{"myCustomKey1Name":"myCustomKey1Value","myCustomKey2Name":"myCustomKey2Value"}' \
https://parseapi.back4app.com/classes/MyCustomClassName */

export { CreateUser };

/* export default {user: {create: CreateUser, delete: DeleteUserInfo}, chat: {create: CreateChat}}


import API from 

API.user.create()
 */