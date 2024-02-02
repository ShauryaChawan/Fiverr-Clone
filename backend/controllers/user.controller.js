import User from "../models/user.model.js";
import createError from "../utils/createError.js";

// Delete a user
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "ACCESS DENIED!! You can only delete your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

// Get a User
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
