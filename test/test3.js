const eto = require('./../index.js');

console.log("\n-- test case 3: basic ocr scanning (traditional chinese), tra_chi-sample.png --");
eto.scan('./test/tra_chi-sample.png')
	.then(function (text) {
		console.log('result: ', text);
	})
	.catch(function (err) {
		console.error(err);
	});
	