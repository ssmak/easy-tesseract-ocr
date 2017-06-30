const eto = require('./../index.js');

console.log("\n-- test case 1: basic OCR scanning (english), eng-sample.png --");
eto.scan({
	imagePath: './test/eng-sample.png',
	trainedData: 'eng'
})
.then(function (text) {
	console.log('[result]\n', text);
})
.catch(function (err) {
	console.error(err);
});
	