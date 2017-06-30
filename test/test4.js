const eto = require('./../index.js');

console.log("\n-- test case 4: OCR scanning with character(s) comparision (traditional chinese), tra_chi-sample.png caompares with 繁體中文 --")
eto.scan({
	imagePath: './test/tra_chi-sample.png',
	compare: "繁體中文"
})
.then(function (probability) {
	console.log("[result]\nprobability of matching: %d%", probability);
})
.catch(function (err) {
	console.error(err);
});
