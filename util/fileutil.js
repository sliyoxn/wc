/**
 * 读取文件
 * @param file 文件对象
 * @param callback 读取成功的回调
 * @param onerror 读取失败的回调
 * @param readAsGBK 是否按GBK方式读取
 */
function readFile({file, callback, onerror, readAsGBK = false}) {
	const reader = new FileReader();
	let returnVal = undefined;
	if (callback) {
		reader.onload = callback;
		reader.onerror = onerror;
	} else {
		returnVal = new Promise((resolve, reject) => {
			reader.onload = (event) => {
				resolve(event.target.result);
			};
			reader.onerror = reject;
		});
	}
	reader.readAsText(file, readAsGBK ? "GBK" : undefined);
	return returnVal;
}
