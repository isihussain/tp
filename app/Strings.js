var Unknown = "???";
var Cross = "✕";

function formatDate(date) {
	var day = ("0" + date.getDate()).slice(-2);
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var year = date.getFullYear();
	return `${day}.${month}.${year}`;
}

module.exports = {
	Unknown,
	Cross,
	formatDate,
};
