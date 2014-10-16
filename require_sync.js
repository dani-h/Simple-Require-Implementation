var require = (function() {
	var loaded_files = {}

	var request_new_file = function(filename) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', filename, false);
		xhr.send(null);

		if (xhr.status === 200) {
			return xhr.responseText
		}
		else {
			console.log('Error', xhr.responseText)
		}
	}


	return function(file) {

		if(!(file in loaded_files)) {
			var content = eval(request_new_file(file)).exports
			loaded_files[file] = content
		}

		return loaded_files[file]
	}

}())