const fs = require('fs');
const exec = require('child-process-promise').exec;

var easy_tesseract_ocr = {
	scan: function (imagePath, compare) {
		let promise = new Promise(function (resolve, reject) {
			exec('tesseract ' + imagePath + ' tesseract -l chi_tra')
				.then(function (result) {
					let stdout = result.stdout;
					let stderr = result.stderr;
					//console.log('stdout: ', stdout);
					//console.log('stderr: ', stderr);
					let out = fs.readFileSync('./tesseract.txt').toString().replace(' ', '');
					fs.unlink('./tesseract.txt');
					
					if(compare) {
						let compareList = [];
						for(let c of compare) {
							compareList.push(c);
						}
						let findText = 0;
						for(let c of compareList) {
							if(out.indexOf(c) >=0) {
								//console.log('equal:' + c);
								findText++;
							}
						}
						//calculate probability
						let prob = (findText / compareList.length) * 100;
						resolve(prob);
					} else {
						//pass the ocr result(text)
						resolve(out.toString());
					}
				})
				.catch(function (err) {
					//console.error('error: ', err);
					reject(err);
				});	
		});	
		
		return promise;
	}
};

module.exports = easy_tesseract_ocr;
