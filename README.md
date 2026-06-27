# HTMLDeviceDetection
Here's a lightweight script.js that detects the user's platform and device type using the modern navigator.userAgentData API (when available) with a fallback to navigator.userAgent.

### Example Output

| Device         | OS      | Device Type |
| -------------- | ------- | ----------- |
| Windows PC     | Windows | Desktop     |
| MacBook        | macOS   | Desktop     |
| Android Phone  | Android | Mobile      |
| Android Tablet | Android | Tablet      |
| iPhone         | iOS     | Mobile      |
| iPad           | iPadOS  | Tablet      |

The script also exposes boolean flags such as:

```javascript
info.isAndroid
info.isIOS
info.isIPad
info.isMac
info.isDesktop
info.isMobile
info.isTablet
```

which you can use for conditional logic in your application.
