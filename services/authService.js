const User = require('../models/user');

// Register a new user
exports.registerUser = async (username, email, password) => {
    const user = new User({ username, email, password });
    await user.save();
    return user;
};

// Log in a user
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password))) {
        throw new Error('Invalid email or password');
    }
    return user;
};
