const port = 8000;
const rootPath = __dirname;
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(rootPath+"/public"));

let produto = [];

app.get("/produto", (req, res) => 
{
    const id = req.query["id"];

    const prods = produto.filter(item => {return item.id == id;});
    res.json(prods); //JSON.stringify()
    console.log(`Get id ${id}`);
});

app.post("/produto", (req, res) => 
{
    const id = req.body["id"];
    const name = req.body["nome"];
    if(!id || !name) 
    {
        res.send(false);
        console.log(`NOT Inserted id ${id}`);
    }

    produto.push({id:id, name:name});
    res.send(true);
    console.log(`Inserted id ${id}`);
});

app.put("/produto", (req, res) => 
{
    const id = req.body["id"];
    const name = req.body["nome"];
    if(!id || !name) 
    {
        res.send(false);
        console.log(`NOT Updated id ${id}`);
    }

    const prods = produto.findIndex(());//((x, y, i) => {return y.id == id}, 0);
    //produto.push({id:id, name:name});
    res.send(prods);
    console.log(`Updated id ${id}`);
});

app.delete("/produto", (req, res) => 
{
    const id = req.body["id"];
    console.log(`Delete id ${id}`);
});

app.listen(port, () => {console.log(`Iniciado Backend na porta ${port}`)});