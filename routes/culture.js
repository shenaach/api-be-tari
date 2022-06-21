const Culture = require("../models/Culture");
const {
  verifyTokenAndAuthorization
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAuthorization, async (req,res)=>{
    const newCulture = new Culture(req.body);
    try{
        const savedCulture = await newCulture.save();
        res.status(200).json(savedCulture);
    }catch (err){
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCulture = await Culture.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCulture);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Culture.findByIdAndDelete(req.params.id);
    res.status(200).json("Culture has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CULTURE
router.get("/find/:id", async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id).populate(
      "province"
      );
    res.status(200).json(culture);
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
    let cultures;
    if (qNew) {
        cultures = await Culture.find.sort({ createdAt: -1 }).limit(5);
    } else if (qProvince) {
        cultures = await Culture.find({
            province_id: { $in: [qProvince] },
        });
    } else {
        cultures = await Culture.find().populate("province", "name");
    }

    res.status(200).json(cultures);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;