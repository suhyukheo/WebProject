export default class Detail{
  constructor(){
    this.newimfo = ''
  }
  HTML(){
    return `<div class='detail'>
      <div class='detaile_container'>
       <div class='recipe_left_box'>
       <img></img>
        <div class='recipe'></div>
       </div>
       <div class='recipe_right_box'></div>
       </div>
      </div>
    
    </div> 
    `
  }
  EVENT(){





    let detail_start_event = () =>{
      let nav = document.querySelector('.nav_container')
      nav.style.backgroundColor='#7FB77E'
    }
    detail_start_event()
  }
}