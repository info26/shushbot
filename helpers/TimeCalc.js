function TimeCalc(voicechid) {
    // user object is the User object. and the userplaying is the user's id. 
    //calc date. 
    diff = Date.now() - whospracticing[voicechid + "starttime"];
    //this reprs milliseconds
    //convert to seconds. 
    diff = diff / 1000;
    //get minutes
    hours = Math.round(diff / 60 / 60)
    minutes = Math.round((diff - (hours * 60)) / 60);
    return [minutes, hours];
}

module.exports = {
    TimeCalc
}