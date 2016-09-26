var express = require('express');
var app = express();
var port =  process.env.PORT || 3000;

app.get('/', app.use(express.static('dist')));

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});