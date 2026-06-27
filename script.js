function detectDevice() {
    const ua = navigator.userAgent;
    const platform = navigator.userAgentData?.platform || navigator.platform;

    let os = "Unknown";
    let device = "Desktop";
    let browser = "Unknown";

    // ---------- Operating System ----------
    if (/Android/i.test(ua)) {
        os = "Android";
        device = /Mobile/i.test(ua) ? "Mobile" : "Tablet";
    } else if (/iPhone/i.test(ua)) {
        os = "iOS";
        device = "Mobile";
    } else if (
        /iPad/i.test(ua) ||
        (platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
        os = "iPadOS";
        device = "Tablet";
    } else if (/Mac/i.test(platform)) {
        os = "macOS";
    } else if (/Win/i.test(platform)) {
        os = "Windows";
    } else if (/Linux/i.test(platform)) {
        os = "Linux";
    }

    // ---------- Browser ----------
    if (/Edg/i.test(ua)) {
        browser = "Microsoft Edge";
    } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
        browser = "Google Chrome";
    } else if (/Firefox/i.test(ua)) {
        browser = "Mozilla Firefox";
    } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
        browser = "Safari";
    }

    return {
        os,
        device,
        browser,
        userAgent: ua,
        isAndroid: os === "Android",
        isIOS: os === "iOS",
        isIPad: os === "iPadOS",
        isMac: os === "macOS",
        isDesktop: device === "Desktop",
        isMobile: device === "Mobile",
        isTablet: device === "Tablet"
    };
}

const info = detectDevice();

document.getElementById("os").textContent = info.os;
document.getElementById("device").textContent = info.device;
document.getElementById("browser").textContent = info.browser;
document.getElementById("ua").textContent = info.userAgent;

// Console output
console.log(info);