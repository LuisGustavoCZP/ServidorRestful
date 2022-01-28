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
    ConsultID(newID.value);
}

function ConsultID (id) 
{
    fetch("/produto"+"/"+(id?id:"all"))
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
        console.log('Insert request', data);
        if(data){
            Consult ();
        }
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
        console.log('Update request ', data);
        if(data){
            ConsultID ();
        }
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
        console.log('Delete request', data);
        if(data){
            ConsultID ();
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

ConsultID ();