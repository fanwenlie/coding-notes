module.exports = function(source) {
	// emitFile会生成一个文件，第一个参数如果是url的形式，会自动生成文件夹
	this.emitFile("static/main.css", source);
	let script = `
    var link  = document.createElement('link');
    link.setAttribute('rel','stylesheet');
    link.setAttribute('href','static/main.css');
    document.head.appendChild(link);
  `;
	return script;
};
