require('dotenv').config(); // 1. Carregar variáveis secretas
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000; // Adaptável para a nuvem (Render)

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. LIGAÇÃO AO MONGODB (Usando a variável do ficheiro .env)
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ ERRO: A variável MONGO_URI não foi definida no ficheiro .env");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conectado ao MongoDB Atlas (Modo Seguro)'))
    .catch(err => console.error('❌ Erro de ligação:', err));

// 4. MODELO DE DADOS
const ItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    quantidade: { type: Number, default: 1 },
    concluido: { type: Boolean, default: false }
});
const Item = mongoose.model('Item', ItemSchema);

// 5. ROTAS

// Listar tudo
app.get('/compras', async (req, res) => {
    try {
        const lista = await Item.find();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao ler dados" });
    }
});

// Adicionar novo
app.post('/compras', async (req, res) => {
    try {
        const novoItem = new Item({
            item: req.body.item,
            quantidade: req.body.quantidade
        });
        await novoItem.save();
        const lista = await Item.find();
        res.status(201).json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao guardar" });
    }
});

// Alternar entre concluído e pendente (NOVA ROTA)
app.patch('/compras/alternar/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ erro: "Item não encontrado" });

        item.concluido = !item.concluido; // Inverte o estado (true -> false / false -> true)
        await item.save();
        
        const lista = await Item.find();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar estado" });
    }
});

// Apagar por ID
app.get('/compras/limpar/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        const lista = await Item.find();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao apagar" });
    }
});

// 6. ARRANCAR
app.listen(PORT, () => {
    console.log(`🚀 Servidor online na porta ${PORT}`);
});