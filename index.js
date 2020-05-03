const app = require("./app");
require('./database')

async function init(){
    await app.listen(3000);

    console.log('server on port 3000')
}

init();