const express = require ('express');
const Database = require ('./mysqlcon');
var cors = require ('cors');

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('El Servidor esta listo');
})

app.get('/student', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * FROM students', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})

app.get('/user', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * FROM user', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})



app.post('/student', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO students    
                (cedula,nombre,apellido,correo,telefono) VALUES
                 (?,?,?,?,?)`;

    cn.execute(
        query, [body.cedula, body.nombre, body.apellido, body.correo, body.telefono],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );



})

app.post('/user', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO materia 
                (username, password, status) VALUES
                 (?,?,?)`;

    cn.execute(
        query, [body.username, body.password, body.status],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );



})



app.post('/student', (req, res)=>{
    const body = req.body;
    res.json(body)
})


app.listen(port, () => {
    console.log('localhost:'+port);
})