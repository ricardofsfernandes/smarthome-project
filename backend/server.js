const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. LIGAÇÃO AO MONGODB 
// IMPORTANTE: Substitui o link abaixo pelo teu real do Atlas.
// Mantém a tua password: 41arvbZsPNTEMpS1
const mongoURI = 'mongodb+srv://ricardo_dev:41arvbZsPNTEMpS1@cluster0.2wedql6.mongodb.net/smarthome?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas com sucesso!'))
  .catch(err => console.error('❌ Erro ao ligar ao MongoDB:', err));

// 3. MODELO DE DADOS (Schema)
const ItemSchema = new mongoose.Schema({
    item: String,
    quantidade: Number
});
const Item = mongoose.model('Item', ItemSchema);

// 4. ROTAS

// VER ITENS (GET)
app.get('/compras', async (req, res) => {
    try {
        const lista = await Item.find();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao procurar na BD" });
    }
});

// ADICIONAR ITEM (POST)
app.post('/compras', async (req, res) => {
    try {
        const novoItem = new Item({
            item: req.body.item,
            quantidade: req.body.quantidade
        });
        await novoItem.save();
        const listaAtualizada = await Item.find();
        res.status(201).json(listaAtualizada);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao guardar na BD" });
    }
});

// APAGAR ITEM (DELETE)
app.get('/compras/limpar/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        const listaRestante = await Item.find();
        res.json(listaRestante);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao apagar na BD" });
    }
});

// 5. LIGAR O SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});