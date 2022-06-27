let usuario;
let usuarioLog;
function checkLogin(){
    usuario=prompt('Usuario:');
    usuarioLog =
    {
        name: usuario
    }
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        usuarioLog
      );
      promise.then(searchMsg);
      promise.catch(loginError);
    }

function loginError(error){
    alert("Nome em uso, escolha outro nome.")
    checkLogin();
}

checkLogin();  
setInterval(checkOnline, 5000);


function checkOnline(){
    
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/status",
        usuarioLog
      );  
      promise.then(deucerto);
      promise.catch(naodeucerto);
}
function deucerto(){
    console.log("deu certo");
}
function naodeucerto(){
    console.log("deu certo");
}

function searchMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(loadMsg);
    promise.catch(errorMsg);
}
function errorMsg(error){
    console.log(error.response.status);
}


function loadMsg(resposta){
    
    let chat=document.querySelector(".chat");
    
    chat.innerHTML='';
    let answer=resposta.data;
    for( let i=0;i<answer.length;i++){
        
        if (answer[i].type =='status'){
            chat.innerHTML+=`<div class="msg status"><p>
            
            (${answer[i].time})&nbsp<span>${answer[i].from}</span>&nbsp${answer[i].text}
            </p></div>
        `
       }else if(answer[i].type =='message'){
            chat.innerHTML+=`
            <div class="msg"><p>
            (${answer[i].time})&nbsp<span>${answer[i].from}</span>&nbsppara&nbsp<span>${answer[i].to}</span>:${answer[i].text}
            </p></div>
        `
        }else if((answer[i].type =='private_message')&&usuario===answer[i].from){
            chat.innerHTML+=`
            <div class="msg reservada"> <p> 
            (${answer[i].time})&nbsp<span>${answer[i].from}</span>&nbspreservadamente&nbsppara&nbsp</span>:${answer[i].text}
            </p></div>
        `

        }}
    
    let msg = document.querySelectorAll(".msg")
    ultimaMsg = msg[msg.length-1]
    ultimaMsg.scrollIntoView();

}
setInterval(searchMsg, 3000)
function sendMsg(){
    let msg=document.querySelector(".caixaInput").value;
    let msgs={
        from: usuario,
        to: "Todos",
        text: msg,
        type: "message"
    }
    document.querySelector(".caixaInput").value='';
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/messages",
        msgs
      );
      promise.then(searchMsg);
      promise.catch(erroMsg);
}
function erroMsg(error){
    console.log(error.response.status);
    alert("Usuario deslogado, entre novamente");
    window.location.reload();
}