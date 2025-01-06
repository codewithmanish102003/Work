// Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion
function showTime() {
	// Getting current time and date
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	 let am_pm;

	// Setting time for 12 Hrs format
	if (hour >=12) {
		if (hour > 12){ 
			hour =hour- 12;
		am_pm = "PM";
		}
	} else if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}

	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	let currentTime =
		hour +
		":" +
		min +
		":" +
		sec +
		am_pm;

	// Displaying the time
	document.getElementById(
		"clock"
	).innerHTML = currentTime;
	// document.write(hour)
}

showTime();

const toggleButton = document.getElementById('mode-toggle');

// Initialize the mode based on local storage or default to light mode
const savedMode = localStorage.getItem('mode');
if (savedMode) {
    document.body.classList.add(savedMode);
} else {
    // Set default mode to light mode (no need to add a class since it's the default)
    localStorage.setItem('mode', 'light-mode');
}

// Toggle dark mode and save preference on button click
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark-mode');
    } else {
        localStorage.setItem('mode', 'light-mode');
    }
});
