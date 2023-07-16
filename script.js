const express = require('express');
const app = express();
const mysql = require('mysql2');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine','handlebars');

app.get('/', async(req,res)=>{
    res.render('cadastroPessoa')
})

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json)

//conexão com o banco :)
const conn= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'02092005',
    database:'TCC'
})
conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('conectado com secesso')
    app.listen(3000);
})


conn.connect(function(err){
    if(err){
      console.log(err)
    }
    console.log('Conexão realizada com sucesso');
  
    app.listen(3050, () => {
      console.log('Servidor iniciado na porta 3050');
    });
    
})