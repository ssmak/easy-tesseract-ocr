const eto = require('./../index.js');

console.log("\n-- test case 5: live OCR at specified location(rectangle) (chinese) --")
eto.scan({
	imagePath: {
		x1: 65,
		y1: 134, 
		x2: 355, 
		y2: 234
	},
	//compare: "測試",
	trainedData: "chi_tra",
	reservedSample: false
})
.then(function (text) {
	console.log("[result]\n", text);
})
.catch(function (err) {
	console.error(err);
});
