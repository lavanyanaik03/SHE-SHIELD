/* =========================================================
   SHE-SHIELD
   Browser-based safety + AI screening prototype
   ========================================================= */

const state = {

    language:
        localStorage.getItem("sheShieldLanguage") || "en",

    contacts:
        JSON.parse(
            localStorage.getItem("sheShieldContacts") || "[]"
        ),

    location: null,

    siren: null,

    countdown: null,

    recognition: null,

    journeyStart: null

};


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

en: {

    tagline:
        "Your Safety, Our Priority.",

    platform:
        "Safety & Support Platform",

    home:
        "Home",

    immediateSafety:
        "Immediate Safety",

    assessment:
        "AI Assessment",

    contacts:
        "Contacts",

    immediateTitle:
        "Immediate Safety",

    immediateDescription:
        "Need help right now? Access emergency SOS, live location, trusted contacts and safety tools.",

    assessmentTitle:
        "AI Stress & Trauma Assessment",

    assessmentDescription:
        "Talk or write about what you are experiencing and receive an explainable screening result.",

    getHelp:
        "Get Help",

    startAssessment:
        "Start Assessment",

    safetyTools:
        "Safety Tools",

    emergencySOS:
        "Emergency SOS",

    silentSOS:
        "Silent SOS",

    autoSOS:
        "Auto SOS",

    liveLocation:
        "Live Location",

    shareLocation:
        "Share Location",

    emergencyCall:
        "Emergency Call",

    journey:
        "Journey Safety",

    evidence:
        "Evidence Collection",

    siren:
        "Siren",

    screenFlash:
        "Screen Flash",

    fakeCall:
        "Fake Call",

    safetyTips:
        "Safety Tips",

    trustedContacts:
        "Trusted Contacts",

    ready:
        "Ready",

    press:
        "Press / Tap",

    language:
        "Language",

    text:
        "Text",

    voice:
        "Voice",

    analyze:
        "Analyze with AI",

    stopVoice:
        "Stop Listening",

    consent:
        "I understand that this is a screening tool and not a medical diagnosis, and I consent to analysis of the information I provide.",

    svi:
        "Stress Vulnerability Index",

    low:
        "Low",

    moderate:
        "Moderate",

    high:
        "High",

    critical:
        "Critical",

    recommendations:
        "Support Recommendations",

    counselling:
        "Counselling",

    legalAid:
        "Legal Aid",

    medical:
        "Medical Support",

    police:
        "Police Intervention",

    emergencySupport:
        "Emergency Support",

    name:
        "Name",

    phone:
        "Phone",

    addContact:
        "Add Contact",

    delete:
        "Delete",

    noContacts:
        "No trusted contacts added yet.",

    save:
        "Save",

    addEvidence:
        "Add Evidence",

    notes:
        "Notes",

    locationReady:
        "Location ready.",

    locationFailed:
        "Unable to access location.",

    locationPermission:
        "Location permission is needed only when you use a location feature.",

    sosActivated:
        "SOS activated.",

    sirenActivated:
        "Siren activated.",

    sirenStopped:
        "Siren stopped.",

    flashActivated:
        "Screen flash activated.",

    fakeCallStarted:
        "Fake call started.",

    saved:
        "Saved.",

    deleted:
        "Deleted.",

    journeyStarted:
        "Journey started.",

    journeyEnded:
        "Journey ended.",

    disclaimer:
        "A website cannot bypass browser permissions or secretly send calls/SMS. Your device must approve these actions."

},

kn: {

    tagline:
        "ನಿಮ್ಮ ಸುರಕ್ಷತೆ, ನಮ್ಮ ಆದ್ಯತೆ.",

    platform:
        "ಸುರಕ್ಷತೆ ಮತ್ತು ಬೆಂಬಲ ವೇದಿಕೆ",

    home:
        "ಮುಖಪುಟ",

    immediateSafety:
        "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",

    assessment:
        "AI ಮೌಲ್ಯಮಾಪನ",

    contacts:
        "ಸಂಪರ್ಕಗಳು",

    immediateTitle:
        "ತಕ್ಷಣದ ಸುರಕ್ಷತೆ",

    immediateDescription:
        "ಈಗ ಸಹಾಯ ಬೇಕೇ? ತುರ್ತು SOS, ಲೈವ್ ಸ್ಥಳ, ವಿಶ್ವಾಸಾರ್ಹ ಸಂಪರ್ಕಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ಸಾಧನಗಳನ್ನು ಬಳಸಿ.",

    assessmentTitle:
        "AI ಒತ್ತಡ ಮತ್ತು ಆಘಾತ ಮೌಲ್ಯಮಾಪನ",

    assessmentDescription:
        "ನೀವು ಅನುಭವಿಸುತ್ತಿರುವುದನ್ನು ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ ಮತ್ತು ಪ್ರಾಥಮಿಕ ಮೌಲ್ಯಮಾಪನ ಪಡೆಯಿರಿ.",

    getHelp:
        "ಸಹಾಯ ಪಡೆಯಿರಿ",

    startAssessment:
        "ಮೌಲ್ಯಮಾಪನ ಆರಂಭಿಸಿ",

    safetyTools:
        "ಸುರಕ್ಷತಾ ಸಾಧನಗಳು",

    emergencySOS:
        "ತುರ್ತು SOS",

    silentSOS:
        "ಮೌನ SOS",

    autoSOS:
        "ಸ್ವಯಂ SOS",

    liveLocation:
        "ಲೈವ್ ಸ್ಥಳ",

    shareLocation:
        "ಸ್ಥಳ ಹಂಚಿಕೊಳ್ಳಿ",

    emergencyCall:
        "ತುರ್ತು ಕರೆ",

    journey:
        "ಪ್ರಯಾಣ ಸುರಕ್ಷತೆ",

    evidence:
        "ಸಾಕ್ಷ್ಯ ಸಂಗ್ರಹ",

    siren:
        "ಸೈರನ್",

    screenFlash:
        "ಸ್ಕ್ರೀನ್ ಫ್ಲ್ಯಾಶ್",

    fakeCall:
        "ನಕಲಿ ಕರೆ",

    safetyTips:
        "ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು",

    trustedContacts:
        "ವಿಶ್ವಾಸಾರ್ಹ ಸಂಪರ್ಕಗಳು",

    ready:
        "ಸಿದ್ಧ",

    press:
        "ಒತ್ತಿ / ಟ್ಯಾಪ್ ಮಾಡಿ",

    language:
        "ಭಾಷೆ",

    text:
        "ಪಠ್ಯ",

    voice:
        "ಧ್ವನಿ",

    analyze:
        "AI ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಿ",

    stopVoice:
        "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",

    consent:
        "ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಂಡು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",

    svi:
        "ಒತ್ತಡ ದುರ್ಬಲತೆ ಸೂಚ್ಯಂಕ",

    low:
        "ಕಡಿಮೆ",

    moderate:
        "ಮಧ್ಯಮ",

    high:
        "ಹೆಚ್ಚು",

    critical:
        "ಗಂಭೀರ",

    recommendations:
        "ಬೆಂಬಲ ಶಿಫಾರಸುಗಳು",

    counselling:
        "ಸಮಾಲೋಚನೆ",

    legalAid:
        "ಕಾನೂನು ನೆರವು",

    medical:
        "ವೈದ್ಯಕೀಯ ನೆರವು",

    police:
        "ಪೊಲೀಸ್ ಸಹಾಯ",

    emergencySupport:
        "ತುರ್ತು ನೆರವು",

    name:
        "ಹೆಸರು",

    phone:
        "ಫೋನ್",

    addContact:
        "ಸಂಪರ್ಕ ಸೇರಿಸಿ",

    delete:
        "ಅಳಿಸಿ",

    noContacts:
        "ಇನ್ನೂ ಸಂಪರ್ಕಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ.",

    save:
        "ಉಳಿಸಿ",

    addEvidence:
        "ಸಾಕ್ಷ್ಯ ಸೇರಿಸಿ",

    notes:
        "ಟಿಪ್ಪಣಿಗಳು",

    locationReady:
        "ಸ್ಥಳ ಸಿದ್ಧವಾಗಿದೆ.",

    locationFailed:
        "ಸ್ಥಳ ಪಡೆಯಲಾಗಲಿಲ್ಲ.",

    locationPermission:
        "ಸ್ಥಳ ವೈಶಿಷ್ಟ್ಯ ಬಳಸಿದಾಗ ಮಾತ್ರ ಸ್ಥಳ ಅನುಮತಿ ಕೇಳಲಾಗುತ್ತದೆ.",

    sosActivated:
        "SOS ಸಕ್ರಿಯವಾಗಿದೆ.",

    sirenActivated:
        "ಸೈರನ್ ಸಕ್ರಿಯವಾಗಿದೆ.",

    sirenStopped:
        "ಸೈರನ್ ನಿಲ್ಲಿಸಲಾಗಿದೆ.",

    flashActivated:
        "ಸ್ಕ್ರೀನ್ ಫ್ಲ್ಯಾಶ್ ಸಕ್ರಿಯವಾಗಿದೆ.",

    fakeCallStarted:
        "ನಕಲಿ ಕರೆ ಪ್ರಾರಂಭವಾಗಿದೆ.",

    saved:
        "ಉಳಿಸಲಾಗಿದೆ.",

    deleted:
        "ಅಳಿಸಲಾಗಿದೆ.",

    journeyStarted:
        "ಪ್ರಯಾಣ ಆರಂಭಿಸಲಾಗಿದೆ.",

    journeyEnded:
        "ಪ್ರಯಾಣ ಮುಗಿಸಲಾಗಿದೆ.",

    disclaimer:
        "ವೆಬ್‌ಸೈಟ್ ಬ್ರೌಸರ್ ಅನುಮತಿಗಳನ್ನು ಮೀರಿ ಹೋಗಲು ಅಥವಾ ಗುಪ್ತವಾಗಿ ಕರೆ/SMS ಕಳುಹಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ."

},

te: {

    tagline:
        "మీ భద్రత, మా ప్రాధాన్యత.",

    platform:
        "భద్రత & సహాయ వేదిక",

    home:
        "హోమ్",

    immediateSafety:
        "తక్షణ భద్రత",

    assessment:
        "AI అంచనా",

    contacts:
        "కాంటాక్ట్స్",

    immediateTitle:
        "తక్షణ భద్రత",

    immediateDescription:
        "ఇప్పుడే సహాయం కావాలా? అత్యవసర SOS, లైవ్ లొకేషన్, నమ్మకమైన కాంటాక్ట్స్ మరియు భద్రతా సాధనాలను ఉపయోగించండి.",

    assessmentTitle:
        "AI ఒత్తిడి & ట్రామా అంచనా",

    assessmentDescription:
        "మీరు అనుభవిస్తున్నదాన్ని రాయండి లేదా మాట్లాడండి మరియు ప్రారంభ స్క్రీనింగ్ పొందండి.",

    getHelp:
        "సహాయం పొందండి",

    startAssessment:
        "అంచనా ప్రారంభించండి",

    safetyTools:
        "భద్రతా సాధనాలు",

    emergencySOS:
        "అత్యవసర SOS",

    silentSOS:
        "సైలెంట్ SOS",

    autoSOS:
        "ఆటో SOS",

    liveLocation:
        "లైవ్ లొకేషన్",

    shareLocation:
        "లొకేషన్ షేర్",

    emergencyCall:
        "అత్యవసర కాల్",

    journey:
        "ప్రయాణ భద్రత",

    evidence:
        "సాక్ష్యాల సేకరణ",

    siren:
        "సైరన్",

    screenFlash:
        "స్క్రీన్ ఫ్లాష్",

    fakeCall:
        "ఫేక్ కాల్",

    safetyTips:
        "భద్రతా సూచనలు",

    trustedContacts:
        "నమ్మకమైన కాంటాక్ట్స్",

    ready:
        "సిద్ధం",

    press:
        "నొక్కండి / ట్యాప్ చేయండి",

    language:
        "భాష",

    text:
        "టెక్స్ట్",

    voice:
        "వాయిస్",

    analyze:
        "AI తో విశ్లేషించండి",

    stopVoice:
        "వినడం ఆపు",

    consent:
        "ఇది వైద్య నిర్ధారణ కాదని అర్థం చేసుకుని నేను సమ్మతిస్తున్నాను.",

    svi:
        "స్ట్రెస్ వల్నరబిలిటీ ఇండెక్స్",

    low:
        "తక్కువ",

    moderate:
        "మధ్యస్థ",

    high:
        "అధిక",

    critical:
        "క్రిటికల్",

    recommendations:
        "సహాయ సూచనలు",

    counselling:
        "కౌన్సెలింగ్",

    legalAid:
        "చట్టపరమైన సహాయం",

    medical:
        "వైద్య సహాయం",

    police:
        "పోలీస్ సహాయం",

    emergencySupport:
        "అత్యవసర సహాయం",

    name:
        "పేరు",

    phone:
        "ఫోన్",

    addContact:
        "కాంటాక్ట్ జోడించండి",

    delete:
        "తొలగించండి",

    noContacts:
        "ఇంకా కాంటాక్ట్స్ లేవు.",

    save:
        "సేవ్",

    addEvidence:
        "సాక్ష్యం జోడించండి",

    notes:
        "నోట్స్",

    locationReady:
        "లొకేషన్ సిద్ధంగా ఉంది.",

    locationFailed:
        "లొకేషన్ పొందలేకపోయాం.",

    locationPermission:
        "లొకేషన్ ఫీచర్ ఉపయోగించినప్పుడు మాత్రమే అనుమతి అడుగుతుంది.",

    sosActivated:
        "SOS సక్రియమైంది.",

    sirenActivated:
        "సైరన్ సక్రియమైంది.",

    sirenStopped:
        "సైరన్ ఆపబడింది.",

    flashActivated:
        "స్క్రీన్ ఫ్లాష్ సక్రియమైంది.",

    fakeCallStarted:
        "ఫేక్ కాల్ ప్రారంభమైంది.",

    saved:
        "సేవ్ చేయబడింది.",

    deleted:
        "తొలగించబడింది.",

    journeyStarted:
        "ప్రయాణం ప్రారంభమైంది.",

    journeyEnded:
        "ప్రయాణం ముగిసింది.",

    disclaimer:
        "వెబ్‌సైట్ బ్రౌజర్ అనుమతులను దాటలేను లేదా రహస్యంగా కాల్/SMS పంపలేను."

},

ta: {

    tagline:
        "உங்கள் பாதுகாப்பு, எங்கள் முன்னுரிமை.",

    platform:
        "பாதுகாப்பு மற்றும் ஆதரவு தளம்",

    home:
        "முகப்பு",

    immediateSafety:
        "உடனடி பாதுகாப்பு",

    assessment:
        "AI மதிப்பீடு",

    contacts:
        "தொடர்புகள்",

    immediateTitle:
        "உடனடி பாதுகாப்பு",

    immediateDescription:
        "இப்போது உதவி வேண்டுமா? அவசர SOS, நேரடி இருப்பிடம், நம்பகமான தொடர்புகள் மற்றும் பாதுகாப்பு கருவிகளைப் பயன்படுத்துங்கள்.",

    assessmentTitle:
        "AI மனஅழுத்தம் & மனஅதிர்ச்சி மதிப்பீடு",

    assessmentDescription:
        "நீங்கள் அனுபவிப்பதை எழுதவும் அல்லது பேசவும் செய்து ஆரம்ப திரையிடலைப் பெறுங்கள்.",

    getHelp:
        "உதவி பெறுங்கள்",

    startAssessment:
        "மதிப்பீட்டைத் தொடங்குங்கள்",

    safetyTools:
        "பாதுகாப்பு கருவிகள்",

    emergencySOS:
        "அவசர SOS",

    silentSOS:
        "அமைதியான SOS",

    autoSOS:
        "தானியங்கி SOS",

    liveLocation:
        "நேரடி இருப்பிடம்",

    shareLocation:
        "இருப்பிடத்தைப் பகிரவும்",

    emergencyCall:
        "அவசர அழைப்பு",

    journey:
        "பயண பாதுகாப்பு",

    evidence:
        "ஆதார சேகரிப்பு",

    siren:
        "சைரன்",

    screenFlash:
        "திரை ஒளிர்வு",

    fakeCall:
        "போலி அழைப்பு",

    safetyTips:
        "பாதுகாப்பு குறிப்புகள்",

    trustedContacts:
        "நம்பகமான தொடர்புகள்",

    ready:
        "தயார்",

    press:
        "அழுத்தவும் / தட்டவும்",

    language:
        "மொழி",

    text:
        "உரை",

    voice:
        "குரல்",

    analyze:
        "AI மூலம் பகுப்பாய்வு",

    stopVoice:
        "கேட்பதை நிறுத்து",

    consent:
        "இது மருத்துவ நோயறிதல் அல்ல என்பதைப் புரிந்து கொண்டு நான் சம்மதிக்கிறேன்.",

    svi:
        "மனஅழுத்த பாதிப்பு குறியீடு",

    low:
        "குறைவு",

    moderate:
        "மிதமான",

    high:
        "அதிகம்",

    critical:
        "மிகவும் ஆபத்து",

    recommendations:
        "ஆதரவு பரிந்துரைகள்",

    counselling:
        "ஆலோசனை",

    legalAid:
        "சட்ட உதவி",

    medical:
        "மருத்துவ உதவி",

    police:
        "காவல் உதவி",

    emergencySupport:
        "அவசர உதவி",

    name:
        "பெயர்",

    phone:
        "தொலைபேசி",

    addContact:
        "தொடர்பு சேர்க்கவும்",

    delete:
        "நீக்கு",

    noContacts:
        "நம்பகமான தொடர்புகள் இன்னும் இல்லை.",

    save:
        "சேமி",

    addEvidence:
        "ஆதாரம் சேர்க்கவும்",

    notes:
        "குறிப்புகள்",

    locationReady:
        "இருப்பிடம் தயாராக உள்ளது.",

    locationFailed:
        "இருப்பிடத்தைப் பெற முடியவில்லை.",

    locationPermission:
        "இருப்பிட அம்சத்தைப் பயன்படுத்தும்போது மட்டுமே அனுமதி கேட்கப்படும்.",

    sosActivated:
        "SOS செயல்படுத்தப்பட்டது.",

    sirenActivated:
        "சைரன் செயல்படுத்தப்பட்டது.",

    sirenStopped:
        "சைரன் நிறுத்தப்பட்டது.",

    flashActivated:
        "திரை ஒளிர்வு செயல்படுத்தப்பட்டது.",

    fakeCallStarted:
        "போலி அழைப்பு தொடங்கியது.",

    saved:
        "சேமிக்கப்பட்டது.",

    deleted:
        "நீக்கப்பட்டது.",

    journeyStarted:
        "பயணம் தொடங்கப்பட்டது.",

    journeyEnded:
        "பயணம் முடிந்தது.",

    disclaimer:
        "வலைத்தளம் உலாவி அனுமதிகளைத் தவிர்க்கவோ ரகசியமாக அழைப்பு/SMS அனுப்பவோ முடியாது."

},

hi: {

    tagline:
        "आपकी सुरक्षा, हमारी प्राथमिकता।",

    platform:
        "सुरक्षा और सहायता प्लेटफॉर्म",

    home:
        "होम",

    immediateSafety:
        "तत्काल सुरक्षा",

    assessment:
        "AI आकलन",

    contacts:
        "संपर्क",

    immediateTitle:
        "तत्काल सुरक्षा",

    immediateDescription:
        "अभी मदद चाहिए? आपातकालीन SOS, लाइव लोकेशन, भरोसेमंद संपर्क और सुरक्षा उपकरणों का उपयोग करें।",

    assessmentTitle:
        "AI तनाव और आघात आकलन",

    assessmentDescription:
        "आप जो अनुभव कर रहे हैं उसे लिखें या बोलें और प्रारंभिक स्क्रीनिंग प्राप्त करें।",

    getHelp:
        "मदद पाएं",

    startAssessment:
        "आकलन शुरू करें",

    safetyTools:
        "सुरक्षा उपकरण",

    emergencySOS:
        "आपातकालीन SOS",

    silentSOS:
        "साइलेंट SOS",

    autoSOS:
        "ऑटो SOS",

    liveLocation:
        "लाइव लोकेशन",

    shareLocation:
        "लोकेशन शेयर करें",

    emergencyCall:
        "आपातकालीन कॉल",

    journey:
        "यात्रा सुरक्षा",

    evidence:
        "सबूत संग्रह",

    siren:
        "सायरन",

    screenFlash:
        "स्क्रीन फ्लैश",

    fakeCall:
        "फर्जी कॉल",

    safetyTips:
        "सुरक्षा सुझाव",

    trustedContacts:
        "भरोसेमंद संपर्क",

    ready:
        "तैयार",

    press:
        "दबाएं / टैप करें",

    language:
        "भाषा",

    text:
        "टेक्स्ट",

    voice:
        "वॉइस",

    analyze:
        "AI से विश्लेषण करें",

    stopVoice:
        "सुनना बंद करें",

    consent:
        "मैं समझता/समझती हूं कि यह मेडिकल निदान नहीं है और दी गई जानकारी के विश्लेषण के लिए सहमत हूं।",

    svi:
        "तनाव भेद्यता सूचकांक",

    low:
        "कम",

    moderate:
        "मध्यम",

    high:
        "उच्च",

    critical:
        "गंभीर",

    recommendations:
        "सहायता सुझाव",

    counselling:
        "काउंसलिंग",

    legalAid:
        "कानूनी सहायता",

    medical:
        "चिकित्सा सहायता",

    police:
        "पुलिस सहायता",

    emergencySupport:
        "आपातकालीन सहायता",

    name:
        "नाम",

    phone:
        "फोन",

    addContact:
        "संपर्क जोड़ें",

    delete:
        "हटाएं",

    noContacts:
        "अभी कोई भरोसेमंद संपर्क नहीं है।",

    save:
        "सहेजें",

    addEvidence:
        "सबूत जोड़ें",

    notes:
        "नोट्स",

    locationReady:
        "लोकेशन तैयार है।",

    locationFailed:
        "लोकेशन प्राप्त नहीं हो सकी।",

    locationPermission:
        "लोकेशन फीचर इस्तेमाल करने पर ही अनुमति मांगी जाएगी।",

    sosActivated:
        "SOS सक्रिय हो गया है।",

    sirenActivated:
        "सायरन सक्रिय है।",

    sirenStopped:
        "सायरन बंद है।",

    flashActivated:
        "स्क्रीन फ्लैश सक्रिय है।",

    fakeCallStarted:
        "फर्जी कॉल शुरू हो गई है।",

    saved:
        "सहेजा गया।",

    deleted:
        "हटा दिया गया।",

    journeyStarted:
        "यात्रा शुरू हो गई।",

    journeyEnded:
        "यात्रा समाप्त हो गई।",

    disclaimer:
        "वेबसाइट ब्राउज़र की अनुमति को बायपास नहीं कर सकती और गुप्त रूप से कॉल/SMS नहीं भेज सकती।"

}

};


/* =========================================================
   HELPER
   ========================================================= */

function t(key) {

    return (
        translations[state.language]?.[key] ||
        translations.en[key] ||
        key
    );

}


function toast(message) {

    const box =
        document.getElementById("toast");

    box.textContent = message;

    box.classList.add("show");

    setTimeout(() => {

        box.classList.remove("show");

    }, 2800);

}


function saveData() {

    localStorage.setItem(
        "sheShieldLanguage",
        state.language
    );

    localStorage.setItem(
        "sheShieldContacts",
        JSON.stringify(state.contacts)
    );

}


/* =========================================================
   HOME
   ========================================================= */

function homePage() {

    return `

    <section class="hero">

        <div>

            <div class="eyebrow">
                AI-POWERED WOMEN SAFETY PLATFORM
            </div>

            <h1>
                Your safety is
                <span>ready.</span>
            </h1>

            <p>
                ${t("immediateDescription")}
                ${t("assessmentDescription")}
            </p>


            <div class="choice-grid">

                <article class="choice-card">

                    <div class="choice-icon">
                        🛡️
                    </div>

                    <h2>
                        ${t("immediateTitle")}
                    </h2>

                    <p>
                        ${t("immediateDescription")}
                    </p>

                    <button
                        class="gold-btn"
                        onclick="showPage('safety')"
                    >
                        ${t("getHelp")} →
                    </button>

                </article>


                <article class="choice-card">

                    <div class="choice-icon">
                        🧠
                    </div>

                    <h2>
                        ${t("assessmentTitle")}
                    </h2>

                    <p>
                        ${t("assessmentDescription")}
                    </p>

                    <button
                        class="outline-btn"
                        onclick="showPage('assessment')"
                    >
                        ${t("startAssessment")} →
                    </button>

                </article>

            </div>

        </div>


        <div class="hero-logo">

            <img
                src="she-shield-logo.png.jpeg"
                alt="SHE-SHIELD"
            >

        </div>

    </section>

    `;

}


/* =========================================================
   SAFETY PAGE
   ========================================================= */

function safetyPage() {

    return `

    <section class="panel">

        <div class="eyebrow">
            SHE-SHIELD
        </div>

        <h2>
            ${t("immediateTitle")}
        </h2>

        <p>
            ${t("disclaimer")}
        </p>


        <div class="sos-section">

            <button
                id="sosButton"
                class="sos-button"
            >

                ${t("emergencySOS")}

                <small>
                    ${t("press")}
                </small>

            </button>


            <div
                id="sosStatus"
                class="status"
            >
                ${t("ready")}
            </div>


            <div>

                <button
