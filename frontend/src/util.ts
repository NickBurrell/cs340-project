function truncDate(date: Date) {
    // This fix makes absolutely no sense but it works so I really can't say anything
    let date2 = new Date(date);
    return date2.toISOString().slice(0,10);
}

export default truncDate;