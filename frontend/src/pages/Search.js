import SearchData from './SearchData.js';
export default class Search{
  constructor(){
  }
  HTML(){
    return `<div class='search'>
               <div class='search_box'>
               <div class='search_box_input'>
                <input id='search_input' type='text' placeholder='재료명 검색..' autocomplete='off'></input>
                <div class='icon' id='btn'><i class="fa-solid fa-magnifying-glass fa-2x"></i>
               </div>
               <div class='search_box_input_ingredient_box'>
               </div>
               </div>
               </div>
               <div class='search_box2'>
               <div class='search_container'>
                 <h1 id='search_title'>오늘의 추천 레시피</h1>
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
                 <div class='search_box2_tag' id='tag'>
                  <div class='tag_bar'>
                  <div class='tag_bar_tag_container'>
                   <div class='tag' data-id='육류'>육류</div>
                   <div class='tag' data-id='해산물'>해산물</div>
                   <div class='tag' data-id='채소'>채소</div>
                   <div class='tag' data-id='과일'>과일</div>
                   <div class='tag' data-id='버섯'>버섯</div>
                   <div class='tag' data-id='곡류'>곡류</div>
                   </div>
                   <div class='import_btn_container'>
                     <div id='import_btn'>냉장고 속 재료 가져오기</div>
                   </div>
                  </div>
                  <div class='sub_tag_bar'> </div>
                  <div class='tag_container'>
                  </div>
                  <div id='tag_search_btn'>검색</div>
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
    let search_container_info = null

    /**input 태그의 이벤트 넣기*/
    let input_search_event = () =>{
      let search_user_input =document.querySelector('#search_input')
      let search_box_input_ingredient_box = document.querySelector('.search_box_input_ingredient_box')
      let result = []
      let contents =''
      //여기부터 다시
      search_user_input.addEventListener('focus',()=>{
        search_box_input_ingredient_box.classList.add('onoff')
        search_user_input.addEventListener('input',()=>{
        search_box_input_ingredient_box.innerHTML =''
         contents=''
         result =[]
         if(search_user_input.value !==''){
           for(let i=0; i<tag_all.length ; i++){
             if(tag_all[i].includes(search_user_input.value)){
               result.push(tag_all[i])
             }
           }
         }
         for(let i=0 ; i<result.length ;i++){
          contents +=`<div class='ingredient'>${result[i]}</div>`
         }
        search_box_input_ingredient_box.innerHTML = contents
         let ingredient_tags = document.querySelectorAll('.ingredient')
         for(let i=0 ;i< ingredient_tags.length ;i++){
          ingredient_tags[i].addEventListener('mouseover',()=>{
             search_user_input.value =ingredient_tags[i].innerText
           })
         }
        })
      })
      search_user_input.addEventListener('focusout',()=>{
      search_box_input_ingredient_box.classList.remove('onoff')
      })
    }
   
    let local_save_info = (info) =>{
        let new_info = JSON.stringify(info)
        localStorage.setItem('search_item',new_info)
    }

    //재료에 맞는 검색이벤트 
    let search_event = (start = 0,end =1000, first=0 , value = search_input.value) =>{
      let contents =''
      let container = document.querySelector('.content_stage_container')
      let search_title = document.querySelector('#search_title')
      console.log(value)
      //벨류값이 없을 경우 거르기
      if((value !== '')){
        fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/${start}/${end}/RCP_PARTS_DTLS=${value}`)
            .then((res) => {
              return res.json(); //Promise 반환
            }).then((json) => {
              let recipe = json.COOKRCP01.row
              search_container_info = recipe
              search_title.innerText = value + ' 관련 레시피'
              //레시피가 없을 경우 거르기
              console.log(json.COOKRCP01.RESULT.CODE)
              if(json.COOKRCP01.RESULT.CODE!='INFO-200'){
                for(let i=0 ; i<recipe.length ; i++){
                  if(recipe[i].ATT_FILE_NO_MAIN !== ''){
                    contents +=`
                    <div class='content'>
                    <a href="/Detail" class="data_link">
                     <img src="${recipe[i].ATT_FILE_NO_MAIN}" width:200px; alt='${recipe[i].RCP_NM}'>
                     <p>${recipe[i].RCP_NM}</p>
                     </a>
                    </div>
                    ` 
                  }
                  else{
                    contents +=`
                    <div class='content'>
                    <a href="/Detail" class="data_link">
                     <img src="${recipe[i].ATT_FILE_NO_MAIN}" width:200px; alt='${recipe[i].RCP_NM}'>
                     <p>${recipe[i].RCP_NM}</p>
                     </a>
                    </div>
                    `
                  }
                }
                container.innerHTML=contents
                //버튼이벤트에 레시피 총 갯수 넘기기
                search_button_event(json.COOKRCP01.total_count)
                contnent_click_event()
              }
              else{
                console.log(json.COOKRCP01.total_count)
                contents =`<div class='no_content'>
                 <img src="../public/icons/not_found_icon.png">
                 <div class="no_content_text">
                   <p class="title">${value}에 관한 레시피가 없습니다!</p>
                   <p>태그를 통해서 찾아보세요!</p>
                 </div>
                </div>`
                container.innerHTML=contents
                search_button_event(5)
              }
            }) 
         }
        else if(first==1){
          fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/${start}/${end}`)
          .then((res) => {
            return res.json(); //Promise 반환
          }).then((json) => {
            let recipe = json.COOKRCP01.row
            search_container_info = recipe
            search_title.innerText = '오늘의 추천 레시피'
            console.log('시작')
            for(let i=0 ; i<recipe.length ; i++){
              contents +=`
              <div class='content'>
              <a href="/Detail" class="data_link">
               <img src="${recipe[i].ATT_FILE_NO_MAIN}" width:200px; alt='${recipe[i].RCP_NM}'>
               <p>${recipe[i].RCP_NM}</p>
               </a>
              </div>
              ` 
            }
            container.innerHTML=contents
            //버튼이벤트에 레시피 총 갯수 넘기기 
            search_button_event(10)
            contnent_click_event()
          })
        }
      }
    
    //<-  , -> 버튼 이벤트
    let search_button_event = (total = 0) =>{
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
        if(total<5){
          container.style.transform=`translateX(0px)`
        }
        else if(5-(total) !== count){
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
    
    /**컨텐츠에 클릭이벤트 추가 
     * 이동자체는 App.js에서 일괄처리함
    */
    let contnent_click_event = () =>{
      let container = document.querySelectorAll('.content')
      for(let i=0 ; i< container.length ;i++){
        container[i].addEventListener('click',()=>{
          local_save_info(search_container_info[i])
        })
      }
    }

    /**태그 만들기 서브 태그만들기 서브태그에 이벤트 추가. */
    let tag_event = () =>{
      let tag_bar = document.querySelectorAll('.tag_bar .tag')
      let sub_tag_bar = document.querySelector('.sub_tag_bar')
      let tag_container =document.querySelector('.tag_container')
      let import_btn = document.querySelector('#import_btn')
      
      //유저 데이터 불러와서 태그화
      let user_storage_import_btn_event = () =>{
        import_btn.addEventListener('click',()=>{
          let user_storage =import_user_storage()
          let contents =''
          for(let i=0 ; i < user_storage.length ; i++){
            if(user_storage[i].tf ==='true'){
              contents +=`<div class='tag_container_tag'><p>${user_storage[i].name}</p><i class="fa-solid fa-xmark"></i></div>` 
            }
          }
          tag_container.innerHTML =''
          tag_container.innerHTML = contents
          tag_container_tag_remove_event()
        })
      }
      //메인 태그 눌릴시 서브태그 만들기
      let append_sub_tag =() =>{
        for(let i=0 ; i<tag_bar.length ;i++){
          tag_bar[i].addEventListener('click',(e)=>{
            let tag_contents =''
            for(let i=0;i<tag_array[`${e.currentTarget.dataset.id}`].length ;i++){
              tag_contents +=`<div class='sub_tag'>${tag_array[`${e.currentTarget.dataset.id}`][i]}</div>`
            }
            sub_tag_bar.innerHTML=''
            sub_tag_bar.innerHTML = tag_contents
            sub_tag_click_event_move_to_tag_container()
          })
        }
      }
      //서브태그 이벤트 
      let sub_tag_click_event_move_to_tag_container = () =>{
        let sub_tags = document.querySelectorAll('.sub_tag')
        for(let i=0; i< sub_tags.length ;i++){
          sub_tags[i].addEventListener('click',(e)=>{
            if(tag_container.childElementCount <=5){
              if(!tag_container.innerText.includes(e.currentTarget.innerText)){
                tag_container.innerHTML += `<div class='tag_container_tag'><p>${e.currentTarget.innerText}</p><i class="fa-solid fa-xmark"></i></div>`
              }
            }
            tag_container_tag_remove_event()
          })
        }
      }
      //서브태그 이벤트
      let tag_container_tag_remove_event = () =>{
        let tag_container =document.querySelector('.tag_container')
        let tag_container_tags = [...tag_container.children]
        let tag_container_html = ''
        for(let i=0; i< tag_container_tags.length ;i++){
          tag_container_tags[i].addEventListener('click',(e)=>{
            if(e.target.parentNode ==e.currentTarget){
               tag_container_tags.splice(tag_container_tags.indexOf(e.currentTarget),1)
            tag_container.innerHTML =''
            tag_container_html =''
            for(let i=0 ; i<tag_container_tags.length ; i++){
              tag_container_html = tag_container_html+`${tag_container_tags[i].outerHTML}`
            }
            tag_container.innerHTML = tag_container_html
            tag_container_tag_remove_event()
            }
          })
        }
      }
      let tag_btn_search_event = () =>{
        let tag_search_button = document.querySelector('#tag_search_btn')
        tag_search_button.addEventListener('click',() => {
          let search_title = document.querySelector('#search_title')
          let tag_container_tags=document.querySelectorAll('.tag_container_tag p')
          let tag_title =''
          let contents =''
          let container = document.querySelector('.content_stage_container')
            console.log(tag_container_tags)
            if(tag_container_tags.length>0){
              for(let i=0; i<tag_container_tags.length ;i++){
                if(i==tag_container_tags.length-1){ 
                  tag_title +=`${tag_container_tags[i].innerText} 관련 레시피`
                }
                else{
                  tag_title +=`${tag_container_tags[i].innerText},`
                }
              }
              search_title.innerText = tag_title
              fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/1/100/RCP_PARTS_DTLS=${tag_container_tags[0].innerText}`)
              .then((res) => {
               return res.json(); //Promise 반환
             }).then((json) => {
              if(json.COOKRCP01.RESULT.CODE != 'INFO-200'){
                let recipes = json.COOKRCP01.row
                let search_tags = []
                for(let i of tag_container_tags){
                  search_tags.push(i.innerText)
                }
                let result=[]
                  for(let recipe of recipes){
                    let RCP_PARTS_DTLS =recipe['RCP_PARTS_DTLS']
                    let rcp =[]
                    for(let i of search_tags){
                      if(RCP_PARTS_DTLS.includes(i)){
                        rcp.push(1)
                      }
                      else{
                        continue
                      }
                    }
                    if(rcp.length == search_tags.length){
                      result.push(recipe)
                    }
                }
                if(result.length>=1){
                  search_container_info = result
                  contents =''
                  for(let recipe of result){
                  contents+=`
                      <div class='content'>
                       <a href="/Detail" class="data_link">
                       <img src="${recipe.ATT_FILE_NO_MAIN}" width:200px; alt='${recipe.RCP_NM}'>
                       <p>${recipe.RCP_NM}</p>
                       </a>
                      </div>
                      ` 
                  }
                  container.innerHTML =''
                  container.innerHTML = contents
                  search_button_event(result.length)
                  contnent_click_event()
                }
                else{
                  contents = ''
                  contents =`<div class='no_content'>
                <h1>죄송합니다 찾으시는 레시피가 없습니다.</h1>
                <p>태그를 사용해보세요</p>
                </div>`
                  container.innerHTML =''
                  container.innerHTML = contents
                  search_button_event(0)
                }
              }
             }) 
            }
            else{
              
            }
           
        })
      }

      append_sub_tag()
      tag_btn_search_event()
      user_storage_import_btn_event()
    }
    
    let import_user_storage = () =>{
       let user_storage = localStorage.getItem('user_storage')
       user_storage = JSON.parse(user_storage)
       return user_storage
    }


    //시작할때 이벤트
    let start_event = () =>{
      let search_box = document.querySelector('.search_box')
      let random = parseInt(Math.random()*4)+1
      let random_start = parseInt(Math.random()*990)
      let search_box_input_ingredient_box = document.querySelector('.search_box_input_ingredient_box')
      search_box.style.backgroundImage= `url('../public/background/background_img${random}.jpg')`
      search_box.style.backgroundSize='cover'
      let user_storage = import_user_storage()
      let new_user_stroge = []
      let nav_container = document.querySelector('.nav_container')
      nav_container.classList.remove('navcolor_dark')
      for(let i=0 ; i<user_storage.length ;i++){
        if(user_storage[i].tf == 'true'){
          new_user_stroge.push(user_storage[i])
        }
        else continue
      }
      let user_random = parseInt(Math.random()*new_user_stroge.length)
      if(new_user_stroge.length>=1){
        search_event(0,100,0,new_user_stroge[user_random].name)
      }
      else{
        search_event(random_start,random_start+10,1)
      }
       //검색창 버튼에 검색이벤트 , 엔터이벤트 추가 
      search_btn.addEventListener('click',()=>{
        search_event()
      })
      search_input.addEventListener('keydown',(event)=>{
        if( event.keyCode == 13){
          search_event()
          search_box_input_ingredient_box.classList.remove('onoff')
        }
      })
      tag_event()
      input_search_event()
    } 
    start_event()
  }

}