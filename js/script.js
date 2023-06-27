const body = document.querySelector('body')
const game = document.querySelector('.game')
const count = document.querySelector('h1')
const reset = document.querySelector('#reset')
//Constantes dos personagens 
const ash = document.querySelector('#ash')
const charmander = document.querySelector('#charmander')
const pikachu = document.querySelector('#pikachu')
const zubat = document.querySelector('#zubat')

let findChr = false
let findZbt = false
let findPks = false

function clearCharactersAndGameOver(){
  zubat.style.display = 'none'
  pikachu.style.display = 'none'
  ash.style.display = 'none'
  charmander.style.display = 'none'
  reset.style.display = 'block' 
  count.textContent = ""
}

reset.addEventListener('click',()=>{
  window.location.reload()
  reset.style.display = 'none'
})

function winGamer(){
  if(findChr && findPks && findZbt){
    clearCharactersAndGameOver()
    const timeOut= setTimeout(()=>{
      game.style.backgroundImage = "url('../assets/winner.jpg')"
      clearInterval(interval)
      clearTimeout(timeOut)
      audio.pause()
    },400)
  }
}

//Controles do audio
const audio = document.querySelector('audio')
audio.volume = 0.1
const musicControl = document.querySelector('.music-control')
musicControl.addEventListener('click', (event) =>{
  
  event.stopPropagation()
  let icon = event.target.src
  if (icon.includes("on.png") == true){
    musicControl.src = "../assets/icons/off.png"
    audio.pause()
  }else{
    musicControl.src = "../assets/icons/on.png"
    audio.play()
  }
})
//contador
let currentCount = 60 
const interval = setInterval(()=>{
  if(currentCount <= 0){
    game.style.backgroundImage = "url('../assets/game-over.jpg')"    
    clearCharactersAndGameOver()
    clearInterval(interval)
    return
  }

  currentCount--
  count.textContent = currentCount
},1000)

//controle dos personagens 
function getRightPosition(){ //retorna posição em relação a borda direita 
  return parseInt(ash.style.right) || 2;
  
}
function getTopPosition(){ //retorna posição em relação ao topo
  return parseInt(ash.style.top) || 2;
}
//encontrando os pokemons 
function verifyLookPokemon(to){
  winGamer()

const pokemonRightPosition = to === 'ArrowLeft' ? `${getRightPosition() - 64}px` : `${getRightPosition() + 64}px` 
    
  if (findChr){
    const newTopPosition = to = 'ArrowUp' ? `${getTopPosition() + 8}px` : `${getTopPosition() - 8}px`
    charmander.style.right = pokemonRightPosition
    charmander.style.top = newTopPosition
  } 
  if (findPks){
    const newTopPosition = to = 'ArrowUp' ? `${getTopPosition() + 36}px` : `${getTopPosition() - 36}px`
    pikachu.style.right = pokemonRightPosition
    pikachu.style.top = newTopPosition
  }  
  if (findZbt){
    const newTopPosition = to = 'ArrowUp' ? `${getTopPosition() + 72}px` : `${getTopPosition() - 72}px`
    zubat.style.right = pokemonRightPosition
    zubat.style.top = newTopPosition
  }   

  if((getTopPosition() >= 2 && getTopPosition() <= 98) && (getRightPosition() >= 130 && getRightPosition() <= 216)){
    charmander.style.display = "block"
    findChr = true
    return
  }
  if((getTopPosition() >= 474 && getTopPosition() <= 594) && (getRightPosition() <= 138 && getRightPosition() >= 42)){
    zubat.style.display = "block"
    findZbt = true
    return
  }
  if((getTopPosition() >= 266 && getTopPosition() <= 394) && (getRightPosition() >= 546 && getRightPosition() <= 650)){
    pikachu.style.display = "block"
    findPks = true
    return
  }
  
}

body.addEventListener('keydown',(event)=>{
  event.stopPropagation()
  
  switch (event.code) {
    
    case "ArrowLeft":
      if(getRightPosition() < 770){
        ash.style.right = `${getRightPosition() + 8}px`
        ash.src = '../assets/left.png'        
      }
      
    break;
    
    case "ArrowRight":
      if(getRightPosition() > 8){
        ash.style.right = `${getRightPosition() - 8}px`
        ash.src = '../assets/right.png'        
      }
            
    break;
    
    case "ArrowDown":
      if(getTopPosition() < 620){
        ash.style.top = `${getTopPosition() + 8}px`
        ash.src = '../assets/front.png'       
      }  
      
    break;
    
    case "ArrowUp":
      if(getTopPosition() > 8){
        ash.style.top = `${getTopPosition() - 8}px`
        ash.src = '../assets/back.png'        
      }      
      
    break;
  
    default:
      break;
  }

  verifyLookPokemon(event.code);
})

