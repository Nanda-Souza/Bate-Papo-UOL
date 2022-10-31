let mensagens = [];
let novoUsuario = [];
let nomeUsuario = "";

function carregarMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    //console.log(promessa);
    promessa.then(processarMensagens);

}

function processarMensagens(resposta) {
    //console.log(resposta);
    mensagens = resposta.data;
	//console.log(mensagens);

    renderizarMensagens();
}

function renderizarMensagens(){

    const listaMensagens = document.querySelector('.container-principal');    

    listaMensagens.innerHTML = '';

    for(let i =0; i < mensagens.length; i++){

        let mensagem = mensagens[i];

        if (mensagem.type === 'status'){
            listaMensagens.innerHTML += `
            <div class="mensagem status">
                <div class="hora"><p>${mensagem.time}</p> </div>
                <div class="msgm"><strong>${mensagem.from}</strong> ${mensagem.text}</div>
            </div>            
        `;
        }        
        else if (mensagem.type === 'message'){
            listaMensagens.innerHTML += `
            <div class="mensagem">
                <div class="hora"><p>${mensagem.time}</p> </div>
                <div class="msgm"><strong>${mensagem.from}</strong> para <strong>${mensagem.to}</strong>: ${mensagem.text}</div>
            </div>            
        `;
        }
        else if (mensagem.from === nomeUsuario) {
            listaMensagens.innerHTML += `            
            <div class="mensagem private">
                <div class="hora"><p>${mensagem.time}</p> </div>
                <div class="msgm"><strong>${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text}</div>
            </div>            
        `;
        }        
    } 
    
    const element = document.querySelector('.container-principal');    
    element.scrollIntoView(false);
    
}

function acessarChat(){
    nomeUsuario = prompt("Qual é o seu lindo nome?");

    novoUsuario = {
        name: nomeUsuario
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', novoUsuario);
    promessa.then(carregarMensagens);
    promessa.catch(tentarNovamente);
}

function tentarNovamente(){
    const nomeUsuario = prompt("Nome se encontra em uso, favor digitar outro nome?");

    novoUsuario = {
        name: nomeUsuario
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', novoUsuario);
    promessa.then(carregarMensagens);
    promessa.catch(tentarNovamente);
}

function manterConexao(){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', novoUsuario);
    promessa.then(console.log("Reconectado!"));    
}

acessarChat();
setInterval(carregarMensagens, 3000);
setInterval(manterConexao, 5000);




//carregarMensagens();
