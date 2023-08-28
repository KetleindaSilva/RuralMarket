const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql.infocimol.com.br
  ',
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