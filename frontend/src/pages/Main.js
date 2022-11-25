export default class Main{
  constructor(){
  }
  HTML(){
    return `
    <div class='main'>
    <div class='main_head'>
      <div class='text_box'>
        <div id="title">
          <h1></h1>
        </div>
       </div>
       <div id='back_btn' class='back_btn'><i class="fa-solid fa-arrow-down fa-5x"></i></div>
    </div>
    <div class='main_body'>
     <div class='info_title'>
      <h2>공공데이터터 포털 API를 활용한</h2>
      <h2> 2000여가지의 레시피 검색 시스템.</h2>
     </div>
     <div class='info_body'>
      <div class='info'>
       <img src='../public/background/search_icon.png'></img>
       <div class='info_text'>
        <h3>검색 페이지</h3>
        <p>맞춤 레시피 추천</p>
        <p>태그를 통한 검색기능</p>
        <p>디테일한 레시피</p>
       </div>
      </div>
      <div class='info'>
       <img src='../public/background/detaile_icon.png'></img>
       <div class='info_text'>
        <h3>디테일 페이지</h3>
        <p>조리과정 설명</p>
        <p>조리과정 이미지 제공</p>
        <p>정확한 영양성분 표시</p>
       </div>
      </div>
      <div class='info'>
       <img src='../public/background/storage_icon.png'></img>
       <div class='info_text'>
       <h3>나만의 냉장고</h3>
       <p>재료 저장</p>
       <p>재료에 맞는 레시피 추천</p>
       <p>유통기한 표기</p>
       </div>
      </div>
     </div>
    </div>
    <div class='main_foot'></div>
    </div> 
    `
  }
  EVENT(){

    let btn_ani = () =>{
      let back_move = document.querySelector('#back_btn')
      let user_heigth = window.innerHeight
      back_move.classList.add('back_btn_event')
      back_move.addEventListener('click',()=>{
        window.scrollTo({ top: `${user_heigth}`, left: 0, behavior: 'smooth' });
      })
    }

    let word_event = () =>{
      const content = "Racipe \n  and \n Recommendation \n for your life .";
      const text = document.querySelector("#title h1");
      text.innerHTML = ''
      const speed = 200
      for(let i=0;i<content.length;i++){
        setTimeout(()=>{
          if(i==content.length-1){
            btn_ani()
          }
          let txt = content[i]
          text.innerHTML += txt=== "\n" ? "<br/>": txt;
        },speed*i)
      }
    }


    let main_start_event = () =>{
      let App = document.querySelector('.App')
      let nav = document.querySelector('.nav_container')
      nav.style.background='none'

      let random = parseInt(Math.random()*4)+1
      let main = document.querySelector('.main_head')
      main.style.backgroundImage= `url('../public/background/background_img${random}.jpg')`
      word_event()
    }
    main_start_event()
  }
}

  

