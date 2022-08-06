const mongoose = require('mongoose')


const CategoryShcheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Категорийн нэрийг оруулна уу"],
        unique: true,
        trim: true,
        maxlength: [50, "Категорийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой."],
    },
    description: {
        type: String,
        required: [true, "Тайлбар оруулна уу"],
        unique: true,
        maxlength: [500, "Категорийн тайлбарын урт дээд тал нь 50 тэмдэгт байх ёстой."],
    },
    photo: {
        type: String,
        default: "no-photo.jg",

    },
    avarageRating: {
        type: Number,
        min: [1, "рэйтинг хамгийн багадаа 1 байна"],
        max: [10, "рэйтинг хамгийн ихдээ 10 байна"]
    },
    avaragePrice: {
        type: Number,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }


})

module.exports = mongoose.model("Category", CategoryShcheme );