const eto = require('./../index.js');

console.log("\n-- test case 1: basic ocr scanning (english), eng-sample.png --");
eto.scan('./test/eng-sample.png')
	.then(function (text) {
		console.log('result: ', text);
	})
	.catch(function (err) {
		console.error(err);
	});
	