const mongoose= require('mongoose');
mongoose.set('strictQuery',false);
const DB = process.env.DATABASE;

mongoose.connect(DB, {
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection`));
//HHHH