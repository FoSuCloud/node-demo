// self 就相当于window
self.addEventListener('activate', (event) => {
    // 删除过期的缓存条目&升级数据库模式之后再callback
    event.waitUntil(enableNavigationPreload);
})
self.addEventListener('install', (event) => {
    event.waitUntil(addResourcesToCache(['/', '/index.html', '/app.js', '/img.png', '/snowTroopers.png']))
})
self.addEventListener('fetch', (event) => {
        // 阻止浏览器的默认 fetch 操作，并且由你自己提供一个响应
        event.respondWith(cacheFirst({
            request: event.request,
            preloadResponsePromise: event.preloadResponse,
            fallbackUrl: './fail.js'
        }))
    })
    // 监听 notification 通知的点击事件
self.addEventListener('notificationclick', (event) => {
        event.notification.close();
        event.waitUntil(
            clients.openWindow('https://fanyi.baidu.com/')
        )
    })
    // 清除完上次sw.js的缓存之后，再激活service worker的preload
const enableNavigationPreload = async() => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
    }
};
// 添加缓存
const addResourcesToCache = async(resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
};
// 第一次请求缓存下来，后续的就走service worker
const cacheFirst = async({ request, preloadResponsePromise, fallbackURl }) => {
    // 从缓存中找到匹配的请求
    const cacheFromResponse = await caches.match(request)
    if (cacheFromResponse) {
        return cacheFromResponse;
    }
    // 如果有预加载，等待预加载结束
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        putInCache(request, preloadResponse.clone())
        return preloadResponse
    }

    // 否则发起请求
    try {
        const responseFromNetwork = await fetch(request);
        if (responseFromNetwork) {
            console.log('notifation')
            registerNotification()
        }
        putInCache(request, responseFromNetwork.clone())
        return responseFromNetwork
    } catch (e) {
        // 失败的时候，响应对应缓存
        const failResponse = await caches.match(fallbackURl)
        if (failResponse) {
            return failResponse
        }
        // 响应错误
        return new Response('error', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
        })
    }
}

// 添加进缓存
const putInCache = async(request, response) => {
        const cache = await caches.open('v1')
        await cache.put(request, response)
    }
// 添加通知 notification
const registerNotification = () => {
    // Notification.requestPermission 只在https网站可用
    // todo Chrome上对http协议默认Notification.permission = 'denied'，想要愉快的推送消息就要使用https协议！
    // 但是如果https网站是不安全的，那么也还是不可以使用。
    if (!window || !("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        self.registration.showNotification('同步完成', {
            body: '看看什么内容吗？速度速度速度的撒地方的仿佛是多福多寿冯绍峰都是阿迪速度',
            icon: './logo.png'
        })
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission((result) => {
            if (result === "granted") {
                navigator.serviceWorker.ready.then((registration) => {
                    self.registration.showNotification('同步完成', {
                        body: '看看什么内容吗？速度速度速度的撒地方的仿佛是多福多寿冯绍峰都是阿迪速度',
                        icon: './logo.png'
                    })
                });
            }
        });
    }
}
