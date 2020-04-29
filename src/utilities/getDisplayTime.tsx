const getDisplayTime = (hours: number, mins: number, secs: number) => {
	const hoursDisplay = hours > 0 ? `${hours}:` : '';
	const minsDisplay = hours > 0 ? (mins < 10 ? `0${mins}:` : `${mins}:`) : mins > 0 ? `${mins}:` : '';
	const secsDisplay = mins > 0 && secs < 10 ? `0${secs}` : `${secs}`;

	return hoursDisplay + minsDisplay + secsDisplay;
};

export default getDisplayTime;
