function calculateFee() {
    const entryTime = document.getElementById('entry_time').value;
    const lockedTime = document.getElementById('locked_time').value;
    const paidTime = document.getElementById('paid_time').value;
    const exitTime = document.getElementById('exit_time').value;
    const vehicleType = document.getElementById('vehicle_type').value;

    const dayRate = vehicleType === "私家車" ? 6 : 2;
    const nightRate = vehicleType === "私家車" ? 3 : 1;

    const entry = new Date(entryTime);
    const lock = new Date(lockedTime);
    const paid = new Date(paidTime);
    
    let totalDayHours = 0;
    let totalNightHours = 0;

    let currentTime = entry;
    while (currentTime < lock) {
        let nextHour = new Date(currentTime);
        nextHour.setHours(nextHour.getHours() + 1);
        if (nextHour > lock) {
            nextHour = lock;
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
    
    let TowingFee = 0;
    if (vehicleType === '私家車') {
        TowingFee = 1500;
    } else if (vehicleType === '電單車') {
        TowingFee = 750;
    }
    
    let StoringFee = 0;
    let TotalFee = 0;
    TotalFee = ParkingFee + TowingFee + StoringFee

    document.getElementById('result').innerText = `泊車費: ${ParkingFee.toFixed(2)} MOP`;
    document.getElementById('result').innerText = `移走費: ${TowingFee.toFixed(2)} MOP`;
    document.getElementById('result').innerText = `存倉費: ${StoringFee.toFixed(2)} MOP`;
    document.getElementById('result').innerText = `總費用: ${TotalFee.toFixed(2)} MOP`;
    
}





