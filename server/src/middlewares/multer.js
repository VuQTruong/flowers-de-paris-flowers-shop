const multer = require('multer');
const fs = require('fs');
const path = require('path');
const AppError = require('../errors/app-error');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = `./upload${req.body.folder ? req.body.folder : ''}`;
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const filePath = `./upload${req.body.folder ? req.body.folder : ''}/${
      file.originalname
    }`;

    // Checking for the duplicate file name
    let fileName = file.originalname;
    if (fs.existsSync(filePath)) {
      const fileExt = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, fileExt);

      fileName = baseName + '-' + Date.now() + fileExt;
    }

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = ['image/jpeg', 'image/png'];
  if (fileTypes.indexOf(file.mimetype) !== -1) {
    cb(null, true);
  } else {
    cb(AppError.badRequest('File extension is not supported!'), false);
  }
};

const uploadFile = multer({ storage: storage });
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit to 5Mb per file
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadFile,
  uploadImage,
};
