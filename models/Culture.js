const mongoose = require("mongoose");

const CultureSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        year:{type:Number, required:true},
        type:{type:String},
        reg_num:{type:Number},
        desc:{type:String},
        img: { type: String },
        imgs: { type: [String] },
        video: { type: [String] },
        province: { type: mongoose.Types.ObjectId, ref: "Province" },
    },
        {timestamps: true}
);

module.exports = mongoose.model("Culture", CultureSchema);
