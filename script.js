const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBotao = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBotao = document.querySelector('#start-pause span')
const iniciarOuPausarBotaoIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 3000
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
     if (musica.paused) {
          musica.play()
          musica.volume = 0.1
     } else {
          musica.pause()
     }
})

focoBotao.addEventListener('click', () => {
     tempoDecorridoEmSegundos = 3000
     alterarContexto('foco')
     focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
     tempoDecorridoEmSegundos = 300
     alterarContexto('descanso-curto')
     curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
     tempoDecorridoEmSegundos = 900
     alterarContexto('descanso-longo')
     longoBotao.classList.add('active')
})

function alterarContexto(contexto) {
     mostrarTempo()
     botoes.forEach((contexto) => {
          contexto.classList.remove('active')
     })

     html.setAttribute('data-contexto', contexto)
     banner.setAttribute('src', `/imagens/${contexto}.png`)
     switch (contexto) {
          case "foco":
               titulo.innerHTML = `Otimize sua produtividade,<br>
               <strong class="app__title-strong">mergulhe no que importa.</strong>`
               break;
          case "descanso-curto":
               titulo.innerHTML = `Que tal dar uma respirada?
               <strong class="app__title-strong">Faça uma pausa curta!`
               break;
          case "descanso-longo": 
               titulo.innerHTML = `Hora de voltar à superfície.
               <strong class="app__title-strong">Faça uma pausa longa`
               break;
          default:
               break;
     }
}

const contagemRegressiva = () => {
     if (tempoDecorridoEmSegundos <= 0) {
          //alert('Tempo finalizado!')
          zerar()
          return
     }
     tempoDecorridoEmSegundos -= 1
     mostrarTempo()
}

startPauseBotao.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
     if (intervaloId) {
          zerar()
          return
     }
     intervaloId = setInterval(contagemRegressiva, 1000)
     iniciarOuPausarBotao.textContent = "Pausar"
     iniciarOuPausarBotaoIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
     clearInterval(intervaloId)
     iniciarOuPausarBotao.textContent = "Começar"
     iniciarOuPausarBotaoIcone.setAttribute('src', `/imagens/play_arrow.png`)
     intervaloId = null
}

function mostrarTempo() {
     const tempo = new Date(tempoDecorridoEmSegundos * 1000)
     const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
     tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()