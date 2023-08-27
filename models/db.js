const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql27-farm10.kinghost.net',
  user: 'infocimol06',
  password: 'ruralMarket123',
  database: 'infocimol06'
});

connection.connect(function(err){
    if(err){
      console.log(err)
    }
    console.log('Conexão realizada com sucesso');
})
module.exports = connection;