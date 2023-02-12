const admin = require("firebase-admin");
const formSchema = require("../models/form/formSchema");
const userSchema = require("../models/user/userSchema");


const getSelf = async (req, res) => {
  const { firebase_id, firebase_user, provider_user } = req.body;
  try {
    const { firebase_id } = req.body;
    console.log({ firebase_user });
    const userData = await userSchema.findOne({ firebase_id });
    console.log({userData});
    if (!userData) {
      const newUser = new userSchema({
        firebase_id,
        // secret: crypto.randomBytes(24).toString("hex"),
        email: firebase_user.email,
        name: firebase_user.name,
        picture: firebase_user.picture,
      });
      const userSave = await newUser.save();
      return res.status(200).json({
        user: { ...firebase_user, ...userSave._doc },
        success: true,
      });
    } else {
      return res.status(200).json({
        user: { ...firebase_user, ...userData._doc },
        success: true,
      });
    }
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ success: false, error });
  }
};

// const generateSecret = async (req, res) => {
//   const { firebase_id, firebase_user, provider_user } = req.body;
//   try {
//     const secret = crypto.randomBytes(24).toString("hex");
//     const userData = await userSchema.findByIdAndUpdate(provider_user._id, {
//       secret,
//     });
//     return res.send({
//       success: true,
//       user: { ...firebase_user, ...userData._doc },
//     });
//   } catch (error) {
//     console.log({ error });
//     return res.send({ success: false, error });
//   }
// };
module.exports = {
  getSelf,
  // generateSecret,
};
