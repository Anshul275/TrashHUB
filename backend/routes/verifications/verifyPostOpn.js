const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = async function (req, res, next) {
	const token = req.header("auth-token");
	if (!token) {
		return res.status(401).json({ message: "Access Denied!" });
	}
	try {
		const verification = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findOne({ userId: verification.userId });
		if (verification.userId === req.body.userId && user) {
			next();
		} else {
			res.status(401).json({ message: "Access Denied!!" });
		}
	} catch (err) {
		res.status(400).json({ message: "Invalid Token!" });
	}
};
