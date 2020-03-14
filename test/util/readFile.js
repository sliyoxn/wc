let fs = require("fs");
function readFile(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (err, data) =>  {
			if (err) {
				reject(err);
			} else {
				resolve(data.toString());
			}
		})
	});
}

module.exports = readFile;
