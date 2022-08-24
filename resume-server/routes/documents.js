const {Router} = require("express");
const documents = Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});
const pdf = require("pdf-parse");
const path = require("path");

const documents_db = [];

documents.get("/", function (request, response) {
    if (request.query && "keyword" in request.query ) {

        const keyword = request.query.keyword.slice(1, request.query.keyword.length - 1);
        console.log("Keyword: " + keyword + "|");

        documents_db.sort(function (a, b) {
            console.log(a, b);
            const a_density = a.split(keyword).length
            const b_density = b.split(keyword).length
            console.log(keyword.length, "length");
            console.log(a_density, b_density);

            if (a_density > b_density) {
                return -1
            }
            if (a_density < b_density) {
                return 1
            }
            return 0;
        });

        response.send({documents: documents_db});
        return;
    };

    response.send({documents: []});
});

documents.post("/", upload.single("document"), function (request, response) {
    // TODO: Adds document test

    console.log(request.file);

    checkFileType(request.file, function (error, success) {
        // The file is a pdf
        if (success) {
            pdf(request.file.buffer)
            .then(function (data) {


                documents_db.push(data.text); 
                response.send({documents: documents_db.map((document) => document.toString())});

                console.log(documents_db);
            });

        } else {

        documents_db.push(request.file.buffer.toString()); 
        console.log(documents_db);

        response.send({documents: documents_db.map((document) => document.toString())});


        }
        }, /pdf/);



});

function checkFileType(file, cb, filetypes){
  // Allowed ext
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = documents;
