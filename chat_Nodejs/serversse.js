const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5005;
const subscribers = {};
app.get('/subscribe', (req, res) => {
    const id = Math.ceil(Math.random() * 1000);
    req.on('close', () => delete subscribers[id]);
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    subscribers[id] = res;
});
app.post('/messageSubscribers', (req, res) => {
    const { body } = req;
    Object.keys(subscribers).forEach((resId) => {
        subscribers[resId].write(`data: ${JSON.stringify(body)}\n\n`);
    });
    res.status(204).end();
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
