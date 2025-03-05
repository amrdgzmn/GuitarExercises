const express = require('express')
const expresshbs = require('express-handlebars')
const router = require('./src/routes/indexRouter.js')
const path = require('path');
const http = require('http');

const app = express()
const PORT = 8080;

// const server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end();
// });
 
app.listen(PORT, () => {
    console.log("Hello world, I'm running on", PORT); 
});

async function main () {
    console.log("main running!");
    // Serve static files from public/
    app.use(express.static(path.join(__dirname, "../public"))); 


    app.engine("hbs", expresshbs.engine({
        layoutsDir: path.join(__dirname, "views/layouts"),
        extname: 'hbs'
    }))

    app.set("view engine", "hbs");
    app.set("views", "./views");
    app.use(express.json());
    app.use(router);
}

main();