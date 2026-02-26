const express = require('express');
const app = express();
const PORT = 3000;

// 1. Configuração para o servidor entender JSON
app.use(express.json());

// 2. A tua lista inicial de compras
let listaCompras = [
    { id: 1, item: 'Leite', quantidade: 2 },
    { id: 2, item: 'Ovos', quantidade: 12 }
];

// 3. Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor SmartHome Online!');
});

// 4. Rota para VER as compras
app.get('/compras', (req, res) => {
    res.json(listaCompras);
});

// 5. Rota para ADICIONAR um item (POST)
app.post('/compras', (req, res) => {
    const novoItem = {
        id: listaCompras.length + 1,
        item: req.body.item,
        quantidade: req.body.quantidade
    };
    listaCompras.push(novoItem);
    console.log('Item adicionado com sucesso:', novoItem);
    res.status(201).json(listaCompras);
});

// 6. Rota para APAGAR um item (DELETE via GET para teste fácil)
app.get('/compras/limpar/:id', (req, res) => {
    const idParaRemover = parseInt(req.params.id);
    listaCompras = listaCompras.filter(item => item.id !== idParaRemover);
    console.log(`Item ${idParaRemover} removido.`);
    res.json(listaCompras);
});

// 7. Ligar o servidor (SEMPRE NO FIM)
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});