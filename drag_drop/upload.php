<?php

// set a header here to define what the type/association the following program accepts

header('Content-Type: application/json');

// set an array of extensions that are allowed to be uploaded, just add more
$allowed = ['mp4', 'png', 'jpg'];

// processed in this instance is an array of data that will hold the values from the 
// $_FILES superglobal array as data.  If it is allowed it will have a boolean true in its assocation
// The end of the file returns a json object and in this object we can pass to the user a success or fail 
// depending on our program constraints

$processed = [];

foreach ($_FILES['files']['name'] as $key => $name) {


	if($_FILES['files']['error'][$key] === 0){
		// echo this out for test
		$temp = $_FILES['files']['tmp_name'][$key];

		// to fully test whats in the object passed to the $_FILES array you can look for:
		// get the type of file being uploaded
		// $type = $_FILES['files']['type'][$key];
		// // get the size of the file being uploaded
		// $size = $_FILES['files']['size'][$key];

		

		// to test this: print_r($ext);
		$ext = explode('.', $name);

		// strtolower converts a string to lower case
		// end here is after the . so we are extracting the 
		// file extension from the $_FILES superglobal array
		// via post

		$ext = strtolower(end($ext));

		// try to make the file unique. so if using database use a record with auto increment id
		// to test the full information ($name, $type, $size) using echo
		// echo $file = uniqid('', true). '_mime-type:' .$type .'_file-size:' .$size.'_bytes'.'_current-time:' .time() . '_extension:'. '.' .$ext;
		// in this instance we are going to use:
		$file = uniqid('', true). time() . '.' .$ext;

		if(in_array($ext, $allowed) && move_uploaded_file($temp, 'uploads/'.$file)){
			$processed[] = array(
				'name' => $name,
				'file' => $file,
				'uploaded' => true
				);
		}else{
			$processed[] = array(
				'name' => $name,
				'uploaded' => false
				);
		}
	}
}

// output our processed array to return to our view so we can inform user if upload successful or not
echo json_encode($processed);


?>