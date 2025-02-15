const robot = require('robotjs');
const sleep = require('sleep');
const jimp = require('jimp');
const fs = require('fs');
const exec = require('child-process-promise').exec;

var easyTesseractOCR = {
	getStaticOCRPromise: function (params) {
		let imagePath = params.imagePath ? params.imagePath : 'image-not-found.jpg';
		let compare = params.compare ? params.compare : null;
		let trainedData = params.trainedData ? params.trainedData : null;
		
		return new Promise(function (resolve, reject) {
			exec('tesseract ' + imagePath + ' tesseract -l ' + trainedData)
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
	},
	scan: function (params) {
		let imagePath = params.imagePath ? params.imagePath : null;
		let compare = params.compare ? params.compare : null;
		let trainedData = params.trainedData ? params.trainedData : 'chi_tra';
		let reservedSample = params.reservedSample ? params.reservedSample : false;

		//check ocr progress type
		if(typeof(imagePath) === 'object') {
			//live screen ocr
			return new Promise((resolve, reject) => {
				try {
					let screenshot = null;
					if('x' in imagePath && 'y' in imagePath && 'width' in imagePath && 'height' in imagePath) {
						screenshot = robot.screen.capture(imagePath.x, imagePath.y, imagePath.width, imagePath.height);
					}
					if('x1' in imagePath && 'y1' in imagePath && 'x2' in imagePath && 'y2' in imagePath) {
						screenshot = robot.screen.capture(imagePath.x1, imagePath.y1, imagePath.x2 - imagePath.x1, imagePath.y2 - imagePath.y1);
					}
					new jimp(screenshot.width, screenshot.height, function (err, img) {
						img.bitmap.data = screenshot.image;
						//img.greyscale();
						//img.invert();
						img.scale(2);
						//img.contrast(0.25);						
						img.write('./eto.tmp.jpg');
						
						easyTesseractOCR.getStaticOCRPromise({
							imagePath: './eto.tmp.jpg',
							compare: compare,
							trainedData: trainedData
						})
						.then(function (result) {
							resolve(result);
							if(!reservedSample) {
								fs.unlink('./eto.tmp.jpg');
							}
						})
						.catch(function (err) {
							reject(err);
						});
					});	
				} catch(e) {
					reject(e);
				}				
			});
		} else {
			//static ocr promise
			return easyTesseractOCR.getStaticOCRPromise({
				imagePath: imagePath,
				compare: compare,
				trainedData: trainedData
			});
		}
	}
};

module.exports = easyTesseractOCR;
