const mongoose = require('mongoose');

const CoonDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('coonDB connected'))
        .catch(err => console.log(err));
}


module.exports = CoonDB;