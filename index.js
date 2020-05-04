const app = require("./app");
require('./database')

async function init(){
    try{
        await app.set('port', (process.env.PORT || 3000))
        await app.listen(app.get('port'), () => {
            console.log('server on port 3000')
        });
    }
    catch(e){
        console.log(e);
    }
}

init();