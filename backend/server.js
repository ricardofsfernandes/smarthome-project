const express = require('express');
const app = express();
const PORT = 3000;

// Rota de teste para o browser
app.get('/', (req, res) => {
    res.send('Servidor SmartHome Online!');
});

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});