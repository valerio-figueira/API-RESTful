const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();



// Ler JSON / Middlewares (sempre executado entre as requisições e respostas)
app.use(
    express.urlencoded({
        extended: true
    })
);
// Com essas configurações, o express lerá os dados como json e também enviará json como resposta das requisições
app.use(express.json());

// Rotas da API
const personRoutes = require('./routes/personRoutes');

// Middleware: tudo o que tiver na rota /person será redirecionado para o arquivo personRoutes
app.use('/person', personRoutes);

// Rota inicial / endpoint
app.get("/", (req, res) => {
    // mostrar req

    res.json({message: 'Hello, World!'})
});


// Disponibilizar uma porta & Conectar ao CLOUD MongoDB
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vimpoeg.mongodb.net/database?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000, () => {
        console.log('Conectado ao MongoDB!')
    });
}).catch((error) => {
    console.log(error);
});