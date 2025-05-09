
const CookieManager = {
  set: (name, value, days = 7) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
  },

  get: (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  },
  delete: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
}


document.addEventListener('DOMContentLoaded',(ev)=> {

let memo_kaisu=0
document.querySelectorAll(".memo").forEach((element)=>{
    memo_kaisu++
    let id = element.dataset.id
    element.placeholder = `${id}番目のメモ`
let memo = CookieManager.get(`Memo_${id}`)
if (memo == null) memo=""
element.value = `${memo}`; 

    element.addEventListener("input",(e)=>{
        let element = e.target
        let id = element.dataset.id
        CookieManager.set(`Memo_${id}`,element.value,1000)
    })

})

CookieManager.set(`Memo_max`,memo_kaisu,1000)
})