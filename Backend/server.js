const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// FRONTEND
// ========================================

app.use(
express.static(
path.join(__dirname, "../Frontend")
)
);

// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
.connect("mongodb://127.0.0.1:27017/macetDB")
.then(() => {
console.log("MongoDB connected successfully!");
})
.catch((error) => {
console.log("MongoDB connection error:", error);
});

// ========================================
// ADMISSION SCHEMA
// ========================================

const admissionSchema = new mongoose.Schema({
studentName: {
    type: String,
    required: true
},

email: {
    type: String,
    required: true
},

mobile: {
    type: String,
    required: true
},

dob: {
    type: String,
    required: true
},

course: {
    type: String,
    required: true
},

community: {
    type: String,
    required: true
},

percentage: {
    type: String,
    required: true
},

year: {
    type: String,
    required: true
},

address: {
    type: String,
    required: true
}
});

const Admission = mongoose.model(
"Admission",
admissionSchema
);

// ========================================
// CONTACT SCHEMA
// ========================================

const contactSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true
},

email: {
    type: String,
    required: true,
    trim: true
},

phone: {
    type: String,
    required: true,
    trim: true
},

subject: {
    type: String,
    required: true,
    trim: true
},

message: {
    type: String,
    required: true,
    trim: true
},

createdAt: {
    type: Date,
    default: Date.now
}
});

const Contact = mongoose.model(
"Contact",
contactSchema
);

// ========================================
// ADMIN SCHEMA
// ========================================

const adminSchema = new mongoose.Schema({
mobile: {
    type: String,
    required: true
},

username: {
    type: String,
    required: true
},

password: {
    type: String,
    required: true
}
});

const Admin = mongoose.model(
"Admin",
adminSchema
);

// ========================================
// OTP STORAGE
// ========================================

let otpStore = {};

// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
res.send(
    "MACET Backend Server is Running!"
);
});

// ========================================
// ADMISSION - SAVE
// ========================================

app.post("/admission", async (req, res) => {
try {

    const admission =
        new Admission(req.body);

    await admission.save();

    res.json({
        success: true,
        message: "Admission submitted successfully!"
    });

} catch (error) {

    console.log(
        "Admission Error:",
        error
    );

    res.status(500).json({
        success: false,
        message: "Error saving admission."
    });

}
});

// ========================================
// ADMISSION - GET
// ========================================

app.get(
"/api/admissions",
async (req, res) => {
    try {

        const admissions =
            await Admission
                .find()
                .sort({ _id: -1 });

        res.json(admissions);

    } catch (error) {

        console.log(
            "Admission Fetch Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error fetching admissions."
        });

    }

}
);

// ========================================
// ADMISSION - DELETE
// ========================================

app.delete(
"/api/admissions/:id",
async (req, res) => {
    try {

        await Admission.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message:
                "Admission deleted successfully!"
        });

    } catch (error) {

        console.log(
            "Admission Delete Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error deleting admission."
        });

    }

}
);

// ========================================
// CONTACT - SAVE
// ========================================

app.post(
"/contact",
async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            subject,
            message
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !subject ||
            !message
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "All fields are required."
            });

        }

        const contact =
            new Contact({

                name: name.trim(),

                email: email.trim(),

                phone: phone.trim(),

                subject: subject.trim(),

                message: message.trim()

            });

        await contact.save();

        console.log(
            "Contact message saved successfully."
        );

        res.json({
            success: true,
            message:
                "Your message has been sent successfully!"
        });

    } catch (error) {

        console.log(
            "Contact Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error saving contact message."
        });

    }

}
);

// ========================================
// CONTACT - GET
// ========================================

app.get(
"/api/contacts",
async (req, res) => {
    try {

        const contacts =
            await Contact
                .find()
                .sort({ createdAt: -1 });

        res.json(contacts);

    } catch (error) {

        console.log(
            "Contact Fetch Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error fetching contact messages."
        });

    }

}
);

// ========================================
// CONTACT - DELETE
// ========================================

app.delete(
"/api/contacts/:id",
async (req, res) => {
    try {

        await Contact.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message:
                "Contact message deleted successfully!"
        });

    } catch (error) {

        console.log(
            "Contact Delete Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error deleting contact message."
        });

    }

}
);

// ========================================
// SEND OTP
// ========================================

app.post(
"/send-otp",
(req, res) => {
    const mobile = req.body.mobile;

    if (
        !mobile ||
        mobile.length !== 10
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Enter a valid 10-digit mobile number."
        });

    }

    const otp =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    otpStore[mobile] = otp;

    console.log("--------------------------------");
    console.log("OTP GENERATED");
    console.log("Mobile:", mobile);
    console.log("OTP:", otp);
    console.log("--------------------------------");

    res.json({
        success: true,
        message:
            "OTP generated successfully!"
    });

}
);

// ========================================
// VERIFY OTP
// ========================================

app.post(
"/verify-otp",
(req, res) => {
    const mobile = req.body.mobile;

    const otp =
        Number(req.body.otp);

    if (
        otpStore[mobile] === otp
    ) {

        delete otpStore[mobile];

        res.json({
            success: true,
            message:
                "OTP verified successfully!"
        });

    } else {

        res.status(400).json({
            success: false,
            message:
                "Invalid OTP."
        });

    }

}
);

// ========================================
// CREATE ADMIN
// ========================================

app.post(
"/create-admin",
async (req, res) => {
    try {

        const {
            mobile,
            username,
            password
        } = req.body;

        if (
            !mobile ||
            !username ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "All fields are required."
            });

        }

        const existingUser =
            await Admin.findOne({
                username: username
            });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                    "Username already exists."
            });

        }

        const newAdmin =
            new Admin({

                mobile: mobile,

                username: username,

                password: password

            });

        await newAdmin.save();

        res.json({
            success: true,
            message:
                "Account created successfully!"
        });

    } catch (error) {

        console.log(
            "Admin Registration Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Account creation failed."
        });

    }

}
);

// ========================================
// ADMIN LOGIN
// ========================================

app.post(
"/admin-login",
async (req, res) => {
    try {

        const {
            username,
            password
        } = req.body;

        const admin =
            await Admin.findOne({

                username: username,

                password: password

            });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid username or password."
            });

        }

        res.json({
            success: true,
            message:
                "Login successful!"
        });

    } catch (error) {

        console.log(
            "Admin Login Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Login failed."
        });

    }

}
);

// ========================================
// START SERVER
// ========================================

const PORT = 5000;

app.listen(
PORT,
() => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );

}

);
