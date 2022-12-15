import { clear } from "@testing-library/user-event/dist/clear";
import Parse from "parse";

export const createUser = async function (
  username,
  password,
  email,
  nativeLanguage,
  targetLanguage,
  profilePicture
) {
  console.log("Creating new user");
  try {
    const User = new Parse.User();
    User.set("username", username);
    User.set("password", password);
    User.set("email", email);
    User.set("nativeLanguage", nativeLanguage);
    User.set("targetLanguage", targetLanguage);
    User.set("profilePicture", profilePicture);
    await User.signUp();
    return true;
  } catch (error) {
    alert(`Error when trying to create a new user! ${error}`);
  }
};

export const logIn = async function (username, password) {
  try {
    const loggedInUser = await Parse.User.logIn(username, password);
    console.log(
      `Success! User ${loggedInUser.get(
        "username"
      )} has successfully signed in!`
    );
  } catch (error) {
    console.log(`Error logging in! ${error}`);
  }
};

export const logOut = async function () {
  try {
    const succes = await Parse.User.logOut();
    localStorage.clear();
    console.log(`Log out: ${succes}`);
  } catch (error) {
    console.log(`Error logging out! ${error}`);
  }
};

export const sendMessage = async function (messageText, chat) {
  const Message = new Parse.Object("Message");
  try {
    Message.set("text", messageText);
    Message.set("chat", chat);
    Message.set("sender", getCurrentUser().id);
    await Message.save();
    return true;
  } catch (error) {
    console.log(
      `Error when trying to send a message to the database! ${error}`
    );
  }
};

export const getMessages = async function (chat) {
  try {
    const parseQuery = new Parse.Query("Message");
    parseQuery.containedIn("chat", chat);
    parseQuery.ascending("createdAt");
    parseQuery.includeAll();
    return parseQuery;
  } catch (error) {
    console.log(`Error when trying to get messages! ${error}`);
  }
};

//almost the same as above
const messagesForChat = async function (chat) {
  try {
    const messageQuery = new Parse.Query("Message");
    messageQuery.equalTo("chat", chat);
    return messageQuery.find();
  } catch (error) {
    console.log(
      `Error when trying to get all messages belonging to a chat! ${error}`
    );
  }
};

// cascading delete - doesn't seem to exist for parse
export const deleteUser = async function (user) {
  try {
    let chats = await getChats(user);
    for (let chat of chats) {
      let messages = await messagesForChat(chat);
      await Parse.Object.destroyAll(messages);
    }
    await Parse.Object.destroyAll(chats);
    await user.destroy();
    console.log("messages and chats should have been deleted");
    return true;
  } catch (error) {
    console.log(
      `Error when trying to delete the user and all of their chats and messages! ${error}`
    );
  }
};

export const createChat = async function (otherUser) {
  const usersObjects = [getCurrentUser(), otherUser];
  try {
    let chat = new Parse.Object("Chat");
    for (var user of usersObjects) {
      chat.add("users", user);
    }
    await chat.save();
    console.log("new chat created");
    return chat;
  } catch (error) {
    console.log(`Error when trying to create a new chat! ${error}`);
  }
};

export const getChats = async function () {
  try {
    const parseQuery = new Parse.Query("Chat");
    parseQuery.equalTo("users", getCurrentUser());
    parseQuery.include("users");
    const chats = await parseQuery.find();
    return chats;
  } catch (error) {
    console.log(`Error when trying to read chats! ${error}`);
  }
};

export const getCurrentUser = () => {
  return Parse.User.current();
};

/* export const getProfilePicture = async function () {
  try {
    const user = getCurrentUser();
    const icon = user.get("profilePicture");
    const iconId = icon.id;
    const query = new Parse.Query("CatIcons");
    query.equalTo("objectId", iconId);
    const result = await query.find();
    return result;
  } catch (error) {
    console.log(`Error when trying to get user profile picture! ${error}`);
  }
}; */

const getAllUsers = async function () {
  const usersQuery = new Parse.Query("User");
  usersQuery.include("profilePicture");
  try {
    const users = await usersQuery.find();
    //console.log(users[0].get("profilePicture").get("catPNG"))
    return users;
  } catch (error) {
    console.log(`Error when trying to read all users: ${error.message}`);
  }
};

const getRandomNumber = async function (allUsers) {
  var length = -1;
  try {
    for (let key in allUsers) {
      length += 1;
    }
    const ranNum = Math.floor(Math.random() * length);
    return ranNum;
  } catch (error) {
    console.log(`Error when trying to get a random number: ${error.message}`);
  }
};

export const getRandomUser = async function () {
  try {
    const allUsers = await getAllUsers();
    const ranNum = await getRandomNumber(allUsers);
    const result = await allUsers[ranNum];

    if (result && getCurrentUser()) {
      if (result.id === getCurrentUser().id) {
        console.log("the random user is the same as the current");
        const allOtherUsers = allUsers.splice(ranNum, 1);
        const newRanNum = await getRandomNumber(allOtherUsers);
        if (newRanNum) {
          console.log("this is the new random number: ", newRanNum);
          console.log("new random user", allOtherUsers[newRanNum]);
        }
        return await allOtherUsers[newRanNum];
      }
      console.log("the random user is different then the current:", result);
      return await result;
    }
  } catch (error) {
    console.log(`Error when trying to get a random user: ${error.message}`);
    return false;
  }
};

export const readCatIcons = async () => {
  try {
    const queryIcons = new Parse.Query("CatIcons");
    const result = await queryIcons.find();
    return result;
  } catch (error) {
    console.log(`Error when trying to get cat icons! ${error}`);
  }
};
