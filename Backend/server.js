const app = require("./app");
const mongoose = require('mongoose');

const db = "mongodb://appuser:apppassword@127.0.0.1:27017/EventsDB";

mongoose.connect(db).then(() => {
    console.log('Db connection is successful');
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
