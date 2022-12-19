import Parse from "parse";

export const createUser = async function (
  username,
  password,
  email,
  nativeLangs,
  targetLangs,
  profilePicture
) {
  try {
    const User = new Parse.User();
    User.set("username", username);
    User.set("password", password);
    User.set("email", email);
    User.set("profilePicture", profilePicture);
    const nativeLangsRelation = User.relation("nativeLangs");
    nativeLangsRelation.add(await getLanguagesFromIDs(nativeLangs));
    const targetLangsRelation = User.relation("targetLangs");
    targetLangsRelation.add(await getLanguagesFromIDs(targetLangs));
    await User.signUp();
    return true;
  } catch (error) {
    alert(`Error when trying to create a new user! ${error}`);
  }
};

const getLanguagesFromIDs = async function (ids) {
  const languageQuery = new Parse.Query("Language");
  try {
    languageQuery.containedIn("objectId", ids);
    return await languageQuery.find();
  } catch (error) {
    console.log(`Error while getting language from ID: ${error.message}`);
  }
};

export const logIn = async function (username, password) {
  try {
    await Parse.User.logIn(username, password);
  } catch (error) {
    alert("Please enter a valid Username and Password!");
  }
};

export const logOut = async function () {
  try {
    await Parse.User.logOut();
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

export const getMessagesToDisplay = async function (chat) {
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

const getMessagesToDelete = async function (chat) {
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

export const deleteUser = async function (user) {
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
};

export const createChat = async function () {
  const otherUser = await getNonMatchedUsers();
  if (otherUser.length > 0) {
    const users = [getCurrentUser(), otherUser[0]];
    const [lan1, lan2] = await findCommonLanguages(users);
    try {
      const chat = new Parse.Object("Chat");
      chat.set("language1", lan1[0]);
      chat.set("language2", lan2[0]);
      let usersRelation = chat.relation("users");
      usersRelation.add(users);
      return await chat.save();
    } catch (error) {
      console.log(`Error when trying to create a new chat! ${error}`);
    }
  }
  return false;
};

export const createGroupChat = async function () {
  const otherUsers = await getUsersForGroup();
  if (otherUsers.length > 1) {
    const user1 = otherUsers[0];
    const user2 = otherUsers[1];
    const users = [getCurrentUser(), user1, user2];
    const lan1 = await matchTargetLanguage(users);
    try {
      const chat = new Parse.Object("Chat");
      chat.set("language1", lan1[0][0]);
      let usersRelation = chat.relation("users");
      usersRelation.add(users);
      return await chat.save();
    } catch (error) {
      console.log(`Error when trying to create a new chat! ${error}`);
    }
  }
  return false;
};


//this function should be split out into several functions along with the other very similar functions
const findCommonLanguages = async function (users) {
  var numberOfUsers = 0;
  for (var user in users) {
    numberOfUsers = numberOfUsers + 1;
  }
  var currentTarget = [];
  var currentNative = [];
  const targetC = await getChosenLanguages(users[0], "targetLangs");
  for (let key in targetC) {
    currentTarget.push(targetC[key].get("name"));
  }
  const nativeC = await getChosenLanguages(users[0], "nativeLangs");
  for (let key in nativeC) {
    currentNative.push(nativeC[key].get("name"));
  }
  var matchedTarget = [];
  var matchedNative = [];
  var i = numberOfUsers - 1;
  while (i > 0) {
    var otherTarget = [];
    var otherNative = [];
    var targetO = await getChosenLanguages(users[i], "targetLangs");
    for (let key in targetO) {
      otherTarget.push(targetO[key].get("name"));
    }
    var nativeO = await getChosenLanguages(users[i], "nativeLangs");
    for (let key in nativeO) {
      otherNative.push(nativeO[key].get("name"));
    }
    matchedTarget.push(currentTarget.filter((e) => otherNative.includes(e)));
    matchedNative.push(currentNative.filter((e) => otherTarget.includes(e)));
    i = i - 1;
  }
  return [matchedTarget[0], matchedNative[0]];
};

const matchTargetLanguage = async function (users) {
  var numberOfUsers = 0;
  for (var user in users) {
    numberOfUsers = numberOfUsers + 1;
  }
  var currentTarget = [];
  const targetC = await getChosenLanguages(users[0], "targetLangs");
  for (let key in targetC) {
    currentTarget.push(targetC[key].get("name"));
  }
  var matchedTarget = [];
  var i = numberOfUsers - 1;
  while (i > 0) {
    var otherTarget = [];
    var targetO = await getChosenLanguages(users[i], "targetLangs");
    for (let key in targetO) {
      otherTarget.push(targetO[key].get("name"));
    }
    matchedTarget.push(currentTarget.filter((e) => otherTarget.includes(e)));
    i = i - 1;
  }
  return [matchedTarget[0]];
};

export const getChats = async function () {
  try {
    const chatQuery = new Parse.Query("Chat");
    chatQuery.equalTo("users", getCurrentUser());
    chatQuery.includeAll("users"); 
    return await chatQuery.find();
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

export const getChosenLanguages = async function (user, languageType) {
  return await getRelationObjects(user, languageType);
};

export const getUsersInChat = async function (chat) {
  const users = await getRelationObjects(chat, "users");
  try {
    for (let user of users) {
      await user.get("profilePicture").fetch();
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
    return await usersQuery.find();
  } catch (error) {
    console.log(`Error when trying to read all users: ${error.message}`);
  }
};

const getNonMatchedUsers = async function () {
  const currentUser = getCurrentUser();
  const targetLanguages = await getRelationObjects(currentUser, "targetLangs");
  const nativeLanguages = await getRelationObjects(currentUser, "nativeLangs");
  const chats = await getChats();
  const userNames = new Set();
  for (let chat of chats) {
    const users = await getUsersInChat(chat);
    for (let user of users) {
      userNames.add(user.get("username"));
    }
  }
  const userNamesArray = [...userNames];
  try {
    const usersQuery = new Parse.Query("User");
    usersQuery.notContainedIn("username", userNamesArray);
    for (let key in targetLanguages) {
      usersQuery.equalTo("nativeLangs", targetLanguages[key]);
    }
    for (let key in nativeLanguages) {
      usersQuery.equalTo("targetLangs", nativeLanguages[key]);
    }
    return await usersQuery.find();
  } catch (error) {
    console.log(
      `Error when trying to get all non matched users: ${error.message}`
    );
  }
};

const getUsersForGroup = async function () {
  const currentUser = getCurrentUser();
  const targetLanguages = await getRelationObjects(currentUser, "targetLangs");
  try {
    const usersQuery = new Parse.Query("User");
    usersQuery.notEqualTo("username", currentUser.get("username"));
    for (let key in targetLanguages) {
      usersQuery.equalTo("targetLangs", targetLanguages[key]);
    }
    return await usersQuery.find();
  } catch (error) {
    console.log(
      `Error when trying to get new users for a group chat: ${error.message}`
    );
  }
};

export const getLanguages = async function () {
  try {
    const languageQuery = new Parse.Query("Language");
    languageQuery.ascending("name");
    languageQuery.includeAll();
    return await languageQuery.find();
  } catch (error) {
    console.log(`Error while getting language options: ${error.message}`);
  }
};

export const getCatIcons = async () => {
  try {
    const queryIcons = new Parse.Query("CatIcons");
    return await queryIcons.find();
  } catch (error) {
    console.log(`Error when trying to get cat icons! ${error}`);
  }
};

export async function deleteChat(chat) {
  try {
    let messages = await getMessagesToDelete(chat);
    await Parse.Object.destroyAll(messages);
    return await chat.destroy();
  } catch (error) {
    return false;
  }
}
