import SearchData from './SearchData.js';
export default class Search{
  constructor(){
  }
  HTML(){
    return `<div class='search'>
               <div class='search_box'>
               <h5>레시피 그리고 추천..</h5>
               <div class='search_box_input'>
               <input id='search_input' type='text' placeholder='재료명 검색..' autocomplete='off'></input>
               <div class='icon' id='btn'><i class="fa-solid fa-magnifying-glass fa-1.5x"></i></div>
               </div>
               <p>태그 사용하기</p>
               </div>
               <div class='search_box2'>
               <div class='search_container'>
                 <h1>오늘의 추천 레시피</h1>
                 <div class='content_stage'>
                   <button id='content_stage_btn_l' class='btn'><i class="fa-solid fa-arrow-left"></i></button>
                   <button id='content_stage_btn_r' class='btn'><i class="fa-solid fa-arrow-right" fa-1.5></i></button>
                   <div class='content_stage_container'>
                      <div class='content'>
                      <img src="../public/background/load_img.png" width:200px;>
                      <p>예시..</p>
                      </div>
                      <div class='content'>
                      <img src="../public/background/load_img.png" width:200px;>
                      <p>예시..</p>
                      </div>
                      <div class='content'>
                       <img src="../public/background/load_img.png" width:200px;>
                       <p>예시..</p>
                     </div>
                     <div class='content'>
                       <img src="../public/background/load_img.png" width:200px;>
                       <p>예시..</p>
                     </div>
                     <div class='content'>
                       <img src="../public/background/load_img.png" width:200px;>
                       <p>예시..</p>
                     </div>
                   </div>
                 </div>
                 <h1>태그로 레시피 찾기</h1>
                 <div class='search_box2_tag'>
                  <div class='tag_bar'>
                   <div class='tag' data-id='육류'>육류</div>
                   <div class='tag' data-id='해산물'>해산물</div>
                   <div class='tag' data-id='채소'>채소</div>
                   <div class='tag' data-id='과일'>과일</div>
                   <div class='tag' data-id='버섯'>버섯</div>
                   <div class='tag' data-id='곡류'>곡류</div>
                  </div>
                  <div class='sub_tag_bar'> </div>
                  <div class='tag_container'>

                  </div>

                 </div>
                 </div>
               </div>
               </div>
            </div> `
  }
  EVENT(){

    const Data = new SearchData()
    const tag_array = Data.classification
    const tag_all = Data.all_tag

    let search_input = document.querySelector('#search_input')
    let search_btn = document.querySelector('#btn')

    /**input 태그의 이벤트 넣기*/

    search_input.addEventListener('input',()=>{
      let user_input = search_input.value
      let result=[]
      if(user_input !==''){
        for(let i=0; i<tag_all.length ; i++){
          if(tag_all[i].includes(user_input)){
            result.push(tag_all[i])
          }
        }
      }
    })

  

    
    //재료에 맞는 검색이벤트 
    let search_event = (start = 0,end =1000, first=0) =>{
      let contents =''
      let container = document.querySelector('.content_stage_container')
      if((search_input.value !== '')){
        fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/${start}/${end}/RCP_PARTS_DTLS=${search_input.value}`)
            .then((res) => {
              return res.json(); //Promise 반환
            }).then((json) => {
              let racipe = json.COOKRCP01.row
              for(let i=0 ; i<racipe.length ; i++){
                if(racipe[i].ATT_FILE_NO_MAIN !== ''){
                  contents +=`<div class='content'>
                  <img src="${racipe[i].ATT_FILE_NO_MAIN}" width:200px; alt='죄송합니다.'>
                   <p>${racipe[i].RCP_NM}</p>
                  </div>` 
                }
                else{
                  contents +=`<div class='content'>
                  <img src="${racipe[i].ATT_FILE_NO_MK}" width:200px; alt='죄송합니다.'>
                   <p>${racipe[i].RCP_NM}</p>
                  </div>` 
                }
              }
              container.innerHTML=contents
              //버튼이벤트에 레시피 총 갯수 넘기기
              button_event(json.COOKRCP01.total_count)
              contnent_click_event()
            }) 
         }
        else{
          fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/${start}/${end}`)
          .then((res) => {
            return res.json(); //Promise 반환
          }).then((json) => {
            let racipe = json.COOKRCP01.row
            console.log(racipe)
            for(let i=0 ; i<racipe.length ; i++){
              contents +=`<div class='content'>
              <img src="${racipe[i].ATT_FILE_NO_MAIN}" width:200px;>
               <p>${racipe[i].RCP_NM}</p>
              </div>` 
            }
            container.innerHTML=contents
            //버튼이벤트에 레시피 총 갯수 넘기기 
            button_event(10)
          })
        }
      }
    

    //container에 붙은 버튼 이벤트
    let button_event = (total) =>{
      let count = 0
      let content_pos = 0
      let btn_l = document.querySelector('#content_stage_btn_l')
      let btn_r = document.querySelector('#content_stage_btn_r')
      let container = document.querySelector('.content_stage_container')

      /**사용자가 버튼을 사용한뒤 다시 검색할 수 있으므로 */
      container.style.transform = `translateX(${content_pos}px)`


      btn_l.addEventListener('click',()=>{
        console.log('count',count,'pos',content_pos)
        if(count !== 0){
          count+=1
          content_pos +=250
          container.style.transform = `translateX(${content_pos}px)`
        }
        else{
          count = 0 
          content_pos = 0
          container.style.transform=`translateX(${content_pos}px)`
        }
      })
      btn_r.addEventListener('click',()=>{
        console.log('count',count,'pos',content_pos,5+-(total))
        if(5+-(total) !== count){
          count -=1
          content_pos -= 250
          container.style.transform=`translateX(${content_pos}px)`
        }
        else{
          count = 0
          content_pos = 0 
          container.style.transform=`translateX(${content_pos}px)`
        }
      })
    }
    
    /**만들거 : 서브버튼마다 태그 컨테이너로 이동후 검색되는 시스템을 만들어야함 */
    let tag_event = () =>{
      let tag_bar = document.querySelectorAll('.tag_bar .tag')
      let sub_tag_bar = document.querySelector('.sub_tag_bar')
      for(let i=0 ; i<tag_bar.length ;i++){
        tag_bar[i].addEventListener('click',(e)=>{
          let tag_contents =''
          for(let i=0;i<tag_array[`${e.currentTarget.dataset.id}`].length ;i++){
            tag_contents +=`<div class='sub_tag'>${tag_array[`${e.currentTarget.dataset.id}`][i]}</div>`
          }
          sub_tag_bar.innerHTML=''
          sub_tag_bar.innerHTML = tag_contents
        })
      }
      
    } 
    
    /**컨텐츠에 클릭이벤트 추가 */
    let contnent_click_event = () =>{
      let container = document.querySelectorAll('.content')
      let search_box2 = document.querySelector('.search_box2')
      for(let i=0 ; i< container.length ;i++){
        container[i].addEventListener('click',()=>{
          
        })
      }
    }
    

    //시작할때 이벤트
    let start_event = () =>{
      let random_start = parseInt(Math.random()*990)
      search_event(random_start,random_start+10,1)
       //검색창 버튼에 검색이벤트 , 엔터이벤트 추가 
      search_btn.addEventListener('click',()=>{
        search_event()
      })
      search_input.addEventListener('keydown',(event)=>{
        if( event.keyCode == 13){
          search_event()
        }
      })
      tag_event()
    } 

    start_event()
  }

}