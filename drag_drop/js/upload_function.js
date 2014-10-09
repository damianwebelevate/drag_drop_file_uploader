// all this behaves like a controller. gets elements from the view and sends messages to the model and the model in this
// instance is ajax_upload.js app object which handles the business logic ie the files the progress bar and the options
// necessary for the application to function

(function(){

	"use strict";

	var dropArea = document.getElementById('dropArea');
	var fillBar = document.getElementById('fill');
	var fillBarText = document.getElementById('fill_text');
	var userReport = document.getElementById('hidden');


	// controller for tying the views functionality to the models methods
	var startUpload = function(files){
		// check the files that were either dropped to the dropArea or selected by button Choose Files
		// console.log(files);
		app.uploader({
			files: files,
			progressBar: fillBar,
			progressText: fillBarText,
			processor: 'upload.php',

			// data in this instance is the json response from the server
			finished: function(data){
				// to see the progress of the posted files on the server:
				console.log(data);
				// php code returns json formatted string which is parsed and returned to this function
				// create variables
				var i;
				var output;
				var linkToFile;
				var status;
				var currFile;
				var error_Area;

				for(i = 0; i < data.length; i++){

					currFile = data[i];
					// create a div element to house our returning data
					output = document.createElement('div');
					output.className = 'upload_upload';
					error_Area = document.createElement('div');
					error_Area.className = 'error_Area';


					linkToFile = document.createElement('a');
					linkToFile.textContent = currFile.name;
					


					if(currFile.uploaded){
						linkToFile = document.createElement('a');
						linkToFile.href = 'uploads/' + currFile.file;
						linkToFile.textContent = currFile.name;
					}else{
						error_Area.textContent = 'Failed to upload ... file type not supported';
					}

					status = document.createElement('span');
					status.textContent = currFile.uploaded ? 'Uploaded' : 'Failed';

					output.appendChild(linkToFile);
					output.appendChild(status);
					output.appendChild(error_Area);

					userReport.appendChild(output);
				}
					userReport.className = '';

			},

			// use the error or defined list of errors from server here
			error: function(){
				console.log("Error....Could Not Connect To Server");
			}

		});
		
	};


	function overRide_Default(e) {
		var normalUploadFiles = document.getElementById('file_upload_normal').files;
		//console.log(normalUploadFiles);
		// comment this next line for testing
		// e.preventDefault();
 		startUpload(normalUploadFiles); 	
	}
		// add event listener to submit button and override its default behaviour and implement our own ajax call
		// startUpload function
		var btn = document.getElementById("normal_upload_submit");
		btn.addEventListener("click", overRide_Default, false);

	// doesn't work::::
	// document.getElementById('normal_upload_submit').addEventListner("click", function(e){
	// 	//get the files value add the .files like so:
	// 	var normalUploadFiles = document.getElementById('file_upload_normal').files;

	// 	e.preventDefault();

	// 	startUpload(normalUploadFiles);
	// });


	// Drop functionality

	//passes the window event to this function and prevents the Default
	dropArea.ondrop = function(e){
		e.preventDefault();
		this.className = 'droppable_area';

		//test to see what files are in the droppable area 
		//pass a value of 1 into the startUpload(<--1 here-->)
		// console.log(e.dataTransfer.files);
		startUpload(e.dataTransfer.files);
	
	};

	dropArea.ondragover = function(){
		//test: drag over function: 
		// console.log('drag over');
		this.className = 'droppable_area drop';
		return false;
	};

	dropArea.ondragleave = function(){
		//test: drag out function: 
		// console.log('drag left');
		this.className = 'droppable_area';
		return false;
	};


}());//end of file