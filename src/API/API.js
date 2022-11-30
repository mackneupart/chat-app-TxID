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

export const readCurrentUser = async function () {
  try {
    const currentUser = Parse.User.current();
    console.log(`Current logged in user: ${currentUser}`);
    return currentUser;
  } catch (error) {
    console.log(`Error when trying to get current user! ${error}`);
  }
};

const readAllUsers = async function () {
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
  const allUsers = readAllUsers();
  const ranNum = getRandomNumber(allUsers);
  const result = allUsers[ranNum];
  const currentUser = readCurrentUser();
  if (result.get("username") === currentUser.get("username")) {
    const allOtherUsers = allUsers.splice(ranNum, 1);
    const newRanNum = getRandomNumber(allOtherUsers);
    return allOtherUsers[newRanNum];
  }
  return result;
};

/* 

objected dot pointer eller sende hele parseobjected

const ReadCatIcons = async function () {
  try {
    const query = new Parse.Query("CatIcons");
    const icons = await query.find();
    return icons;
  } catch (error) {
    console.log("Error in getting Cat Png: " + error);
  }
}; */

/* export const readCatIcons = async () => {
  console.log("this is readcations");
  let icons = []
  const queryIcons = new Parse.Query("CatIcons");
  const results = await queryIcons.find();
  console.log("this is results");
  console.log(results);
  icons = results.map((icon) => {
    return {
      name: icon.get('name'),
      source: icon.get("catPNG")._url
    };
  });
  console.log("this is icons");
  console.log(icons);
  return icons;
} */

export const readCatIcons = async () => {
  try {
    const queryIcons = new Parse.Query("CatIcons");
    const result = await queryIcons.find();
    return result;
  } catch (error) {
    console.log(`Error when trying to get cat icons! ${error}`);
  }
};

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
