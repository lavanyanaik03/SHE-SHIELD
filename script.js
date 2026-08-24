/* ============================================================
   SHE-SHIELD
   Women's Safety + AI Stress & Trauma Assessment Platform
   ============================================================

   Assets:
   - she-shield-logo.png
   - siren.mp3

   Languages:
   English | Kannada | Telugu | Tamil | Hindi

   IMPORTANT:
   A browser cannot secretly bypass permissions or silently
   send SMS/calls. Location/camera/microphone require browser
   permission. Emergency calling uses the device dialer.
   ============================================================ */


/* ============================================================
   GLOBAL STATE
   ============================================================ */

const state = {
    language: localStorage.getItem("sheShieldLanguage") || "en",

    contacts: JSON.parse(
        localStorage.getItem("sheShieldContacts") || "[]"
    ),

    page: "home",

    location: null,

    watchId: null,

    journeyActive: false,

    journeyStart: null,

    journeyTimer: null,

    siren: null,

    countdownTimer: null,

    fakeCallTimer: null,

    listening: false,

    recognition: null,

    currentAssessment: null,

    consentGiven: false
};


/* ============================================================
   BRAND ASSETS
   ============================================================ */

const LOGO = "she-shield-logo.png";
const SIREN = "siren.mp3";


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {

    en: {
        tagline: "Your Safety. Your Voice. Your Shield.",
        platform: "Women's Safety & Support Platform",

        home: "Home",
        safety: "Immediate Safety",
        assessment: "AI Assessment",
        contacts: "Trusted Contacts",
        dashboard: "Dashboard",
        evidence: "Evidence",
        settings: "Settings",

        immediateTitle: "Immediate Safety",
        immediateText:
            "Emergency tools for moments when you need help right now.",

        traumaTitle: "AI Stress & Trauma Assessment",
        traumaText:
            "A private screening tool to understand stress, fear, anxiety and trauma indicators.",

        getHelp: "Get Help",
        startAssessment: "Start Assessment",

        emergencySOS: "Emergency SOS",
        pressHold: "PRESS & HOLD",

        silentSOS: "Silent SOS",
        autoSOS: "Auto SOS",
        liveLocation: "Live Location",
        shareLocation: "Share Location",
        emergencyCall: "Emergency Call",
        journeySafety: "Journey Safety",
        evidenceCollection: "Evidence Collection",
        siren: "Siren",
        screenFlash: "Screen Flash",
        fakeCall: "Fake Call",
        safetyTips: "Safety Tips",

        trustedContacts: "Trusted Contacts",
        addContact: "Add Contact",
        manage: "Manage",

        text: "Text",
        voice: "Voice",
        consentTitle: "Privacy & Consent",
        consentText:
            "This is a supportive screening tool, not a medical diagnosis. Your response is used only to generate an indicative Stress Vulnerability Index.",
        agree: "I Understand & Continue",

        tellUs: "Tell us what you are experiencing",
        placeholder:
            "Write about what happened, how you feel, or what you are worried about...",
        analyze: "Analyze with AI",

        assessmentResult: "Your Assessment Result",
        svi: "Stress Vulnerability Index",
        low: "Low",
        moderate: "Moderate",
        high: "High",
        critical: "Critical",

        keyIndicators: "Key Indicators",
        recommendations: "Recommended Support",

        counselling: "Counselling",
        legalAid: "Legal Aid",
        medical: "Medical Support",
        police: "Police Intervention",
        emergencySupport: "Emergency Support",

        locationActive: "Location Active",
        locationReady: "Location ready.",
        locationError: "Unable to access location.",

        journeyStart: "Start Journey",
        journeyStop: "End Journey",

        notes: "Notes",
        save: "Save",
        delete: "Delete",

        ready: "Ready",
        activated: "Activated",

        disclaimer:
            "This platform provides supportive safety tools and screening. It does not replace emergency services or professional medical assessment.",

        fakeIncoming: "Incoming Call",
        answer: "Answer",
        decline: "Decline",

        noContacts: "No trusted contacts added yet.",

        language: "Language",

        safetyTip1: "Move toward a populated and well-lit area.",
        safetyTip2: "Contact someone you trust.",
        safetyTip3: "If immediate danger exists, contact emergency services.",
        safetyTip4: "Keep your phone accessible and charged.",
        safetyTip5: "Avoid confronting a threatening person.",

        evidenceSaved: "Evidence saved.",
        sirenStarted: "Emergency siren activated.",
        sirenStopped: "Siren stopped.",
        flashStarted: "Screen flash activated.",
        fakeCallStarted: "Fake call started.",
        sosActivated: "SOS activated.",
        journeyStarted: "Journey started.",
        journeyEnded: "Journey ended."
    },


    kn: {
        tagline: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ. ನಿಮ್ಮ ಧ್ವನಿ. ನಿಮ್ಮ ರಕ್ಷಣೆ.",
        platform: "ಮಹಿಳಾ ಸುರಕ್ಷತೆ ಮತ್ತು ಬೆಂಬಲ ವೇದಿಕೆ",

        home: "ಮುಖಪುಟ",
        safety: "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",
        assessment: "AI ಮೌಲ್ಯಮಾಪನ",
        contacts: "ವಿಶ್ವಾಸಾರ್ಹ ಸಂಪರ್ಕಗಳು",
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        evidence: "ಸಾಕ್ಷ್ಯ",
        settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

        immediateTitle: "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",
        immediateText:
            "ಈಗಲೇ ಸಹಾಯ ಬೇಕಾದಾಗ ಬಳಸಬಹುದಾದ ತುರ್ತು ಸುರಕ್ಷತಾ ಸಾಧನಗಳು.",

        traumaTitle: "AI ಒತ್ತಡ ಮತ್ತು ಆಘಾತ ಮೌಲ್ಯಮಾಪನ",
        traumaText:
            "ಒತ್ತಡ, ಭಯ, ಆತಂಕ ಮತ್ತು ಆಘಾತದ ಸೂಚನೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಖಾಸಗಿ ಸ್ಕ್ರೀನಿಂಗ್.",

        getHelp: "ಸಹಾಯ ಪಡೆಯಿರಿ",
        startAssessment: "ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",

        emergencySOS: "ತುರ್ತು SOS",
        pressHold: "ಒತ್ತಿ ಹಿಡಿಯಿರಿ",

        silentSOS: "ಮೌನ SOS",
        autoSOS: "ಸ್ವಯಂ SOS",
        liveLocation: "ಲೈವ್ ಸ್ಥಳ",
        shareLocation: "ಸ್ಥಳ ಹಂಚಿಕೊಳ್ಳಿ",
        emergencyCall: "ತುರ್ತು ಕರೆ",
        journeySafety: "ಪ್ರಯಾಣ ಸುರಕ್ಷತೆ",
        evidenceCollection: "ಸಾಕ್ಷ್ಯ ಸಂಗ್ರಹ",
        siren: "ಸೈರನ್",
        screenFlash: "ಸ್ಕ್ರೀನ್ ಫ್ಲ್ಯಾಶ್",
        fakeCall: "ನಕಲಿ ಕರೆ",
        safetyTips: "ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು",

        trustedContacts: "ವಿಶ್ವಾಸಾರ್ಹ ಸಂಪರ್ಕಗಳು",
        addContact: "ಸಂಪರ್ಕ ಸೇರಿಸಿ",
        manage: "ನಿರ್ವಹಿಸಿ",

        text: "ಪಠ್ಯ",
        voice: "ಧ್ವನಿ",
        consentTitle: "ಗೌಪ್ಯತೆ ಮತ್ತು ಒಪ್ಪಿಗೆ",
        consentText:
            "ಇದು ಸಹಾಯಕ ಸ್ಕ್ರೀನಿಂಗ್ ಸಾಧನವಾಗಿದೆ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.",
        agree: "ಅರ್ಥವಾಗಿದೆ ಮತ್ತು ಮುಂದುವರಿಸಿ",

        tellUs: "ನೀವು ಅನುಭವಿಸುತ್ತಿರುವುದನ್ನು ತಿಳಿಸಿ",
        placeholder:
            "ಏನಾಯಿತು, ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ ಅಥವಾ ಯಾವುದರ ಬಗ್ಗೆ ಚಿಂತೆಯಿದೆ ಎಂದು ಬರೆಯಿರಿ...",
        analyze: "AI ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಿ",

        assessmentResult: "ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶ",
        svi: "ಒತ್ತಡ ದುರ್ಬಲತೆ ಸೂಚ್ಯಂಕ",
        low: "ಕಡಿಮೆ",
        moderate: "ಮಧ್ಯಮ",
        high: "ಹೆಚ್ಚು",
        critical: "ಗಂಭೀರ",

        keyIndicators: "ಮುಖ್ಯ ಸೂಚನೆಗಳು",
        recommendations: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಂಬಲ",

        counselling: "ಸಮಾಲೋಚನೆ",
        legalAid: "ಕಾನೂನು ನೆರವು",
        medical: "ವೈದ್ಯಕೀಯ ನೆರವು",
        police: "ಪೊಲೀಸ್ ಸಹಾಯ",
        emergencySupport: "ತುರ್ತು ನೆರವು",

        locationActive: "ಸ್ಥಳ ಸಕ್ರಿಯ",
        locationReady: "ಸ್ಥಳ ಸಿದ್ಧವಾಗಿದೆ.",
        locationError: "ಸ್ಥಳ ಪಡೆಯಲಾಗಲಿಲ್ಲ.",

        journeyStart: "ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
        journeyStop: "ಪ್ರಯಾಣ ಮುಗಿಸಿ",

        notes: "ಟಿಪ್ಪಣಿಗಳು",
        save: "ಉಳಿಸಿ",
        delete: "ಅಳಿಸಿ",

        ready: "ಸಿದ್ಧ",
        activated: "ಸಕ್ರಿಯ",

        disclaimer:
            "ಈ ವೇದಿಕೆ ಸಹಾಯಕ ಸುರಕ್ಷತಾ ಸಾಧನಗಳು ಮತ್ತು ಸ್ಕ್ರೀನಿಂಗ್ ನೀಡುತ್ತದೆ.",

        fakeIncoming: "ಒಳಬರುವ ಕರೆ",
        answer: "ಸ್ವೀಕರಿಸಿ",
        decline: "ತಿರಸ್ಕರಿಸಿ",

        noContacts: "ಇನ್ನೂ ವಿಶ್ವಾಸಾರ್ಹ ಸಂಪರ್ಕಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ.",

        language: "ಭಾಷೆ",

        safetyTip1: "ಜನಸಂದಣಿ ಮತ್ತು ಬೆಳಕು ಇರುವ ಸ್ಥಳಕ್ಕೆ ತೆರಳಿ.",
        safetyTip2: "ನೀವು ನಂಬುವ ವ್ಯಕ್ತಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        safetyTip3: "ತಕ್ಷಣದ ಅಪಾಯವಿದ್ದರೆ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        safetyTip4: "ಫೋನ್ ಚಾರ್ಜ್ ಮಾಡಿಕೊಂಡು ಹತ್ತಿರದಲ್ಲಿಡಿ.",
        safetyTip5: "ಬೆದರಿಕೆ ನೀಡುವ ವ್ಯಕ್ತಿಯನ್ನು ಎದುರಿಸಬೇಡಿ.",

        evidenceSaved: "ಸಾಕ್ಷ್ಯ ಉಳಿಸಲಾಗಿದೆ.",
        sirenStarted: "ತುರ್ತು ಸೈರನ್ ಸಕ್ರಿಯವಾಗಿದೆ.",
        sirenStopped: "ಸೈರನ್ ನಿಲ್ಲಿಸಲಾಗಿದೆ.",
        flashStarted: "ಸ್ಕ್ರೀನ್ ಫ್ಲ್ಯಾಶ್ ಸಕ್ರಿಯವಾಗಿದೆ.",
        fakeCallStarted: "ನಕಲಿ ಕರೆ ಪ್ರಾರಂಭವಾಗಿದೆ.",
        sosActivated: "SOS ಸಕ್ರಿಯವಾಗಿದೆ.",
        journeyStarted: "ಪ್ರಯಾಣ ಪ್ರಾರಂಭವಾಗಿದೆ.",
        journeyEnded: "ಪ್ರಯಾಣ ಮುಗಿದಿದೆ."
    },


    te: {
        tagline: "మీ భద్రత. మీ స్వరం. మీ రక్షణ.",
        platform: "మహిళల భద్రత & సహాయ వేదిక",

        home: "హోమ్",
        safety: "తక్షణ భద్రత",
        assessment: "AI అంచనా",
        contacts: "నమ్మకమైన పరిచయాలు",
        dashboard: "డ్యాష్‌బోర్డ్",
        evidence: "సాక్ష్యం",
        settings: "సెట్టింగ్స్",

        immediateTitle: "తక్షణ భద్రత",
        immediateText:
            "ఇప్పుడే సహాయం అవసరమైనప్పుడు ఉపయోగించడానికి అత్యవసర భద్రతా సాధనాలు.",

        traumaTitle: "AI ఒత్తిడి & ట్రామా అంచనా",
        traumaText:
            "ఒత్తిడి, భయం, ఆందోళన మరియు ట్రామా సూచనలను అర్థం చేసుకునే ప్రైవేట్ స్క్రీనింగ్.",

        getHelp: "సహాయం పొందండి",
        startAssessment: "అంచనా ప్రారంభించండి",

        emergencySOS: "అత్యవసర SOS",
        pressHold: "నొక్కి పట్టుకోండి",

        silentSOS: "సైలెంట్ SOS",
        autoSOS: "ఆటో SOS",
        liveLocation: "లైవ్ లొకేషన్",
        shareLocation: "లొకేషన్ షేర్",
        emergencyCall: "ఎమర్జెన్సీ కాల్",
        journeySafety: "ప్రయాణ భద్రత",
        evidenceCollection: "సాక్ష్యాల సేకరణ",
        siren: "సైరన్",
        screenFlash: "స్క్రీన్ ఫ్లాష్",
        fakeCall: "ఫేక్ కాల్",
        safetyTips: "భద్రతా సూచనలు",

        trustedContacts: "నమ్మకమైన పరిచయాలు",
        addContact: "పరిచయం జోడించండి",
        manage: "నిర్వహించండి",

        text: "టెక్స్ట్",
        voice: "వాయిస్",
        consentTitle: "గోప్యత & సమ్మతి",
        consentText:
            "ఇది సహాయక స్క్రీనింగ్ సాధనం. ఇది వైద్య నిర్ధారణ కాదు.",
        agree: "అర్థమైంది & కొనసాగించండి",

        tellUs: "మీరు అనుభవిస్తున్నది చెప్పండి",
        placeholder:
            "ఏమి జరిగింది, మీకు ఎలా అనిపిస్తోంది లేదా మీకు ఏమి భయంగా ఉంది అని రాయండి...",
        analyze: "AI తో విశ్లేషించండి",

        assessmentResult: "మీ అంచనా ఫలితం",
        svi: "స్ట్రెస్ వల్నరబిలిటీ ఇండెక్స్",
        low: "తక్కువ",
        moderate: "మధ్యస్థ",
        high: "అధిక",
        critical: "క్రిటికల్",

        keyIndicators: "ముఖ్య సూచనలు",
        recommendations: "సిఫార్సు చేసిన సహాయం",

        counselling: "కౌన్సెలింగ్",
        legalAid: "చట్టపరమైన సహాయం",
        medical: "వైద్య సహాయం",
        police: "పోలీస్ సహాయం",
        emergencySupport: "అత్యవసర సహాయం",

        locationActive: "లొకేషన్ యాక్టివ్",
        locationReady: "లొకేషన్ సిద్ధంగా ఉంది.",
        locationError: "లొకేషన్ పొందలేకపోయాం.",

        journeyStart: "ప్రయాణం ప్రారంభించండి",
        journeyStop: "ప్రయాణం ముగించండి",

        notes: "నోట్స్",
        save: "సేవ్",
        delete: "తొలగించండి",

        ready: "సిద్ధం",
        activated: "యాక్టివ్",

        disclaimer:
            "ఈ వేదిక సహాయక భద్రతా సాధనాలు మరియు స్క్రీనింగ్ అందిస్తుంది.",

        fakeIncoming: "ఇన్‌కమింగ్ కాల్",
        answer: "సమాధానం",
        decline: "తిరస్కరించండి",

        noContacts: "ఇంకా నమ్మకమైన పరిచయాలు లేవు.",

        language: "భాష",

        safetyTip1: "ప్రజలు మరియు వెలుతురు ఉన్న ప్రాంతానికి వెళ్లండి.",
        safetyTip2: "మీరు నమ్మే వ్యక్తిని సంప్రదించండి.",
        safetyTip3: "తక్షణ ప్రమాదం ఉంటే అత్యవసర సేవలను సంప్రదించండి.",
        safetyTip4: "మీ ఫోన్‌ను చార్జ్ చేసి దగ్గర ఉంచుకోండి.",
        safetyTip5: "బెదిరించే వ్యక్తిని ఎదుర్కోవద్దు.",

        evidenceSaved: "సాక్ష్యం సేవ్ చేయబడింది.",
        sirenStarted: "ఎమర్జెన్సీ సైరన్ యాక్టివ్.",
        sirenStopped: "సైరన్ ఆపబడింది.",
        flashStarted: "స్క్రీన్ ఫ్లాష్ యాక్టివ్.",
        fakeCallStarted: "ఫేక్ కాల్ ప్రారంభమైంది.",
        sosActivated: "SOS యాక్టివ్.",
        journeyStarted: "ప్రయాణం ప్రారంభమైంది.",
        journeyEnded: "ప్రయాణం ముగిసింది."
    },


    ta: {
        tagline: "உங்கள் பாதுகாப்பு. உங்கள் குரல். உங்கள் கேடயம்.",
        platform: "பெண்கள் பாதுகாப்பு மற்றும் ஆதரவு தளம்",

        home: "முகப்பு",
        safety: "உடனடி பாதுகாப்பு",
        assessment: "AI மதிப்பீடு",
        contacts: "நம்பகமான தொடர்புகள்",
        dashboard: "டாஷ்போர்டு",
        evidence: "ஆதாரம்",
        settings: "அமைப்புகள்",

        immediateTitle: "உடனடி பாதுகாப்பு",
        immediateText:
            "உடனடி உதவி தேவைப்படும் நேரங்களில் பயன்படுத்தக்கூடிய அவசர பாதுகாப்பு கருவிகள்.",

        traumaTitle: "AI மனஅழுத்தம் & மனஅதிர்ச்சி மதிப்பீடு",
        traumaText:
            "மனஅழுத்தம், பயம், பதட்டம் மற்றும் மனஅதிர்ச்சி அறிகுறிகளுக்கான தனிப்பட்ட திரையிடல்.",

        getHelp: "உதவி பெறுங்கள்",
        startAssessment: "மதிப்பீட்டைத் தொடங்குங்கள்",

        emergencySOS: "அவசர SOS",
        pressHold: "அழுத்திப் பிடிக்கவும்",

        silentSOS: "அமைதியான SOS",
        autoSOS: "தானியங்கி SOS",
        liveLocation: "நேரடி இருப்பிடம்",
        shareLocation: "இருப்பிடத்தைப் பகிரவும்",
        emergencyCall: "அவசர அழைப்பு",
        journeySafety: "பயண பாதுகாப்பு",
        evidenceCollection: "ஆதார சேகரிப்பு",
        siren: "சைரன்",
        screenFlash: "திரை ஒளிர்வு",
        fakeCall: "போலி அழைப்பு",
        safetyTips: "பாதுகாப்பு குறிப்புகள்",

        trustedContacts: "நம்பகமான தொடர்புகள்",
        addContact: "தொடர்பு சேர்க்கவும்",
        manage: "நிர்வகிக்கவும்",

        text: "உரை",
        voice: "குரல்",
        consentTitle: "தனியுரிமை மற்றும் ஒப்புதல்",
        consentText:
            "இது ஒரு ஆதரவு திரையிடல் கருவி. இது மருத்துவ நோயறிதல் அல்ல.",
        agree: "புரிந்தது & தொடரவும்",

        tellUs: "நீங்கள் அனுபவிப்பதைப் பகிரவும்",
        placeholder:
            "என்ன நடந்தது, நீங்கள் எப்படி உணர்கிறீர்கள் அல்லது எதைப் பற்றி கவலைப்படுகிறீர்கள் என்பதை எழுதுங்கள்...",
        analyze: "AI மூலம் பகுப்பாய்வு",

        assessmentResult: "உங்கள் மதிப்பீட்டு முடிவு",
        svi: "மனஅழுத்த பாதிப்பு குறியீடு",
        low: "குறைவு",
        moderate: "மிதமான",
        high: "அதிகம்",
        critical: "மிகவும் ஆபத்து",

        keyIndicators: "முக்கிய அறிகுறிகள்",
        recommendations: "பரிந்துரைக்கப்பட்ட ஆதரவு",

        counselling: "ஆலோசனை",
        legalAid: "சட்ட உதவி",
        medical: "மருத்துவ உதவி",
        police: "காவல் உதவி",
        emergencySupport: "அவசர உதவி",

        locationActive: "இருப்பிடம் செயலில்",
        locationReady: "இருப்பிடம் தயாராக உள்ளது.",
        locationError: "இருப்பிடத்தைப் பெற முடியவில்லை.",

        journeyStart: "பயணத்தைத் தொடங்குங்கள்",
        journeyStop: "பயணத்தை முடிக்கவும்",

        notes: "குறிப்புகள்",
        save: "சேமி",
        delete: "நீக்கு",

        ready: "தயார்",
        activated: "செயலில்",

        disclaimer:
            "இந்த தளம் ஆதரவு பாதுகாப்பு கருவிகளையும் திரையிடலையும் வழங்குகிறது.",

        fakeIncoming: "உள்வரும் அழைப்பு",
        answer: "பதில்",
        decline: "நிராகரி",

        noContacts: "நம்பகமான தொடர்புகள் இன்னும் இல்லை.",

        language: "மொழி",

        safetyTip1: "மக்கள் மற்றும் வெளிச்சம் உள்ள இடத்திற்குச் செல்லுங்கள்.",
        safetyTip2: "நீங்கள் நம்பும் ஒருவரைத் தொடர்பு கொள்ளுங்கள்.",
        safetyTip3: "உடனடி ஆபத்து இருந்தால் அவசர சேவைகளைத் தொடர்பு கொள்ளுங்கள்.",
        safetyTip4: "உங்கள் தொலைபேசியை சார்ஜ் செய்து அருகில் வைத்திருங்கள்.",
        safetyTip5: "அச்சுறுத்தும் நபரை எதிர்கொள்ள வேண்டாம்.",

        evidenceSaved: "ஆதாரம் சேமிக்கப்பட்டது.",
        sirenStarted: "அவசர சைரன் செயல்படுத்தப்பட்டது.",
        sirenStopped: "சைரன் நிறுத்தப்பட்டது.",
        flashStarted: "திரை ஒளிர்வு செயல்படுத்தப்பட்டது.",
        fakeCallStarted: "போலி அழைப்பு தொடங்கியது.",
        sosActivated: "SOS செயல்படுத்தப்பட்டது.",
        journeyStarted: "பயணம் தொடங்கப்பட்டது.",
        journeyEnded: "பயணம் முடிந்தது."
    },


    hi: {
        tagline: "आपकी सुरक्षा। आपकी आवाज़। आपकी ढाल।",
        platform: "महिला सुरक्षा और सहायता प्लेटफॉर्म",

        home: "होम",
        safety: "तत्काल सुरक्षा",
        assessment: "AI आकलन",
        contacts: "भरोसेमंद संपर्क",
        dashboard: "डैशबोर्ड",
        evidence: "सबूत",
        settings: "सेटिंग्स",

        immediateTitle: "तत्काल सुरक्षा",
        immediateText:
            "जब आपको तुरंत मदद चाहिए तब उपयोग करने के लिए आपातकालीन सुरक्षा उपकरण।",

        traumaTitle: "AI तनाव और आघात आकलन",
        traumaText:
            "तनाव, डर, चिंता और आघात के संकेतों को समझने के लिए निजी स्क्रीनिंग।",

        getHelp: "मदद पाएं",
        startAssessment: "आकलन शुरू करें",

        emergencySOS: "आपातकालीन SOS",
        pressHold: "दबाकर रखें",

        silentSOS: "साइलेंट SOS",
        autoSOS: "ऑटो SOS",
        liveLocation: "लाइव लोकेशन",
        shareLocation: "लोकेशन शेयर करें",
        emergencyCall: "आपातकालीन कॉल",
        journeySafety: "यात्रा सुरक्षा",
        evidenceCollection: "सबूत संग्रह",
        siren: "सायरन",
        screenFlash: "स्क्रीन फ्लैश",
        fakeCall: "फर्जी कॉल",
        safetyTips: "सुरक्षा सुझाव",

        trustedContacts: "भरोसेमंद संपर्क",
        addContact: "संपर्क जोड़ें",
        manage: "प्रबंधित करें",

        text: "टेक्स्ट",
        voice: "वॉइस",
        consentTitle: "गोपनीयता और सहमति",
        consentText:
            "यह एक सहायक स्क्रीनिंग टूल है। यह मेडिकल निदान नहीं है।",
        agree: "समझ गई/गया और जारी रखें",

        tellUs: "आप जो अनुभव कर रहे हैं उसे बताएं",
        placeholder:
            "क्या हुआ, आपको कैसा महसूस हो रहा है या आपको किस बात की चिंता है, लिखें...",
        analyze: "AI से विश्लेषण करें",

        assessmentResult: "आपका आकलन परिणाम",
        svi: "तनाव भेद्यता सूचकांक",
        low: "कम",
        moderate: "मध्यम",
        high: "उच्च",
        critical: "गंभीर",

        keyIndicators: "मुख्य संकेत",
        recommendations: "अनुशंसित सहायता",

        counselling: "काउंसलिंग",
        legalAid: "कानूनी सहायता",
        medical: "चिकित्सा सहायता",
        police: "पुलिस सहायता",
        emergencySupport: "आपातकालीन सहायता",

        locationActive: "लोकेशन सक्रिय",
        locationReady: "लोकेशन तैयार है।",
        locationError: "लोकेशन प्राप्त नहीं हो सकी।",

        journeyStart: "यात्रा शुरू करें",
        journeyStop: "यात्रा समाप्त करें",

        notes: "नोट्स",
        save: "सहेजें",
        delete: "हटाएं",

        ready: "तैयार",
        activated: "सक्रिय",

        disclaimer:
            "यह प्लेटफॉर्म सहायक सुरक्षा उपकरण और स्क्रीनिंग प्रदान करता है।",

        fakeIncoming: "इनकमिंग कॉल",
        answer: "उत्तर दें",
        decline: "अस्वीकार करें",

        noContacts: "अभी कोई भरोसेमंद संपर्क नहीं है।",

        language: "भाषा",

        safetyTip1: "लोगों और रोशनी वाली जगह पर जाएं।",
        safetyTip2: "किसी भरोसेमंद व्यक्ति से संपर्क करें।",
        safetyTip3: "तत्काल खतरे में आपातकालीन सेवाओं से संपर्क करें।",
        safetyTip4: "फोन चार्ज करके पास रखें।",
        safetyTip5: "धमकी देने वाले व्यक्ति का सामना न करें।",

        evidenceSaved: "सबूत सुरक्षित किया गया।",
        sirenStarted: "आपातकालीन सायरन सक्रिय है।",
        sirenStopped: "सायरन बंद किया गया।",
        flashStarted: "स्क्रीन फ्लैश सक्रिय है।",
        fakeCallStarted: "फर्जी कॉल शुरू हो गई।",
        sosActivated: "SOS सक्रिय हो गया।",
        journeyStarted: "यात्रा शुरू हो गई।",
        journeyEnded: "यात्रा समाप्त हो गई।"
    }
};


/* ============================================================
   TRANSLATION HELPER
   ============================================================ */

function t(key) {

    return (
        translations[state.language]?.
