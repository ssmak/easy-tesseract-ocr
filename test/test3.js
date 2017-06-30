const eto = require('./../index.js');

console.log("\n-- test case 3: basic OCR scanning (traditional chinese), tra_chi-sample.png --");
eto.scan({
	imagePath: './test/tra_chi-sample.png',
	trainedData: 'chi_tra'
})
.then(function (text) {
	console.log('[result]\n', text);
})
.catch(function (err) {
	console.error(err);
});
	