// Create Token and saving in cookie

const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  //option for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  const userData = {
    id: user._id,
    first_name: user.first_name,
    email: user.email,
    phoneNo: user.phoneNo,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user: userData,
  });
};

module.exports = sendToken;
