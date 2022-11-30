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
    /* 
    const query = new Parse.Query('User');
    console.log(query)
    const test = query.include('profilePicture')

    
    console.log(test) */
    //console.log(await Parse.User.current());
    const currentUser = Parse.User.current();
    if (currentUser) {
      //console.log(`Current logged in user:`);
      //console.log(currentUser)
      /* console.log(currentUser.get("profilePicture"));
      const pic = await currentUser.get("profilePicture").name();
      console.log(pic); */
      return currentUser;
    }
  } catch (error) {
    console.log(`Error when trying to get current user! ${error}`);
  }
};

export const getProfilePicture = async function () {
  try {
    const user = await readCurrentUser();
    const icon = user.get("profilePicture");
    const iconId = icon.id;
    const query = new Parse.Query("CatIcons");
    query.equalTo("objectId", iconId);
    const result = await query.find();
    /* 
    console.log("this is result--------------")
    console.log(result)
    console.log(result[0].get("catPNG")._url) */
    return result;
  } catch (error) {
    console.log(`Error when trying to get user profile picture! ${error}`);
  }
};

export const logOutUser = async function () {
  try {
    await Parse.User.logOut();
    if (readCurrentUser === null) {
      return true;
    }
  } catch (error) {
    console.log(`Error when trying to log out user! ${error}`);
  }
};

const readAllUsers = async function () {
  //console.log("reading all users");
  const parseQuery = new Parse.Query("User");
  try {
    let users = await parseQuery.find();
    // console.log(users);
    return users;
  } catch (error) {
    console.log(`Error when trying to read all users: ${error.message}`);
  }
};

const getRandomNumber = async function (length) {
  console.log("this is get random number");
  var length = -1;
  try {
    const allUsers = await readAllUsers();
    for (let key in allUsers) {
      length += 1;
    }
    console.log("length:   ", length);

    const ranNum = Math.floor(Math.random() * length);

    console.log("ranNum:   ", ranNum);
    return ranNum;
  } catch (error) {
    console.log(`Error when trying to get a random number: ${error.message}`);
  }
};

/* const getLength = (object) => {
  var count = 0;
  for (let key in object) {
    count += 1;
  }
}; */

export const getRandomUser = async function () {
  console.log("this is getting random user");
  /* var length = -1;
  var ranNum = -1;
  var result = null; */
  try {
    const allUsers = await readAllUsers();
    console.log("this is allUsers");
    console.log(allUsers);
    const ranNum = await getRandomNumber();
    const result = allUsers[ranNum];
    /* if (allUsers) {
      length = getLength(allUsers);
    }
    if (length >= 0) {
      ranNum = getRandomNumber(length);
      console.log("ranNum:    ", ranNum);
    }
    if (ranNum >= 0) {
      result = allUsers[ranNum];
    } */

    const currentUser = await readCurrentUser();

    if (result) {
      console.log(result.id);
    }
    if (currentUser) {
      console.log(currentUser.id);
    }

    if (result && currentUser) {
      if (result.id === currentUser.id) {
        console.log("the random user is the same as the current");
        const allOtherUsers = allUsers.splice(ranNum, 1);
        const newRanNum = getRandomNumber(allOtherUsers);
        console.log("new random user", allOtherUsers[newRanNum]);
        return allOtherUsers[newRanNum];
      }
      console.log("the random user is different then the current:", result);
      return result;
    }
  } catch (error) {
    console.log(`Error when trying to get a random user: ${error.message}`);
    return false;
  }
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
