function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function calculateFee() {
    const entryTime = document.getElementById('entry_time').value;
    const exitTime = document.getElementById('exit_time').value;
    const lockedTime = document.getElementById('locked_time').value;
    const unlockedTime = document.getElementById('unlocked_time').value;
    const callingPoliceTime = document.getElementById('calling_police_time').value;
    const leavingTime = document.getElementById('leaving_time').value;
    const vehicleType = document.getElementById('vehicle_type').value;

    const dayRate = vehicleType === "私家車" ? 6 : 2;
    const nightRate = vehicleType === "私家車" ? 3 : 1;

    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const locked = new Date(lockedTime);
    const unlocked = new Date(unlockedTime);
    const callingPolice = new Date(callingPoliceTime);
    const leaving = new Date(leavingTime);

    let totalDayHours = 0;
    let totalNightHours = 0;

    let currentTime = entry;
    while (currentTime < exit) {
        let nextHour = new Date(currentTime);
        nextHour.setHours(nextHour.getHours() + 1);
        if (nextHour > exit) {
            nextHour = exit;
        }
        if (currentTime.getHours() >= 8 && currentTime.getHours() < 20) {
            totalDayHours += (nextHour - currentTime) / 3600000;
        } else {
            totalNightHours += (nextHour - currentTime) / 3600000;
        }
        currentTime = nextHour;
    }

    totalDayHours = Math.ceil(totalDayHours);
    totalNightHours = Math.ceil(totalNightHours);
    const ParkingFee = (totalDayHours * dayRate) + (totalNightHours * nightRate);

    let TowingFee;
    if (vehicleType === '私家車') {
        TowingFee = 1500;
    } else if (vehicleType === '電單車') {
        TowingFee = 750;
    }

    const StoringFee = 100; // Add your logic to calculate Storing Fee
    const TotalFee = ParkingFee + TowingFee + StoringFee;

    const resultText = `
        入場時間: ${formatDateTime(entry)}\n
        繳費時間💲: ${formatDateTime(exit)}\n
        鎖車時間: ${formatDateTime(locked)}\n
        開鎖時間: ${formatDateTime(unlocked)}\n
        通知警察時間: ${formatDateTime(callingPolice)}\n
        出場時間: ${formatDateTime(leaving)}\n
        泊車費: ${ParkingFee.toFixed(2)} MOP\n
        移走費: ${TowingFee.toFixed(2)} MOP\n
        存倉費: ${StoringFee.toFixed(2)} MOP\n
        總費用: ${TotalFee.toFixed(2)} MOP
    `;
    
    document.getElementById('result').innerText = resultText;
}