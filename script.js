async function detectDevice() {
    const ua = navigator.userAgent;
    let os = "Unknown";
    let device = "Desktop";
    let browser = "Unknown";

    // 1. Modern Client Hints API (High Accuracy & Future Proof)
    if (navigator.userAgentData) {
        const uaData = navigator.userAgentData;
        const platform = uaData.platform;

        if (platform === "Windows") os = "Windows";
        else if (platform === "macOS") os = "macOS";
        else if (platform === "Android") os = "Android";
        else if (platform === "iOS" || platform === "iPadOS") os = platform;
        else if (platform === "Linux") os = "Linux";

        // Check if mobile via client hints mobile flag
        if (uaData.mobile) {
            device = "Mobile";
        }
    }

    // 2. Fallback / Detailed Parsing using User-Agent String
    if (os === "Unknown") {
        if (/Android/i.test(ua)) os = "Android";
        else if (/iPhone|iPod/i.test(ua)) os = "iOS";
        else if (/iPad/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) os = "iPadOS";
        else if (/Win/i.test(navigator.platform || ua)) os = "Windows";
        else if (/Mac/i.test(navigator.platform || ua)) os = "macOS";
        else if (/Linux/i.test(navigator.platform || ua)) os = "Linux";
    }

    // Refine Device Type
    if (/Tablet|iPad/i.test(ua) || (os === "iPadOS") || (os === "Android" && !/Mobile/i.test(ua))) {
        device = "Tablet";
    } else if (/Mobile|Android|iP(hone|od)/i.test(ua)) {
        device = "Mobile";
    }

    // Browser Detection (Order matters due to UA overlapping strings)
    if (/OPR\/|Opera\//i.test(ua)) {
        browser = "Opera";
    } else if (/Edg\//i.test(ua)) {
        browser = "Microsoft Edge";
    } else if (/SamsungBrowser/i.test(ua)) {
        browser = "Samsung Internet";
    } else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) {
        browser = "Google Chrome";
    } else if (/Firefox\//i.test(ua)) {
        browser = "Mozilla Firefox";
    } else if (/Safari\//i.test(ua) && !/Chrome|Chromium/i.test(ua)) {
        browser = "Safari";
    }

    // Optional: Fetch high-entropy client hints if supported (e.g., exact architecture/version)
    let brandDetails = null;
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
        try {
            brandDetails = await navigator.userAgentData.getHighEntropyValues([
                "architecture", "model", "platformVersion", "uaFullVersion"
            ]);
        } catch (e) {
            // Fallback gracefully if blocked or rejected
        }
    }

    return {
        os,
        device,
        browser,
        userAgent: ua,
        clientHints: brandDetails,
        isAndroid: os === "Android",
        isIOS: os === "iOS",
        isIPad: os === "iPadOS",
        isMac: os === "macOS",
        isWindows: os === "Windows",
        isDesktop: device === "Desktop",
        isMobile: device === "Mobile",
        isTablet: device === "Tablet"
    };
}

// Initialize UI update
detectDevice().then(info => {
    document.getElementById("os").textContent = info.os;
    document.getElementById("device").textContent = info.device;
    document.getElementById("browser").textContent = info.browser;
    document.getElementById("ua").textContent = info.userAgent;

    console.log("Detailed Device Profile:", info);
});
