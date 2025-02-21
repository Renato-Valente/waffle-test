console.log('ai, sofia. Me dah um beijinho');

const express = require('express');
const cors = require('cors');
const database = require('./database');

//http://waffle-test.onrender.com/

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/', async(req, res) => {
    if(!database) return res.status(500).json({message: 'Erro com o banco de dados'});
    const {email, id, utm_source, utm_medium, utm_campaign, utm_channel} = req.body;
    if(!email || !id) return res.status(500).json({
        message: 'Os campos email e id são necessarios'
    });
    const sourceText = utm_source ? `'${utm_source}'` : 'null';
    const mediumText = utm_medium ? `'${utm_medium}'` : 'null';
    const campaignText = utm_campaign ? `'${utm_campaign}'` : 'null';
    const channelText = utm_channel ? `'${utm_channel}'` : 'null';
    
    const sql = `insert into news values ('${email}', '${id}', ${sourceText}, ${mediumText}, ${campaignText}, ${channelText})`;
    const result = await database.query(sql);
    if(!result) return res.status(500).json({message: 'Erro ao cadastrar dados no banco'});
    return res.status(200).json({message:'Dados cadastrados com sucesso', ...req.body});
})

app.get('/', async(req, res) => {
    if(!database) return res.status(500).json({message: 'Erro com o banco de dados'});
    const { email } = req.query;
    const result = email ?
    await database.query(`select * from news where email = '${email}'`) :
    await database.query('select * from news');

    if(!result) return res.status(500).json({message: 'Erro ao procurar dados'});
    return res.status(200).json(result.rows);
})


app.listen(PORT, () => {
    console.log('servidor rodando');
})
