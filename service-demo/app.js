// 注册serviceworker
async function registerServiceWorker  (){
    try{
        const register = await navigator.serviceWorker.register('sw.js')
        if(register.installing){
            console.log('service worker is installing')
        }else if(register.waiting){
            console.log('service worker is waiting')
        }else if(register.active){
            console.log('service worker is active')
        }
    }catch (e){
        console.error(e)
    }
}

registerServiceWorker();
