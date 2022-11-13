let main =document.querySelector('.App') 
export default class Storage{
  constructor(){
  }
  HTML(){
    // const page = document.createElement('div')
    // page.className='main dash'
    // page.innerText ='dash'
    return `<div class= main dash>Dash
            <button id='dash_btn'><p>클릭 예제</p></button>
            </div> `
  }
  EVENT(){
    document.querySelector('#dash_btn').addEventListener('click',(e)=>{
      main.innerHTML = `<div class= main dash>Click</div>`
    })
  }
}
