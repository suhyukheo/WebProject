import SearchData from './SearchData.js';
export default class Search{
  constructor(){
  }
  HTML(){
    // const page = document.createElement('div')
    // page.className='main dash'
    // page.innerText ='dash'
    return `<div class= main>
              About
             <button id='dash_btn'></button>
            </div> `
  }
  EVENT(){
    let Data = new SearchData()
    console.log(Data.classification)
    document.querySelector('#dash_btn').addEventListener('click',(e)=>{
      main.innerHTML = ''
    })
  }
}