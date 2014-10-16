var require = (function() {
	var loaded_files = {}

	// The request that fetches the js file. Synchronous. Returns the code in the file.
	var request_new_file = function(filename) {
		console.log('Requesting', filename)
		
		var location = window.location.origin + filename
		var xhr = new XMLHttpRequest();
		xhr.open('GET', location, false);
		xhr.send(null);

		if (xhr.status === 200) {
			return xhr.responseText
		}
		else {
			console.log('Error', xhr.responseText)
		}
	}

	return function(file) {

		// Load the file only if the file hasn't been loaded already
		if(!(file in loaded_files)) {

			// We need a try/catch here, since we might forget adding module.exports in a required file.
			try {
				// The code we recieve from the script file
				var text_content = request_new_file(file)
				// The code when evaluated. We add a return module.exports in the file,
				// so that the code when evaluated inside a function actually returns our module.
				// We could use eval() here too, but this exposes the file to the variables of
				// this file. Using new Function, it creates an anonymous function avoiding that risk
				var evaled_code = new Function(text_content + '\nreturn module.exports')()

				// Store the loaded file for next time
				loaded_files[file] = evaled_code
			} catch(e) {
				if(e instanceof ReferenceError) {
					console.error('No module.exports defined in', file)
				}
			}

		}

		return loaded_files[file]
	}
}())