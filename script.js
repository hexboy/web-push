const isSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window;

window.addEventListener('load', () => {
  const preEl = document.querySelector('#subscription-result');
  if (isSupported()) {
    navigator.serviceWorker
      .register('./sw.js')
      .then(function (registration) {
        console.log('Service worker successfully registered.');
        console.log(registration);
      })
      .catch(function (err) {
        console.error('Unable to register service worker.', err);
      });
    preEl.innerHTML = '✅ Push is supported on this browser.';
  } else {
    preEl.innerHTML =
      "❌ Push isn't supported on this browser, disable or hide UI.";
  }
});

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
  if (!isSupported()) {
    preEl.innerHTML =
      "❌ Push isn't supported on this browser, disable or hide UI.";
    return;
  }
  try {
    await askPermission();
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      // applicationServerKey: vapidKeys.publicKey
      applicationServerKey:
        'BHxNcNBtdplYp81tOBnkl9o1SbLUXvgp782uttUEoFYfkKwns8UMtG53etpJDV64QzJsk5slO0B7dAwshJ9Im30',
    });
    console.log(push, JSON.stringify(push, null, 2));
    preEl.innerHTML = JSON.stringify(push, null, 2);
  } catch (error) {
    preEl.innerHTML = error.message;
    console.error(error);
  }
}
