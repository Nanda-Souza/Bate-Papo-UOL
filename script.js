let mensagens = [];
const mensagensTeste = [
    {from: 'João', to: 'Todos', text: 'entra na sala...', type: 'status', time: '09:21:45'},
    {from: 'João', to: 'Todos', text: 'Bom dia', type: 'message', time: '09:22:28'},
    {from: 'Maria', to: 'João', text: 'Oi João :)', type: 'message', time: '09:22:38'},
    {from: 'João', to: 'Maria', text: 'Oi gatinha quer tc?', type: 'private_message', time: '09:22:48'},
    {from: 'Maria', to: 'Todos', text: 'sai da sala...', type: 'status', time: '09:22:58'}
];


const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
console.log(promessa);

promessa.then(processarMensagens);
//promessa.catch(quandoErro);

//const elementoQueQueroQueApareca = document.querySelector('.mensagens');
//elementoQueQueroQueApareca.scrollIntoView();

function processarMensagens(resposta) {
    console.log(resposta);
    mensagens = resposta.data;
	console.log(mensagens);

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
        else {
            listaMensagens.innerHTML += `            
            <div class="mensagem private">
                <div class="hora"><p>${mensagem.time}</p> </div>
                <div class="msgm"><strong>${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text}</div>
          </div>            
        `;
        }
    }

}


