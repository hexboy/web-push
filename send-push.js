const webpush = require('web-push');

// VAPID keys should be generated only once.
// run "yarn generate-keys" or "webpush.generateVAPIDKeys();"
const vapidKeys = {
  publicKey: '.....',
  privateKey: '.....',
};
// console.log(vapidKeys);

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
  endpoint: '.....',
  keys: {
    auth: '.....',
    p256dh: '.....',
  },
};

webpush.sendNotification(
  pushSubscription,
  JSON.stringify({
    body: 'Your Push Payload Text',
    title: 'Title',
  })
);
