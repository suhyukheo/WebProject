import SearchData from './SearchData.js';
export default class Storage{
  constructor(){
  }
  HTML(){
    // const page = document.createElement('div')
    // page.className='main dash'
    // page.innerText ='dash'
    return `<div class= 'storage'>
             <div class='storage_container'>
              <div class='storage_left'>
                <div class='user_ingredient'>
                </div>
              </div>
               <div class='storage_right'>
                 <div class='storage_user_input_box'>
                   <img src='../public/background/storage.png'>
                   <div class='storage_user_input_and_btn'>
                   <input id='storage_input' placeholder="재료를 입력하세요" type="text" maxlength="15" autocomplete="off"><button id='storage_btn'><i class="fa-solid fa-check fa-1.5x"></i></button>
                   <div class='relation_tag_box'></div>
                   </div>
                   <div class='storage_tag_container'></div>
                 </div>
               </div>
             </div> 
            </div> `
  }
  EVENT(){
    let storage_input =document.querySelector('#storage_input') 
    let storage_btn = document.querySelector('#storage_btn')
    let content_box = document.querySelector('.user_ingredient')
    let storage_tag_container = document.querySelector('.storage_tag_container')
    let relation_tag_box = document.querySelector('.relation_tag_box')
    const Data = new SearchData()
    const tag_all = Data.all_tag
    /**input에 들어갈 이벤트 */
    let user_input_focus_event = () =>{
       let storage_user_input =document.querySelector('#storage_input')
       let result = []
       let contents =''
       //여기부터 다시
       storage_user_input.addEventListener('focus',()=>{
         relation_tag_box.classList.add('onoff')
         storage_user_input.addEventListener('input',()=>{
          relation_tag_box.innerHTML =''
          contents=''
          result =[]
          if(storage_user_input.value !==''){
            for(let i=0; i<tag_all.length ; i++){
              if(tag_all[i].includes(storage_user_input.value)){
                result.push(tag_all[i])
              }
            }
          }
          for(let i=0 ; i<result.length ;i++){
           contents +=`<div class='relation_tag'>${result[i]}</div>`
          }
          relation_tag_box.innerHTML = contents
          let relation_tags = document.querySelectorAll('.relation_tag')
          for(let i=0 ;i< relation_tags.length ;i++){
            relation_tags[i].addEventListener('mouseover',()=>{
              storage_user_input.value = relation_tags[i].innerText
            })
          }
         })
       })
       storage_user_input.addEventListener('focusout',()=>{
        relation_tag_box.classList.remove('onoff')
       })
    }

    /**페이지 로드시 첫 실행 유저데이터를*/
    let load_storage_items = () =>{
      if(localStorage.getItem('user_storage')!==null){
        let user_storage = localStorage.getItem('user_storage')
        user_storage = JSON.parse(user_storage)
        append_storage_items(user_storage)
      }
      else{
        let newarr = []
        newarr = JSON.stringify(newarr)
        localStorage.setItem('user_storage',newarr)
      }
    }


    /**받아온 유저 데이터를 기반으로 컨텐츠 박스에 컨텐츠를 추가한다. */
    let append_storage_items = (storage_list) =>{
      if(storage_list.length>0){
        let contents =''
        let tag_contents ='' 
        content_box.innerHTML = ''
        console.log(storage_list)
        for(let i=0; i<storage_list.length;i++){
          console.log(storage_list[i]['tf']) 
          if(storage_list[i]['tf']=='true'){
            contents +=`<div class='ingredient'><p>${storage_list[i].name}</p><button class='btn'>del</button></div>`
            tag_contents +=`<div class='tag'>${storage_list[i].name}</div>`
          }
          else{
            contents +=`<div class='ingredient false_tag'><p>${storage_list[i].name}</p><button class='btn'>del</button></div>`
          }
        }
        content_box.innerHTML=contents
        storage_tag_container.innerHTML = tag_contents
        items_remove_event()
      }
      else{
        content_box.innerHTML=''
        storage_tag_container.innerHTML =''
      }
    }


    /**추가된 컨텐츠의 삭제 버튼의 이벤트를 추가한다. */  
    let items_remove_event = () =>{
      let contents_list = document.querySelectorAll('.ingredient button')
      for(let i= 0 ;i<contents_list.length ;i++){
          contents_list[i].addEventListener('click',()=>{
          remove_user_data(i)
         })
      }
    }


    /**컨텐트 박스에 유저 데이터 추가한다. */
    let  push_user_data = () =>{
      let user_storage = localStorage.getItem('user_storage')
      user_storage = JSON.parse(user_storage)
      let result = 0
      let tf=null
      /** 중복 입력 가능시
       * user_storage.push({'name':`${storage_input.value}`,'date':``,'type':``})
        let new_user_stroge = JSON.stringify(user_storage)
        localStorage.setItem('user_storage',new_user_stroge)
        append_storage_items(user_storage) 
        */
      //중복 입력 배제
      for(let i=0; i<user_storage.length ;i++){
        if(user_storage[i]['name'] === storage_input.value || storage_input.value ==''){
          result = 1 
        }
      }
      if(result===0){
        if(tag_all.includes(storage_input.value)){
          tf =true
        }
        else{tf=false}
        user_storage.push({'name':`${storage_input.value}`,'date':``,'type':``,'tf':`${tf}`})
        let new_user_stroge = JSON.stringify(user_storage)
        localStorage.setItem('user_storage',new_user_stroge)
        append_storage_items(user_storage)
      }
    }


    /**컨텐트 박스에 유저 데이터 제거 */
    let remove_user_data = (i) =>{
      let user_storage = localStorage.getItem('user_storage')
      user_storage = JSON.parse(user_storage)
      //splice('제거할 요소 위치','갯수')
      user_storage.splice(i,1);
      let new_user_stroge = JSON.stringify(user_storage)
      localStorage.setItem('user_storage',new_user_stroge)
      append_storage_items(user_storage)
    }
    

    /**로딩시 */ 
    let storage_start = () =>{
      load_storage_items()
      let nav = document.querySelector('.nav_container')
      nav.classList.add('navcolor_dark')
      storage_btn.addEventListener('click',()=>{
        push_user_data()
      })
      storage_input.addEventListener('keydown',(event)=>{
        if( event.keyCode == 13){
          push_user_data()
          relation_tag_box.classList.remove('onoff')
        }
      })
      user_input_focus_event()
    }
    storage_start()
  }
}
