const http = require('http');
const fs = require('fs');

// Load index.html once when the server starts to improve performance
const index = fs.readFileSync('index.html', 'utf-8');
// Load data.json once when the server starts
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// Assuming you want to use the first product in some way
const product = data.product[4];

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/hello':
            // Serve the index.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(index);
            break;

        case '/demo':
            // Serve the data.json content as it is
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
            break;

        case '/product':
            // Serve only the first product as JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const dynamic = index.replace('***name***',product.name).replace("**bio**",product.bio)
            res.end(dynamic);
            break;

        default:
            // Handle 404 Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            break;
    }
    console.log(`Request received: ${req.url}`);
});

server.listen(3030, () => {
    console.log("Server is listening on port 3030");
});
