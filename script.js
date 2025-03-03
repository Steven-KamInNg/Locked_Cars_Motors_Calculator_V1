function calculateFee() {
    const vehicleType = document.getElementById('vehicle_type').value;
    const entryTime = getDateFromInputs('entry_time_year', 'entry_time_month', 'entry_time_day', 'entry_time_hour', 'entry_time_minute');
    const lockedTime = getDateFromInputs('locked_time_year', 'locked_time_month', 'locked_time_day', 'locked_time_hour', 'locked_time_minute');
    const paidTime = getDateFromInputs('paid_time_year', 'paid_time_month', 'paid_time_day', 'paid_time_hour', 'paid_time_minute');
    const parkinglotName = document.getElementById('parking_lot_name').value;
    const plateNumber = document.getElementById('plate_number').value;
    const violationType = document.getElementById('violation_type').value;
    
    const dayRate = vehicleType === "私家車" ? 6 : 2;
    const nightRate = vehicleType === "私家車" ? 3 : 1;

    const entry = new Date(entryTime);
    const locked = new Date(lockedTime);
    const paid = new Date(paidTime);
    let totalDayHours = 0;
    let totalNightHours = 0;

    let currentTime = new Date(entry);

    while (currentTime < locked) {
        let nextHour = new Date(currentTime);
        nextHour.setHours(nextHour.getHours() + 1);
        if (nextHour > locked) {
            nextHour = new Date(locked);
        }
        let hoursDifference = (nextHour - currentTime) / (1000 * 3600);
        if (currentTime.getHours() >= 8 && currentTime.getHours() < 20) {
            totalDayHours += hoursDifference;
        } else {
            totalNightHours += hoursDifference;
        }
        currentTime = new Date(nextHour);
    }

    totalDayHours = Math.floor(totalDayHours) + (totalDayHours % 1 > 0 ? 1 : 0);
    totalNightHours = Math.floor(totalNightHours) + (totalNightHours % 1 > 0 ? 1 : 0);

    const parkingFee = (totalDayHours * dayRate) + (totalNightHours * nightRate);
    const towingFee = calculateTowingFee(vehicleType);
    const storingFee = calculateStoringFee(vehicleType, lockedTime, paidTime);
    const totalFee = parkingFee + towingFee + storingFee

    // Get the current date
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleString();

    document.getElementById('result').innerText = `<<收據>>\n 日期: ${formatDate(currentDate)}\n${parkinglotName}\n ${vehicleType} ${plateNumber} ${violationType}\n 入場時間: ${formatDate(entry)}\n 鎖車時間: ${formatDate(locked)}\n 存倉截止時間: ${formatDate(paid)}\n 泊車費: ${parkingFee.toFixed(2)} MOP； 移走費: ${towingFee.toFixed(2)} MOP； 存倉費: ${storingFee.toFixed(2)} MOP\n 總費用: ${totalFee.toFixed(2)} MOP\n 車主電話: ${document.getElementById('phone_number').value}`;

}

function getDateFromInputs(yearId, monthId, dayId, hourId, minuteId) {
    const year = document.getElementById(yearId).value;
    const month = document.getElementById(monthId).value - 1; // Month is zero-indexed
    const day = document.getElementById(dayId).value;
    const hour = document.getElementById(hourId).value;
    const minute = document.getElementById(minuteId).value;
    return new Date(year, month, day, hour, minute);
}

function formatDate(date) {
  return `${date.getFullYear()}/${padZero(date.getMonth() + 1)}/${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function calculateTowingFee(vehicleType) {
    const baseTowingFee = vehicleType === "私家車" ? 1500 : 750;
    return baseTowingFee;
}

function calculateStoringFee(vehicleType, lockedTime, paidTime) {
    const locked = new Date(lockedTime);
    const paid = new Date(paidTime);

    // Check if the duration between locked and paid is less than or equal to 3 hours
    if ((paid - locked) <= (3 * 60 * 60 * 1000)) {
        return 0;
    }

    // Start with one day after exceeding 3 hours
    let daysCount = 1;
    let currentTime = new Date(locked.getTime() + 3 * 60 * 60 * 1000); // Start counting after the first 3 hours
    let previousDay = currentTime.getDate();

    // Advance currentTime by 1 minute until paidTime
    while (currentTime < paid) {
        currentTime.setMinutes(currentTime.getMinutes() + 1);
        if (currentTime.getDate() !== previousDay) {
            daysCount += 1;
            previousDay = currentTime.getDate();
        }
    }

    // Storing fee per day
    const storingFeePerDay = vehicleType === "私家車" ? 100 : 50;
    const totalStoringFee = daysCount * storingFeePerDay;

    return totalStoringFee;
}
