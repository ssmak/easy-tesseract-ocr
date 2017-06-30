# easy-tesseract-ocr
This is a tiny OCR project and just provide a caller method to interact with Tesseract (Which is a known open source OCR library project written in C++).

## prerequisite
Download and Install the Tesseract OCR Engine:<br />
For more details, please refer to Github: https://github.com/tesseract-ocr/tesseract<br />
Windows binary(3-parties) and Trained data: https://sourceforge.net/projects/tesseract-ocr-alt/files/
<br /><br />
For Windows user, you can install Tesseract OCR engine from this projecct directory(test/tesseract-3.02.02-chi_traineddata.7z)
I have packed with the Traditional Chinese trained data.

## command line test
Please make sure the Tesseract OCR engine can be called from command/unix cli.<br />
Window:<br />
\\>tesseract -v<br />
(*the version number will be printed if Tesseract is set up correctly. If none of this, please make sure you have added the installation path to the PATH environment variable. Almost the default path should be C:\Program Files (x86)\Tesseract-OCR)

## usage on Node
npm install easy-tesseract-ocr --save

-- index.js
```javascript
const eto = require('easy-tesseract-ocr');

eto.scan('./eng-sample.png')
	.then(function (text) {
		console.log('result: ', text);
	})
	.catch(function (err) {
		console.error(err);
	});
```	
