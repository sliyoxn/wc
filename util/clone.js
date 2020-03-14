function easyClone(o) {
	if (o === undefined) {
		return undefined;
	}
	return JSON.parse(JSON.stringify(o));
}
