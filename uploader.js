#! /usr/bin/node 
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var port = process.argv[2]
var ip = require('ip')
var MAX_PORT = 65536
var MIN_PORT = 1023

if(!(port < MAX_PORT && port > MIN_PORT)){
	console.log("Usage: node uploader.js port\n ERROR port must be < "+MAX_PORT+" and > "+MIN_PORT)
	return 1
}


http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '/home/einstein/projects/node/upload/uploadedFiles/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(port, () =>{
	console.log("listening on: "+ip.address()+":"+port)
});
