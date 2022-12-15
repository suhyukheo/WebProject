export default class Detail{
  constructor(){
    this.newimfo = ''
  }
  HTML(){
    return `<div class='detail'>
      <div class='detaile_container'>
       <div class='recipe_left_box'>
       <div class='img_box'>
         <p id ='recipe_title'>레시피</p>
       </div>
        <div>
        </div>
        <h2>레시피 설명</h2>
        <div class='recipe_info'>
        </div>
       </div>
       <div class='recipe_right_box'>
       <div style='overflow:hidden'>
       <h2>재료</h2>
       <p>=============================</p>
       <div class='ingredient_box'></div>
       </div>
       <div style='overflow:hidden'>
       <h2 style='margin-top:75px'>영양 정보</h2>
       <p>=============================</p>
       <div class='nutrition_box'></div>
       </div>
       </div>
       </div>
      </div>
    
    </div> 
    `
  }
  EVENT(){
    let bring_info = () =>{
      let search_item= localStorage.getItem('search_item')
      search_item = JSON.parse(search_item)
      return search_item
    }
    let make_recipe_left_box = () =>{
      let recipe = bring_info()
      console.log(recipe)
      let recipe_info= document.querySelector('.recipe_info')
      let recipe_left_img_box = document.querySelector('.img_box')  
      let recipe_left_img_box_p = document.querySelector('.img_box p')
      let contents=''  

      recipe_left_img_box.style.background = `
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.25) 60%,
        rgba(255, 255, 255, 0.4) 70%,
        rgba(255, 255, 255, 0.55) 80%,
        rgba(255, 255, 255, 0.7) 90%,
        rgba(255, 255, 255, 1) 100%
      ), url('${recipe['ATT_FILE_NO_MK']}')
      `
      recipe_left_img_box.style.backgroundSize='cover'
      recipe_left_img_box.style.backgroundPosition='center'

      recipe_left_img_box_p.innerText =`${recipe['RCP_NM']}`
      for(let i=1 ; i<21 ;i++){
        i=String(i)
        i=i.padStart(2,'0');
        let MANUALi='MANUAL'+i
        let MANUALimgi= 'MANUAL_IMG'+i
        if(recipe[MANUALi] !==''){
          contents +=`<div class='recipe'><img src='${recipe[MANUALimgi]}' ><p>${recipe[MANUALi]}</p></div>`
        }
        else continue
      }
      recipe_info.innerHTML = contents
    }
    let make_recipe_right_box = () =>{
      let recipe = bring_info()
      let ingredient = document.querySelector('.ingredient_box')
      let recipe_str =recipe['RCP_PARTS_DTLS']
      let contents =''
      recipe_str = recipe_str.split(',')
      for(let i=0 ; i<recipe_str.length ;i++){
        contents +=`<p>${recipe_str[i]}</p>`
      }
      ingredient.innerHTML = contents
      let nutrition = document.querySelector('.nutrition_box')
      nutrition.innerHTML = `
      <div><p>열량 : ${recipe['INFO_ENG']}kcal</p></div>
      <div><p>탄수화물: ${recipe['INFO_CAR']}g</p></div>
      <div><p>단백질: ${recipe['INFO_PRO']}g</p></div>
      <div><p>지방: ${recipe['INFO_FAT']}g</p></div>
      <div><p>나트륨: ${recipe['INFO_NA']}g</p></div>
      ` 
    }

    let detail_scrrol = () =>{
      window.addEventListener('scroll', () =>{
        if(window.scrollY>10){
          nav.classList.add('navcolor_dark')
        }
        else{
          nav.classList.remove('navcolor_dark')
        }
      })
    }
    
    let detail_start_event = () =>{
      let nav = document.querySelector('.nav_container')
      nav.classList.add('navcolor_dark')
      make_recipe_left_box()
      make_recipe_right_box()
    }
    detail_start_event()
  }
}