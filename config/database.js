const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://damz1021:rootDavid@myfirstcluster-dzpko.mongodb.net/asteriadb', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))