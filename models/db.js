const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '02092005',
  database: 'ruralmarket'
});
connection.connect(function(err){
    if(err){
      console.log(err)
    }
    console.log('Conexão realizada com sucesso');
})
module.exports = connection;