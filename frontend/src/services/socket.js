import io from 'socket.io-client';

const socket = io.connect('http://localhost:3333');

const socketOn = (event, message) => {
    socket.on(event, message);
}

export default socketOn;