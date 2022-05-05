var fs = require("fs");

function readMotionConfiguration(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: "utf8" }, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(
        res
          .split(/\r?\n/)
          .filter((r) => r !== "" && !r.match(/^[#; \r\n\t]/))
          .map((r) => r.split(/ (.+)/).slice(0, -1))
          .reduce((dict, c) => {
            dict[c[0]] = c[1];
            return dict;
          }, {})
      );
    });
  });
}

async function main() {
  var conf = await readMotionConfiguration("./motion/motion.conf");
  console.log(conf.target_dir);
}

main();
