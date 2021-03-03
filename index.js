const { timeStamp } = require('console');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    var nombre = 'anonimoQl'

    io.emit('conection', 'a user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', nombre +': '+ msg);
    });

    socket.on('nickname', (msg) => {
        io.emit('chat message', nombre + ' cambió su nombre a '+' : '+ msg);
        nombre = msg;
        console.log('nombre',nombre);
    });

    socket.on('disconnect', () => {
        io.emit('conection', 'a user disconnected');
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});