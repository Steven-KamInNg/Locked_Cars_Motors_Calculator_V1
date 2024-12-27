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
    while (currentTime < locked) {
        let nextHour = new Date(currentTime);
        nextHour.setHours(nextHour.getHours() + 1);
        if (nextHour > locked) {
            nextHour = locked;
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
    let StoringFeeRate;
    if (vehicleType === '私家車') {
        TowingFee = 1500;
        StoringFeeRate = 100;
    } else if (vehicleType === '電單車') {
        TowingFee = 750;
        StoringFeeRate = 50;
    }
    
    let StoringDays = 0;


    const StoringFee = 0; // Add your logic to calculate Storing Fee
    const TotalFee = ParkingFee + TowingFee + StoringFee;

    document.getElementById('result').innerText = `泊車費: ${ParkingFee.toFixed(2)} MOP\n移走費: ${TowingFee.toFixed(2)} MOP\n存倉費: ${StoringFee.toFixed(2)} MOP\n總費用: ${TotalFee.toFixed(2)} MOP`;
}