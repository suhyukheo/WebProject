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
                   <img src="./src/background/load_img.png" width:200px;>
                    <p>예시..</p>
                   </div>
                   <div class='content'>
                   <img src="./src/background/load_img.png" width:200px;>
                    <p>예시..</p>
                   </div>
                   <div class='content'>
                   <img src="./src/background/load_img.png" width:200px;>
                    <p>예시..</p>
                   </div>
                   <div class='content'>
                   <img src="./src/background/load_img.png" width:200px;>
                    <p>예시..</p>
                   </div>
                   <div class='content'>
                   <img src="./src/background/load_img.png" width:200px;>
                    <p>예시..</p>
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



    //검색창 버튼에 검색이벤트 추가
    search_btn.addEventListener('click',()=>{
      search_event()
    })

    
    //재료에 맞는 검색이벤트
    let search_event = (start = 0,end =1000 ) =>{
      let contents =''
      let container = document.querySelector('.content_stage_container')
      if(search_input.value != ''){
        fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/${start}/${end}/RCP_PARTS_DTLS=${search_input.value}`)
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
              button_event(json.COOKRCP01.total_count)
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
    

    //시작할때 이벤트
    let start_event = () =>{
      let random_start = parseInt(Math.random()*990)
      search_event(random_start,random_start+10)
    } 

    start_event()
  }

}