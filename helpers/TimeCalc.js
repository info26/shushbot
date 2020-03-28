function TimeCalc(voicechid) {
    // user object is the User object. and the userplaying is the user's id. 
    //calc date. 
    diff = Date.now() - whospracticing[voicechid + "starttime"];
    //this reprs milliseconds
    //convert to seconds. 
    diff = diff / 1000;
    //get minutes
    minutes = Math.round(diff / 60);
    hours = Math.round(minutes / 60)
    return [minutes, hours];
}

module.exports = {
    TimeCalc
}