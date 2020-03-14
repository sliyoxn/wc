const Calculator = require("./Calculator.js");
const readFile = require("./util/readFile.js");
const writeFile = require("./util/writeFile.js");
const calculator = new Calculator();
(async function executeTest() {
	let str = ``;
	let arr = ["./file/emptyFile.js", "./file/singleCharFile.js",
		"./file/singleLineFile.js", "./file/singleWordFile.js",
		"./file/classicCodeFile.js", "./file/noClassicCodeFile.js", "./file/chCodeFile.js"];
	for (let filename of arr) {
		let text = await readFile(filename);
		let {charCount, lineCount, wordCount, emptyLineCount, commentCount, codeLineCount, time} = calculator.calResult(text);
		str += `文件名: ${filename}  字符数: ${charCount}  行数: ${lineCount}  单词数: ${wordCount}  空行数: ${emptyLineCount}  注释行数: ${commentCount}  代码行数: ${codeLineCount}  解析时间: ${time}ms  \n`
	}
	console.log("测试结果如下");
	console.log(str);
	writeFile("./res/fileUnitTest.txt", str);
	console.log("测试完成, 执行结果已保存到res/fileUnitTest.txt");
})();
