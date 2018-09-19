/**
 * 
 */
class FileListPlugin {
	construstor(options) {
		this.options = options;
	}

	apply(compiler) {
		// emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
		compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, callback) => {
			// Create a header string for the generated file:
			let fileList = '';

			// Loop through all compiled assets,
			// adding a new line item for each filename.
			// compilation.assets: {bundle.js:{source(){},size(){}}}
			for (let filename in compilation.assets) {
			  fileList += '- ' + filename + "\r\n";
			}

			// Insert this list into the webpack build as a new file asset:
			compilation.assets["filelist.md"] = {
				source() {
					return fileList;
				},
				size() {
					return Buffer.byteLength(fileList);
				}
			};

			callback();
		});
	}
}

module.exports = FileListPlugin;
