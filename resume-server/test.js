require("dotenv").config();

const app = require("./index.js");

const request = require("supertest")(app);
const expect = require("chai").expect;

describe("Gets /documents", async function () {
    it("returns no documents at first", async function () {


        const response = await request.get("/documents");
        expect(response.status).to.eql(200);
        expect(response.body.documents.length).to.eql(0);
    });
});

describe("Posts a document to /documents", async function () {
    it("returns one document", async function () {


        const response = await request.post("/documents")
            .attach("document", "example.txt");

        console.log(response.body); 
        expect(response.status).to.eql(200);
        expect(response.body.documents.length).to.eql(1);
    });
});
