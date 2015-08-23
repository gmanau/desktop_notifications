var desktopNotifications = function() {
	var _supported = (window.Notification || navigator.mozNotification || window.webkitNotifications || false);
	var _permission = 'default';
	var _isOpera = (window.opera || navigator.userAgent.indexOf(' OPR/') > -1);
	var _isChrome  = (window.chrome && !_isOpera);
	var _isFirefox = (typeof(InstallTrigger) !== 'undefined');
	var _isSafari = (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
	var _tags = [];

	var isSupported = function() {
		return (_supported != false);
	}

	var isPermitted = function() {
		if (this.isSupported()) {
			
			if (window.Notification && window.Notification.permissionLevel) {
				return ((_permission = window.Notification.permissionLevel()) == 'granted');
			} else if (window.Notification && window.Notification.permission) {
				return ((_permission = window.Notification.permission) == 'granted');
			} else if (navigator.mozNotification) {
				return true;
			} else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
				return ((_permission = (window.webkitNotifications.checkPermission() == 0 ? 'granted' : (window.webkitNotifications.checkPermission() == 2 ? 'denied' : 'default'))) == 'granted');
			}
		}
	}

	var isDenied = function() {
		return (this.isSupported() && !this.isPermitted() && _permission == 'denied');
	}

	var requestPermission = function(callbackFn, showTipWhenDenied) {
		callbackFn = callbackFn || function() {};

		if (this.isSupported() && !this.isPermitted()) {
        	if (this.isDenied()) {
        		if (_isChrome) {
        			alert('You have blocked notifications.\nOpen "chrome://settings/contentExceptions#notifications" in a new tab and remove blocking.');
        		} else if (_isFirefox) {
        			alert('You have blocked notifications.\nRight click on the page and click "View Page Info".\nIn the panel that opens, click the tab "Permissions".\nScroll down to "Show Notifications" and check "Use default" and close the panel.');
        		} else if (_isSafari) {
        			alert('You have blocked notifications.\nOpen Safari Menu > Preferences > Notifications tab, and remove blocking.');
        		} else if (_isOpera) {
        			alert('You have blocked notifications.\nOpen "browser://settings/contentExceptions#notifications" in a new tab and remove blocking.');
        		}

        	} else {
	            if (window.Notification && window.Notification.requestPermission) {
                	window.Notification.requestPermission(callbackFn); 
	            } else if (window.webkitNotifications && window.webkitNotifications.requestPermission) { 
	                window.webkitNotifications.requestPermission(callbackFn); 
	            } else {
	                callbackFn(false);
	            }
	        }
		}
	}

	var showNotification = function(title, body, tag, options) {
		var notification = false;

		options = options || {};
		options.icon = options.icon || '';
		options.body = body;
		options.tag = tag;
		options.timeout = options.timeout || 10000;
		options.onclose = options.onclose || function() {};

		if (_tags.indexOf(options.tag) == -1 && this.isSupported() && this.isPermitted()) {
			_tags.push(options.tag);

            if (window.Notification) { 
                notification = new window.Notification(title, options);
            } else if (navigator.mozNotification) { 
                notification = navigator.mozNotification.createNotification(title, body, options.icon); 
                notification.show(); 
            } else if (window.webkitNotifications) { 
                notification = window.webkitNotifications.createNotification(options.icon, title, body); 
                notification.show();
            }

            if (options.sound) {
				var s = new Audio(options.sound);
				s.play();
            }

           	setTimeout(function() { 
           		notification.close();
           		_tags.splice(_tags.indexOf(options.tag), 1);
           		options.onclose(notification); }, 
           	options.timeout); 
		}

		return notification;
	}

	return {
		isSupported: isSupported,
		isPermitted: isPermitted,
		isDenied: isDenied,
		requestPermission: requestPermission,
		showNotification: showNotification
	};
}();