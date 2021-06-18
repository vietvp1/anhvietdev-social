const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/userModel");
const ChatGroupModel = require("../../models/chatGroupModel");
const { transSuccess, transErrors } = require("../../lang/vi");

const initLocal = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: transErrors.enter_all_fields });
  }
  try {
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        error: transErrors.login_failed,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: transErrors.login_failed });
    }

    ///// giống với gán user vao session
    let userToUse = await UserModel.findUserByIdForServerToUse(user.id);
    let getChatGroupIds = await ChatGroupModel.getChatGroupIdsByUser(user.id);

    const payload = {
      user: userToUse,
      chatGroupIds: getChatGroupIds,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          message: transSuccess.loginSuccess(user.lastName),
          token: token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: transErrors.server_error });
  }
};

module.exports = {
  initLocal: initLocal,
};
