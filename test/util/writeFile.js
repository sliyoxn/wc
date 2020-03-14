let fs = require("fs");
module.exports = function (fileName, content = "", callback = () => {}) {
	fs.writeFile(fileName, content, callback);
};
