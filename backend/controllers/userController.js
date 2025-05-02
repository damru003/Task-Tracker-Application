import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator'
import userModel from '../models/user.js';


// CREATE TOKEN

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// LOGIN USER

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = createToken(user._id);

        res.status(200).json({ success: true, message: 'Login successful', token });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// SIGNUP USER

const registerUser = async (req, res) => {

    try {
        const { name, email, password, country } = req.body;

        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please Enter a Valid Email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Please Enter a Strong Password' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            country
        });

        const user = await newUser.save();

        const token = createToken(user._id)

        res.status(201).json({ success: true, message: 'User registered successfully', token })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getUserData = async (req, res) => {
    try {

        const userId = req.user.id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User Not Found.." })
        }
        
        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                country: user.country,
            }
        });


    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }

}

export { loginUser, registerUser, getUserData }
