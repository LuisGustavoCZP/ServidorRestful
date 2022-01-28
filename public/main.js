const newID = document.getElementById("id");
const newName = document.getElementById("nome");
const output = document.getElementById("output");

function CreateItem (item)
{
    const li = document.createElement("li");
    li.innerHTML = `<h3>${item.id}</h3><h4>${item.name}</h4>`;
    return li;
}

function Consult () 
{
    fetch("/produto"+"?"+"id"+"="+newID.value)
    .then((resp) => resp.json())
    .then(function (data) {
        console.log(data);
        output.innerHTML = "";
        if(data) {
            data.forEach(item => 
            {
                output.append(CreateItem (item));
            });
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function Insert ()
{
    fetch("/produto", 
    {
        method: 'post',
        body: JSON.stringify({"id": newID.value, "nome":newName.value}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log('Request succeeded with JSON response', data);
        console.log(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function Update ()
{
    fetch("/produto", 
    {
        method: 'put',
        body: JSON.stringify({"id": newID.value, "nome":newName.value}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log('Request succeeded with JSON response', data);
        console.log(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function Delete () 
{
    fetch("/produto", 
    {
        method: 'delete',
        body: JSON.stringify({"id": newID.value}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log('Request succeeded with JSON response', data);
        console.log(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
