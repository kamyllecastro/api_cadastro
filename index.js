const express = require('express'); // servidor web
const fs = require('fs'); // manipulação de arquivos~
const path = require('path'); // manipulação de caminhos

const app = express();
const port = 3000;


app.use(express.json());

/*
CLIENTES ENDPOINTS 
*/
const clientesFile = path.join(__dirname, "clientes.json");

function lerClientes() {
   if(!fs.existsSync(clientesFile)){
      return [];
   }
 
   const dados = fs.readFileSync(clientesFile, 'utf-8');
   
   try{
    return JSON.parse(dados) || [];
   }catch(e){
    return [];
   }
}

function salvarClientes(clientes){
   fs.writeFileSync(clientesFile, JSON.stringify(clientes, null, 2), 'utf-8');
}

app.post('/clientes', (req, res) => {
});

app.get('/clientes', (req, res) => {
    const cliente = lerClientes();
    res.status(200).json(cliente);
});
  

const cliente = lerClientes();

if(cliente.some(c => c.cpf === cpf)){
    return res.status(400).json({ error: 'CPF já cadastrado' });
}

const novoCliente = { cpf, nome, idade, endereco, bairro, contato};
cliente.push(novoCliente);
salvarClientes(cliente);

res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente: novoCliente });


app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`);
});
