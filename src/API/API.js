import Parse from "parse";

export const createUser = async function (
  username,
  password,
  email,
  nativeLangs,
  targetLangs,
  profilePicture
) {
  console.log("Creating new user");
  try {
    const User = new Parse.User();
    User.set("username", username);
    User.set("password", password);
    User.set("email", email);
    User.set("nativeLangs", nativeLangs);
    User.set("targetLangs", targetLangs);
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
    Message.set("sender", getCurrentUser());
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
    messageQuery.include("sender");
    return messageQuery.find();
  } catch (error) {
    console.log(
      `Error when trying to get all messages belonging to a chat! ${error}`
    );
  }
};

/* This version of deleteUser() will delete the user and also
delete all of their messages and chats.
From a usability viewpoint, maybe it would be better to
move the messages to a 'deleted user' account, so the
other users can still read old messages. /cema
 */
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

const createChatHelper = async function (users) {
  try {
    const chat = new Parse.Object("Chat");
    let usersRelation = chat.relation("users");
    usersRelation.add(users);
    await chat.save();
    console.log("new chat created");
    return chat;
  } catch (error) {
    console.log(`Error when trying to create a new chat! ${error}`);
  }
};

export const createChat = async function () {
  const otherUser = await getRandomUser();
  const usersObjects = [getCurrentUser(), otherUser];
  return await createChatHelper(usersObjects);
};

export const createGroupChat = async function () {
  const user1 = await getRandomUser();
  const user2 = await getRandomUser();
  const usersObjects = [getCurrentUser(), user1, user2];
  return await createChatHelper(usersObjects);
};

export const getChats = async function () {
  try {
    const chatQuery = new Parse.Query("Chat");
    chatQuery.equalTo("users", getCurrentUser());
    chatQuery.includeAll("users");
    const chats = await chatQuery.find();
    return chats;
  } catch (error) {
    console.log(`Error when trying to read chats! ${error}`);
  }
};

const getRelationObjects = async function (object, relationName) {
  try {
    return await object.relation(relationName).query().find();
  } catch (error) {
    console.log(`Error when getting relation objects! ${error}`);
  }
};

export const getUsersInChat = async function (chat) {
  try {
    const users = await getRelationObjects(chat, "users");
    for (let user of users) {
      await user.get("profilePicture").fetch(); //needed to get pictures later on
    }
    return users;
  } catch (error) {
    console.log(`Error when trying to get users belonging to chat! ${error}`);
  }
};

export const getCurrentUser = () => {
  return Parse.User.current();
};

const getAllUsers = async function () {
  const usersQuery = new Parse.Query("User");
  usersQuery.include("profilePicture");
  try {
    const users = await usersQuery.find();
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

const getRandomUser = async function () {
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
      return await result;
    }
  } catch (error) {
    console.log(`Error when trying to get a random user: ${error.message}`);
    return false;
  }
};

const getNonMatchedUsers = async function () {
  const currentUser = getCurrentUser();
  const targetLanguages = await getRelationObjects(currentUser, "targetLangs");
  const nativeLanguages = await getRelationObjects(currentUser, "nativeLangs");
  const chats = await getChats();
  const n = new Set();
  for (let chat of chats) {
    const users = await getUsersInChat(chat);
    for (let user of users) {
      n.add(user.get("username"));
    }
  }
  const names = [...n];
  try {
    const usersQuery = new Parse.Query("User");
    usersQuery.notContainedIn("username", names);
    usersQuery.containedIn("targetLangs", targetLanguages);
    usersQuery.containedIn("nativeLangs", nativeLanguages);
    return await usersQuery.find();
  } catch (error) {
    console.log(
      `Error when trying to get all non matched users: ${error.message}`
    );
  }
};

const matchUsersOnLanguages = async function () {
  const nonMatchedUsers = await getNonMatchedUsers();
  const currentUser = getCurrentUser();
  const targetLanguages = await getRelationObjects(currentUser, "targetLangs");
  const nativeLanguages = await getRelationObjects(currentUser, "nativeLangs");
  try {
  } catch (error) {
    console.log(
      `Error when trying to match users on language: ${error.message}`
    );
  }
};

export const getCatIcons = async () => {
  try {
    const queryIcons = new Parse.Query("CatIcons");
    const result = await queryIcons.find();
    return result;
  } catch (error) {
    console.log(`Error when trying to get cat icons! ${error}`);
  }
};

export async function deleteChat(chat) {
  try {
    let messages = await getMessages(chat);
    await Parse.Object.destroyAll(messages);
    const success = await chat.destroy();
    return success;
  } catch (error) {
    return false;
  }
}
