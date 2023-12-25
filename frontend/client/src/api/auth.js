import CurrentUser from "../utils/current-user";

// const bcrypt = require('bcryptjs');

// singleton login

export async function signIn(oUser) {
  try {
    // Send request

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(oUser.password, salt);
    // oUser.password = hashPassword;

    const loggedInUser = await fetch("/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oUser),
    })
      .then((res) => res.json())
      .then((user) => user);

    CurrentUser().setData(loggedInUser);

    return {
      isOk: loggedInUser.message === undefined,
      data: loggedInUser,
      message: JSON.stringify(loggedInUser.message),
    };
  } catch (err) {
    return {
      isOk: false,
      message: err.message,
    };
  }
}

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: CurrentUser(),
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(oUser) {
  try {
    // Send request

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(oUser.password, salt);
    // oUser.password = hashPassword;

    const newUser = await fetch("/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oUser),
    })
      .then((res) => res.json())
      .then((newUser) => newUser);

    return {
      isOk: newUser.message === undefined,
      message: JSON.stringify(newUser.message),
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
