let vm = new Vue({
	el: "#app",
	data: {
		editModel: true,
		text: "",
		readAsGBK : false,
		tableData : [],
		tableVisibility : false,
		// 用于强制重新渲染DOM结构
		// 用于解决两次选中同一个文件不能触发change事件
		// 和代码重新设置高亮的情况
		fileInputKey : 0,
		dirInputKey : 1,
		previewKey : 0,
		loading : false
	},
	methods: {
		selectFile() {
			document.getElementById("file-input").click();
		},
		selectDir() {
			document.getElementById("dir-input").click();
		},
		toggleEditModel() {
			this.editModel = !this.editModel;
			this.text = this.$refs.textBox.value;
			if (!this.editModel) {
				this.$nextTick(() => {
					this._highLightCode();
				})
			}
		},
		async handledDirChange(event) {
			let fileList = event.target.files;
			this.dirInputKey = getRandom();
			let tableData = [];
			this.tableVisibility = true;
			this.loading = true;
			// 辣鸡edge不支持for of
			for (let i = 0; i < fileList.length; i++) {
				let file = fileList[i];
				if (/(\.js|\.cpp|\.c|\.java|.py)$/gm.test(file.webkitRelativePath)) {
					let text = await readFile({file, readAsGBK : this.readAsGBK});
					let res = this._calResult(text);
					res.filename = file.webkitRelativePath;
					tableData.push(res);
				}
			}
			this.tableData = tableData;
			this.loading = false;
		},
		async handleFileChange(event) {
			let file = event.target.files[0];
			// 重新渲染input
			this.fileInputKey = getRandom();
			let fileData = await readFile({file, readAsGBK : this.readAsGBK});
			let textBox = this.$refs.textBox;
			textBox.value = fileData;
			this.text = fileData;
			if (this.editModel === false) {
				this.previewKey = getRandom();
				this.$nextTick(() => {
					this._highLightCode();
				})
			}
		},
		_getTime() {
			return new Date().getTime();
		},
		async calResult() {
			let text = this.$refs.textBox.value;
			this.text = text;
			let result = this._calResult(text);
			let {charCount, lineCount, wordCount, emptyLineCount, commentCount, codeLineCount} = result;
			this.$notify({
				dangerouslyUseHTMLString: true,
				message: `<p>
                                字符数${charCount}, 行数${lineCount}, 单词数${wordCount}
                                <br/>
                                空行数${emptyLineCount}, 注释行数${commentCount}, 代码行数${codeLineCount}
                              <p>
                              `,
				duration: 0
			});
		},
		_calResult(text) {
			let startTime = this._getTime();
			console.log(startTime);
			try {
				if (text.length === 0) {
					return {
						charCount : 0,
						lineCount : 0,
						wordCount : 0,
						emptyLineCount : 0,
						commentCount : 0,
						codeLineCount : 0,
						time : this._getTime() - startTime
					};
				}
				// 处理某些文件的换行是\r\n
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
					time : this._getTime() - startTime
				}
			}catch (e) {
				console.warn(e);
				return {
					charCount : "-",
					lineCount : "-",
					wordCount : "-",
					emptyLineCount : "-",
					commentCount : "-",
					codeLineCount : "-",
					time : "-1"
				}
			}
		},
		_calEmptyLine(text) {
			let lines = this._sliceMulComment(text).split("\n");
			let emptyLineCount = 0;
			lines.forEach((line, index) => {
				let hasForbiddenCharacter = /[a-zA-Z0-9$_]+/gm.test(line);
				let hasMoreThanOneNoEmptyCharacter = /[^a-zA-Z0-9$_\s]{2,}/gm.test(line);
				if (!hasForbiddenCharacter && !hasMoreThanOneNoEmptyCharacter) {
					emptyLineCount++;
				}
			});
			return emptyLineCount;
		},
		_calCommentCount(text) {
			let filterText = this._sliceMulComment(this._removeStr(text));
			// 多行注释的行数
			let mulCommentLength = this._removeStr(text).split("\n").length - filterText.split("\n").length;
			let singleCommentCount = 0;
			// 裁去字符串
			let lines = filterText.split("\n");
			lines.forEach((line, index) => {
				let flag = /\/\//gm.test(line);
				if (flag) {
					singleCommentCount++;
				}
			});
			return singleCommentCount + mulCommentLength;
		},
		// 裁去多行注释的部分
		_sliceMulComment(text) {
			let str = text;
			let start = 0;
			let end = 0;
			while (((start = str.indexOf("/*")) !== -1) && ((end = str.indexOf("*/")) !== -1)) {
				if (str[end + 2] === "\n") {
					end++;
				}
				if (start !== 0 && str[start - 1] === "\n") {
					start--;
				}
				str = str.slice(0, start) + str.slice(end + 2, str.length);
			}
			return str;
		},
		_highLightCode() {
			this.$nextTick(() => {
				Prism.highlightAllUnder(document.getElementById("app"), false, () => {
					console.log("highLight");
				});
			})
		},
		_removeStr(text) {
			return text.replace(/("[\w\W]+"|'[\w\W]+'|`[\w\W]+`)/gm, "");
		}
	}
});
