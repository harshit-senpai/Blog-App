import Users from "./../schema/user.js";
import { nanoid } from "nanoid";

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  const isUsernameExist = await Users.exists({
    "personal_info.username": username,
  }).then((result) => result);

  if (isUsernameExist) {
    username = username + nanoid().substring(0, 5);
  }

  return username;
};

const formatedData = (user) => {
  return {
    profile_image: personal_info.profile_image,
    username: personal_info.username,
    fullname: personal_info.fullname,
  };
};

const signUp = async (req, res, next) => {
  try {
    const username = await generateUsername(req.body.email);

    const newUser = await Users.create({
      personal_info: {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        username: username,
      },
    });

    res.status(201).json({
      status: "success",
      message: "created user",
      data: {
        newUser: newUser.personal_info,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error creating user",
      data: {
        error: error.message,
      },
    });
  }
};

export default signUp;
