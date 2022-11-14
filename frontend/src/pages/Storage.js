let main =document.querySelector('.App') 
export default class Storage{
  constructor(){
  }
  HTML(){
    // const page = document.createElement('div')
    // page.className='main dash'
    // page.innerText ='dash'
    return `<div class= 'storage'>
              <div class='storage_box content_box'></div>
              <div class='storage_box'>
                <input></input>
                <button id='btn'>click</button>
              </div>          
            </div> `
  }
  EVENT(){
    let storage_input =document.querySelector('.storage_box input') 
    let storage_btn = document.querySelector('.storage_box #btn')
    let content_box = document.querySelector('.storage_box.content_box')

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
        content_box.innerHTML = ''
        for(let i=0; i<storage_list.length;i++){
          contents +=`<div class='content'><p>${storage_list[i].name}</p><button class='btn'>del</button></div>`
        }
        content_box.innerHTML=contents
        items_remove_event()
      }
      else{
        content_box.innerHTML=''
      }
    }


    /**추가된 컨텐츠의 삭제 버튼의 이벤트를 추가한다. */  
    let items_remove_event = () =>{
      let contents_list = document.querySelectorAll('.storage_box.content_box  .content > .btn')
      for(let i= 0 ;i<contents_list.length ;i++){
          contents_list[i].addEventListener('click',()=>{
          pop_user_data(i)
         })
      }
    }


    /**컨텐트 박스에 유저 데이터 추가한다. */
    let  push_user_data = () =>{
      let user_storage = localStorage.getItem('user_storage')
      user_storage = JSON.parse(user_storage)
      user_storage.push({'name':`${storage_input.value}`,'date':``,'type':``})
      let new_user_stroge = JSON.stringify(user_storage)
      localStorage.setItem('user_storage',new_user_stroge)
      append_storage_items(user_storage)
    }


    /**컨텐트 박스에 유저 데이터 제거 */
    let pop_user_data = (i) =>{
      let user_storage = localStorage.getItem('user_storage')
      user_storage = JSON.parse(user_storage)
      //splice('제거할 요소 위치','갯수')
      user_storage.splice(i,1);
      let new_user_stroge = JSON.stringify(user_storage)
      localStorage.setItem('user_storage',new_user_stroge)
      append_storage_items(user_storage)
      
    }
    

    /**로딩시 */
    load_storage_items()
    
    storage_btn.addEventListener('click',()=>{
      push_user_data()
    })
  }
}
