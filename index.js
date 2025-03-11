const server = require('./src/app.js');
const { conn } = require('./src/DbIndex.js');

conn.sync({ force: true  }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');
  });
});