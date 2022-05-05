const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const { scanVideoFolder } = require("./scanVideoFolder");

//const dirname = "/Volumes/Samsung_T5/Projects/Elektronik/Motion/video";
//const dirname = "/Users/tor.nordqvist/Projects/Nodejs/test/test200504/videos";
const dirname = "/var/lib/motion";
const defaultLimit = 12;

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// let template = ejs.compile(fs.readFileSync("./src/index.ejs", "utf8"), {});
// app.use(express.static("public"));

//console.log(__dirname);

app.get("/", async (req, res) => {
  try {
    var { page: pageAsString, limit: limitAsString } = req.query;
    var page = 0;
    if (typeof pageAsString !== "undefined" && !isNaN(Number(pageAsString) && Number(pageAsString) >= 0)) {
      page = Number(pageAsString);
    }
    var limit = defaultLimit;
    if (typeof limitAsString !== "undefined" && !isNaN(Number(limitAsString) && Number(limitAsString) >= 0)) {
      limit = Number(limitAsString);
    }
    // console.log(page, limit);
    var videos = await scanVideoFolder(dirname);
    var maxPage = 0;
    if (limit > 0) {
      let n1 = videos.length - limit * page;
      let n0 = n1 - limit;
      if (n0 < 0) {
        n0 = 0;
      }
      if (n1 < n0) {
        n1 = n0;
      }
      // console.log(n0, n1, videos.length);
      maxPage = Math.floor(videos.length / limit);
      if (page > maxPage) {
        page = maxPage;
      }
      videos = videos.slice(n0, n1);
    }
    // res.send(template({ videos }));
    res.send(
      ejs.render(
        fs.readFileSync("./src/index.ejs", "utf8"),
        {
          videos,
          earlierPage: page < maxPage ? page + 1 : null,
          laterPage: page > 0 ? page - 1 : null,
          limit,
          defaultLimit,
        },
        {}
      )
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/videos", async (req, res) => {
  try {
    var videos = await scanVideoFolder(dirname);
    res.send(videos);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/videos/*.(mp4|jpg)", (req, res) => {
  var m = req.url.match(/\/videos\/(.+\.(mp4|jpg)$)/);
  if (m) {
    // console.log(m[1]);
    var fn = path.join(dirname, m[1]);
    fs.readFile(fn, (err, data) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send(data);
    });
  }
});

app.listen(8083);
