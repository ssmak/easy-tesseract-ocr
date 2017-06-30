const eto = require('./../index.js');

console.log("\n-- test case 4: ocr scanning with character(s) comparision (traditional chinese), tra_chi-sample.png caompares with 繁體中文 --")
eto.scan('./test/tra_chi-sample.png', "繁體中文")
	.then(function (probability) {
		console.log("probability of matching: %d%", probability);
	})
	.catch(function (err) {
		console.error(err);
	});
