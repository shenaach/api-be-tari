const Province = require("../models/Province");
const {
  verifyTokenAndAuthorization
} = require("./verifyToken");
const data = require("../dataindonesia.json");


const router = require("express").Router();

//CREATE verify token delete
router.post("/", verifyTokenAndAuthorization, async (req,res)=>{
    const newProvince = new Province(req.body);
    try{
        const savedProvince = await newProvince.save();
        res.status(200).json(savedProvince);
    }catch (err){
        res.status(500).json(err);
    }
});

//Get newprovince
router.get("/seed", async (req, res) => {
  const newProvince = await Province.create(data);

  res.json({ newProvince });
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProvince = await Province.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProvince);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Province.findByIdAndDelete(req.params.id);
    res.status(200).json("Province has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PROVINCE
router.get("/find/:id", async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    res.status(200).json(province);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  //category ganti province (??)
  const qProvince = req.query.province;

  try {
    let provinces;
    if (qNew) {
        provinces = await Province.find.sort({ createdAt: -1 }).limit(5);
    } else if (qProvince) {
        provinces = await Province.find({
            province_id: { $in: [qProvince] },
        });
    } else {
        provinces = await Province.find();
    }

    res.status(200).json(provinces);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;