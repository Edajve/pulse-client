export const formatDateString = (dateString) => {
    const date = new Date(dateString);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];

    // Function to get the day suffix
    function getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th'; // catch all 11th, 12th, 13th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const dayWithSuffix = day + getDaySuffix(day);

    return `${month} ${dayWithSuffix}, ${year}`;
}