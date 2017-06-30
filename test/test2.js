const eto = require('./../index.js');

console.log("\n-- test case 2: ocr scanning with character(s) comparision (english), eng-sample.png compares with Play --")
eto.scan('./test/eng-sample.png', "Play")
	.then(function (probability) {
		console.log("probability of matching: %d%", probability);
	})
	.catch(function (err) {
		console.error(err);
	});
