self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  let data = {};
  console.log('push data', event.data?.json());
  if (event.data) {
    data = event.data?.json();
  }

  const options = {
    title: data?.title,
    body: data?.body,
    tag: 'test-push',
  };
  event.waitUntil(self.registration.showNotification(data?.title, options));
});
