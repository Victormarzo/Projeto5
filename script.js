let usuario;
function checkLogin(){
    usuario=prompt('Usuario:');
    let usuarioLog =
    {
        name: usuario
    }
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants ",
        usuarioLog
      );
      promise.then(searchMsg,setInterval(checkOnline, 5000));
      promise.catch(erroNome);
    }

function erroNome(error){
    alert("Nome em uso, escolha outro nome.")
    checkLogin();
}
checkLogin();

function alertai(){
    alert("Da sim po");
}



function checkOnline(){
    let usuarioOnline =
    {
        name: usuario
    }
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants ",
        usuarioOnline
      );     
}

function searchMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(loadMsg)
}
setInterval(searchMsg, 10000)

function loadMsg(resposta){
    console.log('foi');
    let chat=document.querySelector(".chat");
    
    chat.innerHTML='';
    if (resposta.status === 200) {
        console.log("Deuuu boooom");
      }
    let answer=resposta.data;
    for( let i=0;i<answer.length;i++){
        
        if (answer[i].type =='status'){
            chat.innerHTML+=`<div class="msg status"><p>
            
            (${answer[i].time})&nbsp${answer[i].from}&nbsp${answer[i].text}
            </p></div>
        
        
        
        `
       }else if(answer[i].type =='message'){
            chat.innerHTML+=`
            <div class="msg"><p>
            (${answer[i].time})&nbsp${answer[i].from}&nbsppara&nbsp${answer[i].to}:${answer[i].text}
            </p></div>

        `
        }else if((answer[i].type =='private_message')&&usuario===answer[i].from){
            chat.innerHTML+=`
            <div class="msg reservada"> <p> 
            (${answer[i].time})&nbsp${answer[i].from}&nbspreservadamente&nbsppara&nbsp${answer[i].to}:${answer[i].text}
            </p></div>
        `

        }}
    
    let msg = document.querySelectorAll(".msg")
    ultimaMsg = msg[msg.length-1]
    ultimaMsg.scrollIntoView()

    }
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
    alert("Usuario deslogado, entre novamente")
    window.location.reload()
}