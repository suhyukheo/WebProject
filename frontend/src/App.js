import Search from "./pages/Search.js"
import Main from "./pages/Main.js"
import Storage from "./pages/Storage.js"
import Detail from "./pages/Detail.js"
//라우팅 함수
const container = document.querySelector('.App')
const BASE_URL =document.location.origin
const router = async () =>{
  //현재 페이지가 가지고 있는 주소 및 보여줄 친구들
  const routes = [
    { path : '/' , view:new Main()},
    { path : '/Search' , view: new Search()},
    { path : '/Storage' , view: new Storage()},
    { path : '/Detail', view: new Detail()}
    
  ]

  //map 은 어레이안에 요소를 연산후 어레이를 반환합니다. 굳이 안써도 되고 for문써도 됩니다.
  //현재 주소와 routes에 저장된 주소를 비교합니다.  아마 routes의 길이만큼 route에 routes의 path와 view 그리고 isMatch값이 저장될 것
  const Match_route = routes.map(route =>{
    return {
      route : route,
      isMatch: location.pathname == route.path
    }
  })
  // Match중 isMatch가 true인 값이 있는 지 확인합니다.
  let match = Match_route.find( Match_data => Match_data.isMatch)
  //혹시 몰라서.. false이면 메인페이지로 로드합니다.
  if(match == undefined){
    match ={
      route:routes[0],
      isMatch:true
    }
  }
  container.innerHTML = match.route.view.HTML()
  match.route.view.EVENT()
}

const navigate = (url) =>{
  history.pushState(null,null,url)
  router(location.href.replace(BASE_URL,""))
}


window.addEventListener("popstate",router) 

//DOMContentLoaded script파일이 모두 읽히고 실행되는 로드 이벤트
document.addEventListener("DOMContentLoaded", ()=>{
  document.body.addEventListener('click' , (e) =>{
    if(e.target.classList.contains("data_link")){
      e.preventDefault()
      navigate(e.target.href)
    }
    else if(e.target.parentNode.classList.contains("data_link")){
      e.preventDefault()
      navigate(e.target.parentNode.href)
    }
  })
  router()
})


