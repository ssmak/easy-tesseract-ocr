const eto = require('./../index.js');

console.log("\n-- test case 5: live OCR at specified location(rectangle) (chinese) --")
eto.scan({
	imagePath: {
		x: 0,
		y: 200, 
		width: 500, 
		height: 100
	},
	//compare: "證劵",
	//trainedData: "chi_tra"
})
.then(function (text) {
	console.log("[result]\n", text);
})
.catch(function (err) {
	console.error(err);
});