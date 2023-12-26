const request = require("supertest"); //using supertest to run the unit test
const app = require("./itunes.js"); //get the app from the main file

//test wether the api search returns a successfull (200) response with no empty response
describe("GET /search", () => {
  it("should return search results", async () => {
    const searchTerm = "beyonce"; //use the search term beyonce
    const mediaType = "music"; //use the mediatype music

    //await the response of a search using the terms above
    const res = await request(app)
      .get("/search")
      .query({ term: searchTerm, media: mediaType });

    expect(res.statusCode).toBe(200); //success
    expect(res.body.results.length).toBeGreaterThan(0); //not empty
  });
});
