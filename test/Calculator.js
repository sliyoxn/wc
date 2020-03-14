module.exports = class Calculator {
	calResult(text) {
		let startTime = new Date().getTime();
		if (text.length === 0) {
			return {
				charCount: 0,
				lineCount: 0,
				wordCount: 0,
				emptyLineCount: 0,
				commentCount: 0,
				codeLineCount: 0,
				time: new Date().getTime() - startTime
			};
		}
		text = text.replace(/\r\n/gm, "\n");
		let lines = text.split("\n");
		let words = text.match(/[a-zA-Z$_][a-zA-Z0-9$_]*/gm);
		// 字符数
		let charCount = text.length;
		// 行数
		let lineCount = lines.length;
		// 单词数
		let wordCount = words ? words.length : 0;
		// 空行数
		let emptyLineCount = this._calEmptyLine(text);
		// 注释行数
		let commentCount = this._calCommentCount(text);
		// 代码行数
		let codeLineCount = lineCount - emptyLineCount - commentCount;
		return {
			charCount,
			lineCount,
			wordCount,
			emptyLineCount,
			commentCount,
			codeLineCount,
			time: new Date().getTime() - startTime
		}
	}

	_calEmptyLine(text) {
		let lines = this._sliceMulComment(text).split("\n");
		let emptyLineCount = 0;
		lines.forEach((line) => {
			let hasForbiddenCharacter = /[a-zA-Z0-9$_]+/gm.test(line);
			let hasMoreThanOneNoEmptyCharacter = /[^a-zA-Z0-9$_\s]{2,}/gm.test(line);
			if (!hasForbiddenCharacter && !hasMoreThanOneNoEmptyCharacter) {
				emptyLineCount++;
			}
		});
		return emptyLineCount;
	}

	_calCommentCount(text) {

		let filterText = this._sliceMulComment(text);
		// 多行注释的行数
		let mulCommentLength = text.split("\n").length - filterText.split("\n").length;
		let singleComments = [];
		let singleCommentCount = 0;
		let lines = filterText.split("\n");
		lines.forEach((line, index) => {
			// 裁去本行所有的字符串
			line = line.replace(/("[\w\W]+"|'[\w\W]+'|`[\w\W]+`|\/[\w\W]+\/)/gm, "");
			let flag = line.match(/\/\//gm) !== null;
			if (flag) {
				singleCommentCount++;
				singleComments.push(line);
			}
		});
		return singleCommentCount + mulCommentLength;
	}

	// 裁去多行注释的部分
	_sliceMulComment(text) {
		text = this._replaceStr(text);
		text = this._replaceExp(text);
		let str = text;
		let start = 0;
		let end = 0;
		while (((start = str.indexOf("/*")) !== -1) && ((end = str.indexOf("*/")) !== -1)) {
			let sliceStr = str.slice(start, end + 2);
			if (sliceStr.indexOf("\n") !== -1) {
				if (str[end + 2] === "\n") {
					end++;
				}
				if (start !== 0 && str[start - 1] === "\n") {
					start--;
				}
			} else {
				if (str[end + 2] === "\n") {
					end++;
				} else if (start !== 0 && str[start - 1] === "\n") {
					start--;
				}
			}
			if (start > end + 2 || end + 2 > str.length) {
				console.log("运行出错");
			}
			str = str.slice(0, start) + str.slice(end + 2, str.length);
		}
		return str;
	}

	_replaceStr(text) {
		return text.replace(/("[\w\W]+"|'[\w\W]+'|`[\w\W]+`)/gm, () => {
			return "";
		});
	}

	_replaceExp(text) {
		return text.replace(/\/.+\//gm, (...args) => {
			let str = args[0];
			if (str[0] === "/" && str[1] !== "*") {
				return "";
			} else {
				return str;
			}
		});
	}

	_getRandomString(str, len) {
		const randStr = () => Math.random().toString(36).substr(2);
		if (str.length > len) return str.substr(0, len);
		if (str.length < len) return this._getRandomString(str + randStr(), len);
		return str;
	}
};
