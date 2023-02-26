const listaTarefas = [];
const form = document.getElementById("formulario");
const inputCampo = document.querySelector(".input-tarefa");
const ulLista = document.getElementById("lista-de-tarefas");
const itemLocal = localStorage.getItem("listaDeItens");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    pegarValores();
    mostrarItens();
    inputCampo.focus()
   
    
})

function atualizar(){
    localStorage.setItem("listaDeItens", JSON.stringify(listaTarefas));
}



if(itemLocal){
    listaTarefas = JSON.parse(itemLocal);
    mostrarItens()
}else{
    listaTarefas = [];
}

function pegarValores(){
    const valor = inputCampo.value;
    
    console.log(listaTarefas)

    const duplicado = listaTarefas.some((item) => 
        item.tarefa.toUpperCase() === valor.toUpperCase()
    )

    if(duplicado){
        alert("Item já existe");
    }else{
        listaTarefas.push({tarefa: valor});
    }

    inputCampo.value = "";

}

function mostrarItens(){
    ulLista.innerHTML = "";
    listaTarefas.forEach((elemento, index) => {
        ulLista.innerHTML += `
        <li class="lista-itens" data-value="${index}">
            <div class="bloco-tarefas">
             <span>${elemento.tarefa}</span>
              <button class="botao-excluir">apagar</button>  
            </div>
        </li>`
    })

    
    
    const botaoExcluir = document.querySelectorAll(".botao-excluir");

    botaoExcluir.forEach(elemento => {
        elemento.addEventListener("click", (evento) => {
            item = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaTarefas.splice(item,1)
            mostrarItens()
        })
    })

        
    atualizar()
}


