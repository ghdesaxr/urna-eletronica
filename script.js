let seuVotoPara = document.querySelector('.sub_screen_1_1 span');
let cargo = document.querySelector('.sub_screen_1_2 span');
let descricao = document.querySelector('.sub_screen_1_4');
let aviso = document.querySelector('.sub_screen_2');
let lateral = document.querySelector('.sub_screen_1_right');
let numeros = document.querySelector('.sub_screen_1_3');

let etapaAtual = 0;
let numero ='';
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '' ;
    votoBranco = false;
    numero = '';
    
    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="square piscar"></div>';
        } else {
        numeroHtml += '<div class="square"></div>';
    }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface () {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length >0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){ 
                fotosHtml += ` <div class="right_img small">
                <img src="${candidato.fotos[i].url}" alt="${candidato.fotos[i].cargo}">${candidato.fotos[i].legenda}</div>`;  
            }
            else {
                fotosHtml += ` <div class="right_img">
                <img src="${candidato.fotos[i].url}" alt="${candidato.fotos[i].cargo}">${candidato.fotos[i].legenda}</div>`;
        }
        }   
        lateral.innerHTML = fotosHtml;
     } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="warning piscar">VOTO NULO</div>';



    }
}

function clicou(n) {
    let elNumero = document.querySelector('.square.piscar');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('piscar');
        if(elNumero.nextElementSibling !== null) {
         elNumero.nextElementSibling.classList.add('piscar');
        } else {
            atualizaInterface();
        }
    }   
}
function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="warning piscar">VOTO EM BRANCO</div>';
    } else {
        alert("Para VOTAR EM BRANCO, n??o dever?? selecionar nenhum numero. Pressione CORRIGE para reiniciar a vota????o!");
    }

}
function corrige() {
    comecarEtapa();


}
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        console.log('Confirmado como BRANCO');
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log('Confirmado como '+numero);
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {

            seuVotoPara.style.display = 'none';
            cargo.innerHTML = '';
            aviso.style.display = 'none';
            lateral.innerHTML = '';
            numeros.innerHTML = '';
            descricao.innerHTML = '<div class="warning_fim piscar">FIM!</div>';

            console.log("FIM!");

        }
    }

}

comecarEtapa();