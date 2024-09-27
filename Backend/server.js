const app = require("./app");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const db = process.env.DATABASE;

mongoose.connect(db).then(() => {
    console.log('Db connection is successful');
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
