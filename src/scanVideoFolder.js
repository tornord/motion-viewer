const fs = require("fs");

var regExp = new RegExp(`^([0-9-]{10})_([0-9]{2})-([0-9]{2})-([0-9]{2})_([0-9]+)(?:_([0-9]+))?\.(mp4|jpg)$`);

async function scanVideoFolder(dirname) {
	var videos = [];
	var photos = [];
	var filenames = await new Promise((resolve, reject) =>
		fs.readdir(dirname, (err, filenames) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(filenames);
		})
	);
	filenames.forEach((fn) => {
		var m = regExp.exec(fn);
		if (!m) {
			return;
		}
		var [filename, date, hour, minute, second, event, frame, type] = m;
		var time = `${hour}:${minute}:${second}`;
		var epoch = new Date(`${date} ${time}`).getTime();
		var obj = { filename, date, time, event: Number(event), epoch, type };
		if (type === "mp4") {
			videos.push(obj);
		} else if (type === "jpg") {
			photos.push(obj);
		}
	});
	const compare = (d1, d2) => (d1.epoch !== d2.epoch ? d1.epoch - d2.epoch : d1.event - d2.event);
	const compareReverse = (d1, d2) => (d1.epoch !== d2.epoch ? d2.epoch - d1.epoch : d2.event - d1.event);
	videos.sort(compare);
	photos.sort(compare);
	var dict = {};
	videos.forEach((v) => {
		v.poster = null;
		let d = dict[v.event];
		if (!d) {
			d = [];
			dict[v.event] = d;
		}
		d.push(v);
	});
	Object.values(dict).forEach((d) => d.sort(compareReverse));
	photos.forEach((p) => {
		let d = dict[p.event];
		if (!d) {
			return;
		}
		let v = d.find((e) => e.epoch <= p.epoch);
		if (!v) {
			return;
		}
		v.poster = p;
	});
	return videos.map((v) => ({ date: v.date, time: v.time, url: v.filename, posterUrl: v.poster ? v.poster.filename : null }));
}

module.exports = { scanVideoFolder };
