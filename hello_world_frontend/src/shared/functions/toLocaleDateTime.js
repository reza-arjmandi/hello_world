function toLocaleDateTime(date_time) {
    var iso_date_time = new Date(date_time);
    var local_date_time = iso_date_time.toLocaleDateString() 
        + " " + iso_date_time.toLocaleTimeString();
    return local_date_time;
}

export default toLocaleDateTime;
