document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    const clockElement = document.getElementById('clock');
    const alarmTimeInput = document.getElementById('alarmTime');
    const setAlarmBtn = document.getElementById('setAlarmBtn');

    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-GB');
    }, 1000);

    setAlarmBtn.addEventListener('click', () => {
        const time = alarmTimeInput.value;
        if (!time) {
            alert('कृपया समय चुनें!');
            return;
        }

        const [hour, minute] = time.split(':');
        const alarmDate = new Date();
        alarmDate.setHours(parseInt(hour, 10));
        alarmDate.setMinutes(parseInt(minute, 10));
        alarmDate.setSeconds(0);

        if (alarmDate < new Date()) {
            alarmDate.setDate(alarmDate.getDate() + 1);
        }

        // असली अलार्म का जादू, जो सीधे एंड्रॉइड से बात करता है
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "⏰ उठो!",
            text: "तुम्हारा अलार्म बज रहा है!",
            trigger: { at: alarmDate },
            sound: "file://audio/alarm.mp3", // यह आवाज़ हम बाद में डालेंगे
            foreground: true
        });
        
        alert('अलार्म लग गया है! यह ऐप बंद होने पर भी बजेगा।');
    });
}