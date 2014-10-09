// create an empty object

var app = app || {};

// pass a o variable shorthand for object and the paramaters (app) below being the variable declaration above
(function(o){


	"use strict";

	// private methods
	// ajax creating the ajax call to server 
	// getFormData is retreiving the form data i.e. files
	// setProgress is to "animate" the progress bar

	var ajax, getFormData, setProgress;

	ajax = function(data){
		// test to see if the files have been appended to the FormData
		// console.log(data);

		var request = new XMLHttpRequest();
		var uploaded;

		function getServerResponse() {
		if(this.readyState === 4){
				if(this.status === 200){
					// test request status:
					// console.log("all good in the hood!!!");
					// to check response remember php script produses a json encoded string
					// console.log(this.response)
					uploaded = JSON.parse(this.response);
					// to see it after the parse method
					// console.log(uploaded);
					if(typeof o.options.finished === 'function'){
						o.options.finished(uploaded);
					}

				} else {
					if(typeof o.options.error === 'function'){
						o.options.error();
					}
				}
			}
		}

		function getPercentageUpload(e, uploaded){
			var percent;
			if(e.lengthComputable === true){
				// to see the values of what is being uploaded in real time
				// console.log(e);
				// converts to a % percentage
				percent = Math.round((event.loaded / event.total) * 100);
				// to view this in console:
				// console.log(percent);
				// pass the percent value to the setProgress() method
				setProgress(percent);
			}
		}
	
		request.upload.addEventListener('progress', getPercentageUpload, false);
		request.addEventListener("readystatechange", getServerResponse, false);
		request.open('post', o.options.processor);
		request.send(data);

	};

	getFormData = function(source){
		// quick check to see if there are any file objects being passed over
		// console.log(source);
		// note this is an override in javascript as we are overriding the FormData native funciton here:
		var data = new FormData();
		var i;
		for (i = 0; i < source.length; i++) {
			data.append('files[]', source[i]);
		}
		return data;
	};

	setProgress = function(value){
		// quick check to see if the percent was passed to this method:
		// console.log(value);
		if(o.options.progressBar !== undefined){
			o.options.progressBar.style.width = value ? value + '%' : 0;
		}
		if(o.options.progressText !== undefined){
			o.options.progressText.textContent = value ? value + '%' : '';
		}
	};

	o.uploader = function(options){
		// check that the parameters are passed through to this uploader function from the upload_function.js file
		// console.log(options);
		o.options = options;
		if(o.options.files !== undefined){
			// call the ajax function above
			ajax(getFormData(o.options.files));
		}
	};

}(app));