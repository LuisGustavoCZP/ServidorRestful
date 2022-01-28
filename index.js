const port = 8000;
const rootPath = __dirname;
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(rootPath+"/public"));

let produto = [];

app.get("/produto/:id", (req, res) => 
{
    const id = req.params["id"];
    let prods;
    if(id == "all"){
        prods = produto;
    } else {
        prods = produto.filter(item => {return item.id == id;});
    }
     
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
        return;
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
        return;
    }

    let s = false;
    produto.forEach((p, i) => 
    {
        if(p.id == id) 
        {
            p.name = name;
            s = true;
        }
    });
        //((x, y, i) => {}, 0);
    //produto.push({id:id, name:name});
    res.send(s);
    console.log(`${s?"":"NOT "}Updated id ${id}`);
});

app.delete("/produto", (req, res) => 
{
    const id = req.body["id"];
    if(!id) 
    {
        res.send(false);
        console.log(`NOT Deleted id ${id}`);
        return;
    }

    let s = false;
    const dels = produto.reduce((p, n, i) => 
    {
        if(n.id == id) 
        {
            p.push(i);
            s = true;
        }
        return p;
    }, []);
    if(s) dels.forEach(i => { produto.splice(i, 1); });
    res.send(s);
    console.log(`${s?"":"NOT "}Deleted id ${id}`);
});

app.listen(port, () => {console.log(`Iniciado Backend na porta ${port}`)});