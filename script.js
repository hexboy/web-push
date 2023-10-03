if (!('serviceWorker' in navigator)) {
  console.log(
    "Service Worker isn't supported on this browser, disable or hide UI."
  );
} else if (!('PushManager' in window)) {
  console.log("Push isn't supported on this browser, disable or hide UI.");
} else {
  addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(function (registration) {
        console.log('Service worker successfully registered.');
        console.log(registration);
      })
      .catch(function (err) {
        console.error('Unable to register service worker.', err);
      });
  });
}

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.");
    }
  });
}

async function subscribe() {
  const preEl = document.querySelector('#subscription-result');
  await askPermission();
  try {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      // applicationServerKey: vapidKeys.publicKey
      applicationServerKey: '.....',
    });
    console.log(push, JSON.stringify(push, null, 2));
    preEl.innerHTML = JSON.stringify(push, null, 2);
  } catch (error) {
    preEl.innerHTML = error.message;
    console.error(error);
  }
}
