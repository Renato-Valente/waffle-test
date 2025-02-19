console.log('ai, sofia. Me dah um beijinho');

const express = require('express');
const cors = require('cors');
const database = require('./database');

//http://waffle-test.onrender.com/

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    console.log('fizeram uma requisição POST');
    if(!req.body) {
        console.log('Body não encontrado');
        return res.json({message: 'Requisição POST. Body não encontrado'})
    }
    console.log('body:', req.body);
    return res.json({message: 'Requisição POST', body: req.body})
})

app.get('/', (req, res) => {
    const query = Object.entries(req.query).length > 0 ? req.query : undefined;
    console.log('alguem fez uma requisição GET');
    if(query) console.log('query:', query);
    return res.json({
        message: 'Requisição GET',
        query
    })
})

/* app.get('/', (req, res) => {
    if(!database) {
        console.log('Erro na conexão com o banco de dados');
        return res.status(500).json({message: 'Erro na conexão com o banco de dados'});
    }
    database.query('select * from teste', (err, result) => {
        if(err){
            console.log('Erro ao realizar query');
            return res.status(500).json({
                message: 'Erro ao realizar a query',
                err: err
            })
        }

        console.log(result);
        return res.status(200).json(result);
    })

}) */

/* app.post('/', (req, res) => {
    if(!req.body) return res.status(500).json({
        message: 'payload body não informado'
    })
    console.log(req.body);
    return res.status(200).json(req.body);
})

app.post('/api/', (req, res) => {
    if(!database) {
        console.log('Erro de conexão com o banco de dados');
        return res.status(500).json({
            message: 'Erro de conexão com o banco de dados'
        })
    }

    const {nome, idade}  = req.body;
    if(!nome || !idade) {
        console.log('valores de nome ou idade faltando');
        return res.status(400).json({
            error: 'valores de nome ou idade faltando'
        })
    }

    const query = `insert into teste (nome, idade) values ('${nome}', ${idade})`;
    database.query(query, (err, result) => {
        if(err) {
            console.log('Erro ao cadastrar dados no banco');
            return res.status(500).json({
                message:'erro ao cadastrar dados no banco',
                err: err.message
            });
        }
        console.log('dados cadastrados no banco com sucesso');
        return res.status(200).json({message: 'dados cadastrados com sucesso'})
    })
})

app.get('/', (req, res) => {
    
    database.query('select * from teste', (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        return res.status(200).json(result);
    })
}) */


app.listen(PORT, () => {
    console.log('servidor rodando');
})
