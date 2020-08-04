const app = require('./app');
const path = require('path');
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log('Hi from port ' + port + '!');
});
