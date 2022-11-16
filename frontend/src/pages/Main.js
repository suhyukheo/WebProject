export default class Main{
  constructor(){
  }
  HTML(){
    return `<div class= 'main'>
    </div> `
  }
  EVENT(){
    /**  // <div class='photobox'>
              // </div>
              // <div class='textbox'>
              //  <div class='text'>
              //  </div>
              //  <div class='text'></div>
              //  <div class='text'></div>
              // </div> */
    // let d =  ['가지', '고추', '오크라', '토마토', '풋콩', '피망']
    // let newd=[]
    //   for(let i in  d){
    //     setTimeout(()=>{
    //       fetch(`http://openapi.foodsafetykorea.go.kr/api/f26d6b1de5e446268b4a/COOKRCP01/json/1/3/RCP_PARTS_DTLS=${d[i]}`)
    //       .then((res) => {
    //         return res.json(); //Promise 반환
    //       }).then((json)=>{
    //         let racipe = json.COOKRCP01
    //         let num= racipe.total_count
    //         if(num >0){
    //           newd.push(d[i])
    //         }
    //         console.log(newd)
    //         console.log(d)
    //       })
    //     },1000*i)
    //   }
      // .then((json)=>{
      //   let a =  json.COOKRCP01.row
      //   console.log(a)
      //   for(let i=0; i<3; i++){
      //     document.querySelectorAll('.text')[i].innerHTML=`
      //     <img class='main-img' src='${a[i].ATT_FILE_NO_MK}'/ >
      //     <p>${a[i].RCP_NM}</p>
      //     `
      //   }
      // })
      // .then((json) => {
      //   a = json.COOKRCP01.row
      //   for(let i=0 ; i<a.length;i++){
      //     let v = a[i].RCP_PARTS_DTLS
      //     v= v.split(" ")
      //     for(let i=0; i<v.length ;i++){
      //       v[i] = v[i].replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,"")
      //       store.push(v[i])
      //     }
      //   }
      //   console.log(store)
      //   let sets = new Set(store)
      //   sets = [...sets]
      //   console.log(sets)
      // });
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

  

