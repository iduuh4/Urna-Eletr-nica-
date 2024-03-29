// variaveis de controle
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span')
let descGeral = document.querySelector('.d-1-4 ')
let aviso = document.querySelector('.divisao-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

// variaveis de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

// etapas da tela da urna
function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    for(let i=0;i<etapa.numeros;i++){
        if(i===0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
    }


    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo;
    descGeral.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

// função para atualizar a interface do candidato
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        cargo.innerHTML = etapa.titulo;
        descGeral.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}<br> `
        aviso.style.display = 'block';
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda} </div>`;
            }else{
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda} </div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descGeral.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

// botoes do teclado da urna
function clicou(n){
    let elementoNumero = document.querySelector('.numero.pisca');
    if(elementoNumero !== null){
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca')
        if(elementoNumero.nextElementSibling !== null){
            elementoNumero.nextElementSibling.classList.add('pisca') 
        } else{
            atualizaInterface();
        }
    }
}

function branco(){
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descGeral.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige(){
    comecarEtapa()
}

function confirma(){
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false;

    if(votoBranco === true ){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto:'branco'
        });
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto:numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){  
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM!</div>';
        }
    }
}

comecarEtapa()
