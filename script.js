/* =====================================================
   SHE-SHIELD
   WOMEN SAFETY + AI STRESS & TRAUMA ASSESSMENT
   ===================================================== */


/* =====================================================
   GLOBAL STATE
   ===================================================== */

const state = {

    language:
        localStorage.getItem("sheShieldLanguage") || "en",

    selectedLanguage: "en",

    contacts:
        JSON.parse(
            localStorage.getItem("sheShieldContacts") || "[]"
        ),

    evidence:
        JSON.parse(
            localStorage.getItem("sheShieldEvidence") || "[]"
        ),

    incidents:
        JSON.parse(
            localStorage.getItem("sheShieldIncidents") || "[]"
        ),

    journeyActive: false,

    location: null

};


/* =====================================================
   TRANSLATIONS
   ===================================================== */

const translations = {

    en: {

        brand: "Your Safety. Our Priority.",

        languageTitle: "Choose Your Language",

        languageSubtitle:
            "Select your preferred language",

        continue: "Continue →",

        home: "Home",

        safety: "Immediate Safety",

        assessment: "AI Assessment",

        emergency: "Emergency Response Center",

        ready: "Ready",

        locationReady: "Location Ready",

        getLocation: "Get your current location",

        assessmentPlaceholder:
            "Write your thoughts, feelings or situation here..."

    },


    kn: {

        brand: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ. ನಮ್ಮ ಆದ್ಯತೆ.",

        languageTitle: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

        languageSubtitle:
            "ನಿಮಗೆ ಅನುಕೂಲವಾದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

        continue: "ಮುಂದುವರಿಸಿ →",

        home: "ಮುಖಪುಟ",

        safety: "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",

        assessment: "AI ಮೌಲ್ಯಮಾಪನ",

        emergency: "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯಾ ಕೇಂದ್ರ",

        ready: "ಸಿದ್ಧವಾಗಿದೆ",

        locationReady: "ಸ್ಥಳ ಸಿದ್ಧವಾಗಿದೆ",

        getLocation: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳ ಪಡೆಯಿರಿ",

        assessmentPlaceholder:
            "ನಿಮ್ಮ ಆಲೋಚನೆಗಳು, ಭಾವನೆಗಳು ಅಥವಾ ಪರಿಸ್ಥಿತಿಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."

    },


    te: {

        brand: "మీ భద్రత. మా ప్రాధాన్యత.",

        languageTitle: "మీ భాషను ఎంచుకోండి",

        languageSubtitle:
            "మీకు ఇష్టమైన భాషను ఎంచుకోండి",

        continue: "కొనసాగించండి →",

        home: "హోమ్",

        safety: "తక్షణ భద్రత",

        assessment: "AI అంచనా",

        emergency: "అత్యవసర ప్రతిస్పందన కేంద్రం",

        ready: "సిద్ధంగా ఉంది",

        locationReady: "స్థానం సిద్ధంగా ఉంది",

        getLocation: "మీ ప్రస్తుత స్థానాన్ని పొందండి",

        assessmentPlaceholder:
            "మీ ఆలోచనలు, భావాలు లేదా పరిస్థితిని ఇక్కడ రాయండి..."

    },


    ta: {

        brand: "உங்கள் பாதுகாப்பு. எங்கள் முன்னுரிமை.",

        languageTitle: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",

        languageSubtitle:
            "உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",

        continue: "தொடரவும் →",

        home: "முகப்பு",

        safety: "உடனடி பாதுகாப்பு",

        assessment: "AI மதிப்பீடு",

        emergency: "அவசர உதவி மையம்",

        ready: "தயார்",

        locationReady: "இருப்பிடம் தயார்",

        getLocation: "உங்கள் தற்போதைய இருப்பிடத்தைப் பெறுங்கள்",

        assessmentPlaceholder:
            "உங்கள் எண்ணங்கள், உணர்வுகள் அல்லது சூழ்நிலையை இங்கே எழுதுங்கள்..."

    },


    hi: {

        brand: "आपकी सुरक्षा। हमारी प्राथमिकता।",

        languageTitle: "अपनी भाषा चुनें",

        languageSubtitle:
            "अपनी पसंदीदा भाषा चुनें",

        continue: "जारी रखें →",

        home: "होम",

        safety: "तत्काल सुरक्षा",

        assessment: "AI मूल्यांकन",

        emergency: "आपातकालीन प्रतिक्रिया केंद्र",

        ready: "तैयार",

        locationReady: "स्थान तैयार है",

        getLocation: "अपना वर्तमान स्थान प्राप्त करें",

        assessmentPlaceholder:
            "अपने विचार, भावनाएँ या स्थिति यहाँ लिखें..."

    }

};


/* =====================================================
   DOM HELPERS
   ===================================================== */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);


/* =====================================================
   SPLASH
   ===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        $("#splashScreen")
            .classList
            .add("hide");

    }, 2500);


    setTimeout(() => {

        $("#languageScreen")
            .classList
            .remove("hidden");

    }, 3000);

});


/* =====================================================
   LANGUAGE SELECTION
   ===================================================== */

$$(".language-btn").forEach(button => {

    button.addEventListener("click", () => {

        $$(".language-btn")
            .forEach(btn =>
                btn.classList.remove("selected")
            );

        button.classList.add("selected");

        state.selectedLanguage =
            button.dataset.lang;

    });

});


$("#continueLanguage")
    ?.addEventListener("click", () => {

        state.language =
            state.selectedLanguage;

        localStorage.setItem(
            "sheShieldLanguage",
            state.language
        );

        $("#languageScreen")
            .classList
            .add("hidden");

        $("#app")
            .classList
            .remove("hidden");

        applyLanguage();

        showPage("home");

    });


/* =====================================================
   LANGUAGE SELECTOR
   ===================================================== */

$("#languageSelect")
    ?.addEventListener("change", event => {

        state.language =
            event.target.value;

        localStorage.setItem(
            "sheShieldLanguage",
            state.language
        );

        applyLanguage();

        showToast(
            "Language updated"
        );

    });


/* =====================================================
   APPLY LANGUAGE
   ===================================================== */

function applyLanguage() {

    const t =
        translations[state.language] ||
        translations.en;


    $("#brandSubtitle").textContent =
        t.brand;

    $("#languageTitle").textContent =
        t.languageTitle;

    $("#languageSubtitle").textContent =
        t.languageSubtitle;

    $("#continueLanguage").textContent =
        t.continue;


    const navButtons =
        $$(".desktop-nav button");

    if (navButtons.length >= 3) {

        navButtons[0].textContent =
            t.home;

        navButtons[1].textContent =
            t.safety;

        navButtons[2].textContent =
            t.assessment;

    }


    const textarea =
        $("#assessmentText");

    if (textarea) {

        textarea.placeholder =
            t.assessmentPlaceholder;

    }


    const current =
        $("#currentLanguage");

    if (current) {

        const names = {

            en: "English",

            kn: "ಕನ್ನಡ",

            te: "తెలుగు",

            ta: "தமிழ்",

            hi: "हिन्दी"

        };

        current.textContent =
            names[state.language];

    }

}


/* =====================================================
   PAGE NAVIGATION
   ===================================================== */

function showPage(pageId) {

    $$(".page")
        .forEach(page =>
            page.classList.remove("active-page")
        );

    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add("active-page");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    $("#mobileMenu")
        ?.classList
        .remove("open");

}


$$("[data-page]").forEach(button => {

    button.addEventListener("click", () => {

        showPage(
            button.dataset.page
        );

    });

});


/* =====================================================
   MOBILE MENU
   ===================================================== */

$("#menuButton")
    ?.addEventListener("click", () => {

        $("#mobileMenu")
            .classList
            .toggle("open");

    });


/* =====================================================
   TOAST
   ===================================================== */

let toastTimer;

function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =====================================================
   GEOLOCATION
   ===================================================== */

function getCurrentLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {

            reject(
                new Error(
                    "Geolocation is not supported."
                )
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(

            position => {

                state.location = {

                    latitude:
                        position.coords.latitude,

                    longitude:
                        position.coords.longitude,

                    accuracy:
                        position.coords.accuracy,

                    timestamp:
                        new Date().toISOString()

                };

                resolve(state.location);

            },

            error => {

                reject(error);

            },

            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0

            }

        );

    });

}


/* =====================================================
   LOCATION BUTTON
   ===================================================== */

$("#locationButton")
    ?.addEventListener("click", async () => {

        showToast(
            "Requesting your current location..."
        );

        try {

            const location =
                await getCurrentLocation();

            const url =
                `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;


            showToast(
                "Location detected successfully"
            );


            setTimeout(() => {

                if (
                    confirm(
                        "Your location is ready. Open it in Maps?"
                    )
                ) {

                    window.open(
                        url,
                        "_blank"
                    );

                }

            }, 300);

        }

        catch (error) {

            showToast(
                "Location permission is required."
            );

        }

    });


/* =====================================================
   SHARE LOCATION
   ===================================================== */

$("#shareLocation")
    ?.addEventListener("click", async () => {

        try {

            const location =
                await getCurrentLocation();

            const mapsUrl =
                `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

            const text =
                `I may need help. My current location is: ${mapsUrl}`;


            if (
                navigator.share
            ) {

                await navigator.share({

                    title: "SHE-SHIELD Emergency Location",

                    text

                });

            }

            else {

                await navigator.clipboard.writeText(
                    text
                );

                showToast(
                    "Location message copied"
                );

            }

        }

        catch (error) {

            showToast(
                "Unable to get location."
            );

        }

    });


/* =====================================================
   SOS
   ===================================================== */

let sosTimer = null;

let sosTriggered = false;


$("#sosButton")
    ?.addEventListener("click", async () => {

        if (sosTriggered) return;

        sosTriggered = true;

        $("#sosStatus").textContent =
            "Emergency mode activated";


        showToast(
            "SOS activated"
        );


        createIncident(
            "Emergency SOS activated"
        );


        try {

            const location =
                await getCurrentLocation();


            const mapsUrl =
                `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;


            showToast(
                "Emergency location detected"
            );


            if (
                state.contacts.length > 0
            ) {

                const contact =
                    state.contacts[0];


                const message =
                    `SHE-SHIELD emergency alert. I may need help. My location: ${mapsUrl}`;


                if (
                    navigator.share
                ) {

                    await navigator.share({

                        title:
                            "SHE-SHIELD Emergency Alert",

                        text:
                            message

                    });

                }

            }

        }

        catch (error) {

            showToast(
                "SOS active. Location permission was not granted."
            );

        }


        playSiren();


        setTimeout(() => {

            sosTriggered = false;

            $("#sosStatus").textContent =
                "Ready";

        }, 10000);

    });


/* =====================================================
   SILENT SOS
   ===================================================== */

$("#silentSos")
    ?.addEventListener("click", async () => {

        createIncident(
            "Silent SOS activated"
        );

        showToast(
            "Silent SOS activated"
        );


        try {

            await getCurrentLocation();

            showToast(
                "Location captured silently"
            );

        }

        catch (error) {

            showToast(
                "Location permission required"
            );

        }

    });


/* =====================================================
   AUTO SOS
   ===================================================== */

$("#autoSos")
    ?.addEventListener("click", () => {

        let seconds = 10;

        $("#sosStatus").textContent =
            `SOS will activate in ${seconds}s`;


        clearInterval(sosTimer);


        sosTimer =
            setInterval(() => {

                seconds--;

                $("#sosStatus").textContent =
                    `SOS will activate in ${seconds}s`;


                if (seconds <= 0) {

                    clearInterval(sosTimer);

                    $("#sosButton")
                        .click();

                }

            }, 1000);

    });


/* =====================================================
   SIREN
   ===================================================== */

function playSiren() {

    const audio =
        $("#sirenAudio");

    if (!audio) return;

    audio.currentTime = 0;

    audio.play()
        .then(() => {

            showToast(
                "Emergency siren activated"
            );

        })
        .catch(() => {

            showToast(
                "Tap the siren button to allow audio."
            );

        });

}


$("#sirenButton")
    ?.addEventListener("click", () => {

        const audio =
            $("#sirenAudio");

        if (audio.paused) {

            playSiren();

            $("#sirenButton")
                .querySelector("strong")
                .textContent =
                "Stop Siren";

        }

        else {

            audio.pause();

            audio.currentTime = 0;

            $("#sirenButton")
                .querySelector("strong")
                .textContent =
                "Siren";

        }

    });


/* =====================================================
   SCREEN FLASH
   ===================================================== */

$("#flashButton")
    ?.addEventListener("click", () => {

        const overlay =
            $("#flashOverlay");

        overlay.classList.add(
            "flash-active"
        );

        setTimeout(() => {

            overlay.classList.remove(
                "flash-active"
            );

        }, 2200);

        showToast(
            "Screen flash activated"
        );

    });


/* =====================================================
   FAKE CALL
   ===================================================== */

$("#fakeCallButton")
    ?.addEventListener("click", () => {

        $("#fakeCall")
            .classList
            .remove("hidden");

    });


$("#rejectCall")
    ?.addEventListener("click", () => {

        $("#fakeCall")
            .classList
            .add("hidden");

    });


$("#acceptCall")
    ?.addEventListener("click", () => {

        $("#fakeCall")
            .classList
            .add("hidden");

        showToast(
            "Fake call answered"
        );

    });


/* =====================================================
   JOURNEY SAFETY
   ===================================================== */

$("#journeyButton")
    ?.addEventListener("click", async () => {

        if (
            state.journeyActive
        ) {

            state.journeyActive =
                false;

            $("#journeyButton").textContent =
                "→";

            showToast(
                "Journey tracking stopped"
            );

            return;

        }


        try {

            await getCurrentLocation();

            state.journeyActive =
                true;

            $("#journeyButton").textContent =
                "✓";

            createIncident(
                "Journey safety started"
            );

            showToast(
                "Journey safety is active"
            );

        }

        catch {

            showToast(
                "Location permission is required."
            );

        }

    });


/* =====================================================
   AI STRESS / TRAUMA ASSESSMENT
   ===================================================== */

$("#analyzeButton")
    ?.addEventListener("click", () => {

        const text =
            $("#assessmentText")
                .value
                .trim();


        if (!text) {

            showToast(
                "Please describe what you are experiencing."
            );

            return;

        }


        const score =
            calculateStressScore(text);


        showAssessmentResult(
            score
        );

    });


/* =====================================================
   LOCAL DEMO ASSESSMENT ENGINE
   ===================================================== */

function calculateStressScore(text) {

    const lower =
        text.toLowerCase();


    const highRiskWords = [

        "danger",
        "threat",
        "attack",
        "violence",
        "hurt",
        "harming",
        "suicide",
        "kill",
        "unsafe",
        "abuse",
        "assault",
        "panic",
        "trauma",
        "terrified",
        "afraid"

    ];


    const mediumWords = [

        "stress",
        "anxious",
        "anxiety",
        "worried",
        "scared",
        "sad",
        "cry",
        "fear",
        "sleep",
        "overwhelmed",
        "pressure",
        "lonely"

    ];


    let score = 20;


    highRiskWords.forEach(word => {

        if (lower.includes(word)) {

            score += 8;

        }

    });


    mediumWords.forEach(word => {

        if (l
