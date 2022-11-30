import Parse from "parse";

export const CreateUser = async function (
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
    /* User.set(
      "profilePicture",
      new Parse.File("catIcon.img", { base64: profilePicture })
    ); */
    await User.signUp();
    return true;
  } catch (error) {
    alert(`Error when trying to create a new user! ${error}`);
  }
};

export const ReadCurrentUser = async function () {
  try {
    const currentUser = Parse.User.current();
    console.log(`Current logged in user: ${currentUser}`);
    return currentUser;
  } catch (error) {
    console.log(`Error when trying to get current user! ${error}`);
  }
};

export const getCurrentUserId = async function () {
    try{
        return Parse.User.current().id;
    } catch (error) {
        console.log("Error: ", error);
    }
};

const ReadAllUsers = async function () {
  const parseQuery = new Parse.Query("User");
  try {
    let users = await parseQuery.find();
    console.log(users);
    return true;
  } catch (error) {
    alert(`Error when trying to read all users: ${error.message}`);
    return false;
  }
};

const getRandomNumber = (array) => {
  const arrayLength = array.length;
  const ranNum = Math.floor(Math.random() * arrayLength);
  return ranNum;
};

export const getRandomUser = () => {
  const allUsers = ReadAllUsers();
  const ranNum = getRandomNumber(allUsers);
  const result = allUsers[ranNum];
  const currentUser = ReadCurrentUser();
  if (result.get("username") === currentUser.get("username")) {
    const allOtherUsers = allUsers.splice(ranNum, 1);
    const newRanNum = getRandomNumber(allOtherUsers);
    return allOtherUsers[newRanNum];
  }
  return result;
};

/* const ReadCatIcons = async function () {
  try {
    const query = new Parse.Query("CatIcons");
    const icons = await query.find();
    return icons;
  } catch (error) {
    console.log("Error in getting Cat Png: " + error);
  }
}; */

export const ReadCatIcons = async () => {
  let Icons = []
  const queryIcons = new Parse.Query("CatIcons");
  const results = await queryIcons.find();
  Icons = results.map((icon) => {
    return {
      name: icon.get('name'),
      source: icon.get("catPNG")._url
    };
  });
  return Icons;
}

/*  const GetIcons = async function () {
  try {
    const result = await ReadCatIcons();
    console.log("this is result");
    console.log(result);
    var icons = {};
    var count = 0;
    for (let icon in result) {
      let key = `icon${count}`;
      let n = icon.get("name");
      let s = icon.get("catPNG")._url;
      let obj = { [key]: { name: n, source: s } };
      icons = { ...icons, obj };
    }
    console.log("this is icons");
    console.log(icons);
    return icons;
  } catch (error) {
    console.log("Error in getting Icons: " + error);
  }
}; */

/* export default {user: {create: CreateUser, delete: DeleteUserInfo}, chat: {create: CreateChat}}
import API from 
API.user.create()
 */