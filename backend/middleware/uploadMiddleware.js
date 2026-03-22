const multer = require("multer")

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

// ❌ REMOVE strict filter (TEMP FIX)
const upload = multer({ storage })

module.exports = upload