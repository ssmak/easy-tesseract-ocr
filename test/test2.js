const eto = require('./../index.js');

console.log("\n-- test case 2: OCR scanning with character(s) comparision (english), eng-sample.png compares with Play --")
eto.scan({
	imagePath: './test/eng-sample.png',
	compare: 'Play'
})
.then(function (probability) {
	console.log("[result]\nprobability of matching: %d%", probability);
})
.catch(function (err) {
	console.error(err);
});
