console.log('ai, sofia. Me dah um beijinho');

const express = require('express');
const cors = require('cors');
const database = require('./database');

//http://waffle-test.onrender.com/

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const date = new Date();

app.post('/', async(req, res) => {
    if(!database) return res.status(500).json({message: 'Erro com o banco de dados'});
    const {email, id, titulo, data, utm_source, utm_medium, utm_campaign, utm_channel} = req.body;
    if(!email || !id || !titulo) return res.status(500).json({
        message: 'Os campos email, id e titulo são necessarios'
    });
    const sourceText = utm_source ? `'${utm_source}'` : 'null';
    const mediumText = utm_medium ? `'${utm_medium}'` : 'null';
    const campaignText = utm_campaign ? `'${utm_campaign}'` : 'null';
    const channelText = utm_channel ? `'${utm_channel}'` : 'null';
    const dataText = data ? `'${data}'` : `'${date.getFullYear()}/${date.getMonth()}/${date.getDate()}'`;
    
    const sql = `insert into news values ('${email}', '${id}', '${titulo}', ${dataText}, ${sourceText}, ${mediumText}, ${campaignText}, ${channelText})`;
    const result = await database.query(sql);
    if(!result) return res.status(500).json({message: 'Erro ao cadastrar dados no banco'});

    console.log('Dados cadastrados via requisição POST');
    return res.status(200).json({message:'Dados cadastrados com sucesso', ...req.body});
})

app.get('/', async(req, res) => {
    if(!database) return res.status(500).json({message: 'Erro com o banco de dados'});
    const { email } = req.query;
    const result = email ?
    await database.query(`select * from news where email = '${email}'`) :
    await database.query('select * from news');

    if(!result) return res.status(500).json({message: 'Erro ao procurar dados'});
    
    const finalResult = [];
    for(const item of result.rows){
        //mudando data para o formato yyyy/mm/dd
        const newData = item.data.toISOString().slice(0, 10);
        finalResult.push({...item, data: newData })
    }

    console.log('requisição get realizada');
    return res.status(200).json(finalResult);
})

app.get('/users', async(req, res) => {
    console.log('requisição Get /users')
    if(!database) return res.status(500).json({message: 'Erro com o banco de dados'});
    const result = await database.query('select * from users');
    if(!result) return res.status(500).json({message: 'Erro ao procurar dados no banco'});
    return res.status(200).json(result.rows);
})


app.listen(PORT, () => {
    console.log('servidor rodando');
})
