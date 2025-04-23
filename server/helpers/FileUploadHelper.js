const multer = require("multer");
const path = require("path");
const fs = require('fs');

const uploadWithModule = (moduleName = "general") => {
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            const uploadPath = path.join(__dirname, "../uploads", moduleName);

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: (req,file,cb) => {
            const ext = path.extname(file.originalname);
            cb(null,`resume_${Date.now()}${ext}`);
        },
    });

return multer({
    storage,
    limits : { fileSize : 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
});

}

module.exports = uploadWithModule;