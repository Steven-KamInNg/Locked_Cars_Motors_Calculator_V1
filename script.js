function calculateFee() {
    const entryTime = document.getElementById('entry_time').value;
    const lockedTime = document.getElementById('locked_time').value;
    const paidTime = document.getElementById('paid_time').value;
    const exitTime = document.getElementById('exit_time').value;
    const vehicleType = document.getElementById('vehicle_type').value;

    const dayRate = vehicleType === "私家車" ? 6 : 2;
    const nightRate = vehicleType === "私家車" ? 3 : 1;

    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
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
    const totalFee = (totalDayHours * dayRate) + (totalNightHours * nightRate);

    document.getElementById('result').innerText = `停車費: ${totalFee.toFixed(2)} MOP`;
}