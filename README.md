# Simple desktop notifications

This is a simple javascript to manage and show desktop notifications with custom sound for all modern web browsers.
It works with:
* Google Chrome 22 and above
* Firefox 22 and above
* Safari 6 and above
* Opera 25 and above

## Usage
Simply add `desktop_notifications.js` (or the minified one) to your HTML and call desktopNotifications methods.
Check `demo.html` to see it in action.

## Built-in features
* Tagged notifications, assign a tag to each notification to group notifications by topic and avoid filling screen of notifications
* Play custom sound
* Set automatic hide timeout
* Check if notifications are allowed or denied
* Browser dependent alert message when notifications are denied to help user to unblock them

## API
Automatically global `desktopNotifications` object is created.

##### desktopNotifications.isSupported()
Check if notifications are support by web browser.

##### desktopNotifications.isPermitted()
Check if notifications are permitted by user.

##### desktopNotifications.isDenied()
Check if notifications are explicitly denied by user.

##### desktopNotifications.requestPermission([callbackFn, [showTipWhenDenied]])
There are three possible scenarios:
* When notifications are on `default` state, this is not set, shows the browser popup to ask the user.
* When notifications are `permitted` does nothing.
* When notifications are `denied` and `showTipWhenDenied` parameter is `true` shows an alert with browser depdendent message to help user to unblock them.

#####  desktopNotifications.showNotification(title, body, tag, [options])
Show notification when they are permitted. Available parameters:
* `title` The notification title
* `body` The notification body
* `tag` Allow to set a tag or topic to each notification in order to group them by topic and avoid to fill the user screen of similar notifications.
* `options` object with this fields:
    * `icon` URL of the notification image
    * `timeout` Auto-hide timeout in milliseconds
    * `sound` URL of the custom sound to play on notification show
    * `onclose` Callback function to be called on notification close event
