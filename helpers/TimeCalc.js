function timePracticed(voiceChId) {
    //this reprs milliseconds
    diff = Date.now() - whospracticing[voiceChId + "starttime"];
    //convert to seconds and return. 
    return (diff/1000);
}

function secondsToHoursAndMinutes(seconds){
    hours = Math.floor(seconds / 60 / 60);
    minutes = Math.floor((seconds / 60) - (hours * 60));

    return [minutes, hours];
}


module.exports = {
    secondsToHoursAndMinutes,
    timePracticed
}