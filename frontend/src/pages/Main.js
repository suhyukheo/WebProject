export default class Main{
  constructor(){
  }
  HTML(){
    return `<div class='main'>
    </div> `
  }
  EVENT(){
    let randombackground = () =>{
      let main = document.querySelector('.main')
      let random = parseInt(Math.random()*4)+1
      main.style.backgroundImage = `url(../src/background/background_img${random}.jpg)`
    }
    let main_start_event = () =>{
      randombackground()
    }
    main_start_event()
  }
}





  //문제 없음

  // for(let i=0; i<10 ;i++){
  //   let page_main_div  =document.createElement('div')
  //   page_main_div.className ='a'
  //   let page_main_div_p = document.createElement('p')
  //   page_main_div_p.innerText =`ex${i}`
  //   page_main_div.appendChild(page_main_div_p)
  //   page.appendChild(page_main_div)
  // }

  

