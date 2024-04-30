import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //take data from user from postman as we have not frontend
  const { fullName, email, username, password } = req.body;
  console.log(email, "email", password);

  //validation
  if (fullName === "" || email === "" || username === "" || password === "") {
    throw new ApiError(400, "Please fill all the fields");
  }
  //check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //check for images
  // const avatarLocalPath = req.files?.avatar[0]?.path;

  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Please upload avatar and cover image");
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // if (!avatar || !coverImage) {
  //   throw new ApiError(400, "Please upload avatar and cover image");
  // }
  // //create user object

  const user = await User.create({
    fullName,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //remove password and refrsh token
  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  //check for user creation

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registred successfully"));
});

export { registerUser };
