const server = require('./src/app.js');
const { conn } = require('./src/DbIndex.js');
const port = process.env.PORT || 4000;

conn.sync({ force: false  }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`);
  });
});
