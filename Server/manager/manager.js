const UserModel = require('../db/user.model');
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const userSignUp = async (req, res) => {
    if (req.body.password)
        req.body.password = await hashPassword(req.body.password);

    const userInfo = await UserModel(req.body).save();

    // getting jwt token...............
    const token = jwt.sign({ userId: userInfo._id }, JWT_SECRET);
    res.send({ token });
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const userInfo = await UserModel.findOne({ email }).lean();
        
        let ispasswordCorrect = await comparePassword(password, userInfo.password);
        if (ispasswordCorrect) {
            const token = jwt.sign({ userId: userInfo._id }, JWT_SECRET);
            return res.status(200).send({ token: token });
        }
        else
            return res.status(500).send({ message: 'Incorrect password !!' })
    }
    else {
        return res.status(400).send({ message: 'Give proper ceredntials !!' })
    }
}

const hashPassword = async (userPassword) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userPassword, salt);

        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const comparePassword = async (plaintextPassword, hashedPasswordFromDatabase) => {
    try {
        // Compare the plaintext password with the hashed password from the database
        const result = await bcrypt.compare(plaintextPassword, hashedPasswordFromDatabase);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

const verifyUser = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded)
            return decoded.userId
        else return new Error();
    }
    catch (err) {
        console.log(err);
    }
}

const getUserInfo = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const userId = verifyUser(token);

            const userInfo = await UserModel.findOne({ _id: userId }).lean();
            return res.status(200).send({ userInfo: userInfo });

        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    userSignUp,
    userLogin,
    getUserInfo
}