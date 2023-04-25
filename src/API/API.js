import Parse from "parse";

export async function createUser(username, password, email, profilePicture) {
  try {
    const User = new Parse.User();
    User.set("username", username);
    User.set("password", password);
    User.set("email", email);
    User.set("profilePicture", profilePicture);
    await User.signUp();
    return true;
  } catch (error) {
    alert(`Error when trying to create a new user! ${error}`);
  }
}

export async function logIn(username, password) {
  try {
    await Parse.User.logIn(username, password);
  } catch (error) {
    alert("Please enter a valid Username and Password!");
  }
}

export async function logOut() {
  try {
    return await Parse.User.logOut();
  } catch (error) {
    console.log(`Error logging out! ${error}`);
  }
}

export async function sendMessage(messageText, chat) {
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
}

export async function getMessagesToDisplay(chat) {
  try {
    const parseQuery = new Parse.Query("Message");
    parseQuery.containedIn("chat", chat);
    parseQuery.ascending("createdAt");
    parseQuery.includeAll();
    return parseQuery;
  } catch (error) {
    console.log(`Error when trying to get messages! ${error}`);
  }
}

async function getMessagesToDelete(chat) {
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
}

export async function deleteUser(user) {
  try {
    let chats = await getChats(user);
    for (let chat of chats) {
      let messages = await getMessagesToDelete(chat);
      await Parse.Object.destroyAll(messages);
    }
    await Parse.Object.destroyAll(chats);
    await user.destroy();
    return true;
  } catch (error) {
    console.log(
      `Error when trying to delete the user and all of their chats and messages! ${error}`
    );
  }
}

export async function createChat(otherUser) {
  try {
    const usersQuery = new Parse.Query("User");
    const otherUserObj = await usersQuery
      .equalTo("username", otherUser)
      .first();
    const currentUser = getCurrentUser();
    const users = [currentUser, otherUserObj];
    const chat = new Parse.Object("Chat");
    let usersRelation = chat.relation("users");
    usersRelation.add(users);
    return await chat.save();
  } catch (error) {
    console.log(`Error when trying to create a new chat! ${error}`);
    throw new Error("Chat creation failed.");
  }
}

export async function getChats() {
  try {
    const chatQuery = new Parse.Query("Chat");
    chatQuery.equalTo("users", getCurrentUser());
    chatQuery.includeAll("users");
    return await chatQuery.find();
  } catch (error) {
    console.log(`Error when trying to read chats! ${error}`);
  }
}

export async function listUsers() {
  try {
    const usersQuery = new Parse.Query("User");
    usersQuery.notEqualTo("username", getCurrentUser().get("username"));
    const result = await usersQuery.find();
    return result;
  } catch (error) {
    console.log(`error when listing users ${error}`);
  }
}

async function getRelationObjects(object, relationName) {
  try {
    return await object.relation(relationName).query().find();
  } catch (error) {
    console.log(`Error when getting relation objects! ${error}`);
  }
}

export async function getUsersInChat(chat) {
  if (!chat || !chat.relation) {
    console.log(`Invalid chat object: ${chat}`);
    return [];
  }

  const users = await getRelationObjects(chat, "users");
  try {
    for (let user of users) {
      await user.get("profilePicture").fetch();
    }
    return users;
  } catch (error) {
    console.log(`Error when trying to get users belonging to chat! ${error}`);
  }
}

export function getCurrentUser() {
  return Parse.User.current();
}

export async function getProfileIcons() {
  try {
    const queryIcons = new Parse.Query("ProfileIcon");
    return await queryIcons.find();
  } catch (error) {
    console.log(`Error when trying to get cat icons! ${error}`);
  }
}

export async function deleteChat(chat) {
  try {
    let messages = await getMessagesToDelete(chat);
    await Parse.Object.destroyAll(messages);
    return await chat.destroy();
  } catch (error) {
    return false;
  }
}

async function passwordResetHelper(email) {
  try {
    await Parse.User.requestPasswordReset(email);
    return true;
  } catch (error) {
    console.log(`Error when trying to reset password! ${error}`);
    return false;
  }
}
export async function refreshSessionToken() {
  const currentUser = Parse.User.current();
  const sessionToken = currentUser.getSessionToken();
  const response = await Parse.Cloud.run("refreshSessionToken", {
    sessionToken,
  });
  currentUser._sessionToken = response.sessionToken;
  localStorage.setItem("Parse/sessionToken", response.sessionToken);
}

export async function passwordReset(email) {
  const query = new Parse.Query("User");
  try {
    const results = query.equalTo("email", email);
    const result = await results.find();
    if (result.length !== 0) {
      return passwordResetHelper(email);
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error resetting password", error);
  }
}
