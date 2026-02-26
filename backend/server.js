const express = require('express');
const app = express();
const PORT = 3000;

// 1. Configuração para o servidor entender JSON
app.use(express.json());

// 2. A tua lista inicial de compras (Base de dados temporária)
let listaCompras = [
    { id: 1, item: 'Leite', quantidade: 2 },
    { id: 2, item: 'Ovos', quantidade: 12 }
];

// 3. Rota de teste (Página inicial)
app.get('/', (req, res) => {
    res.send('Servidor SmartHome Online!');
});

// 4. Rota para ver as compras (Onde deve aparecer o JSON)
app.get('/compras', (req, res) => {
    res.json(listaCompras);
});

// 5. Ligar o servidor
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});