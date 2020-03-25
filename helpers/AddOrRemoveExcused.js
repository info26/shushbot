function AddOrRemoveExcused(addorremove, vcid, userid) {
    // this function does not check anything.
    // better make sure this function only receives validated data. 

    if (whospracticing[vcid + "excused"] == null) {
        //create the list. 
        console.log("List created!")
        whospracticing[vcid + "excused"] = []
    }
    if (addorremove == "add") {
        whospracticing[vcid + "excused"].push(userid)
    } else {
        //remove
        whospracticing[vcid + "excused"].remove(userid)
    }
    //done whooooooo
    console.log("AddOrRemove called " + vcid + " " + userid)
    console.log(whospracticing)
}

module.exports = {
    AddOrRemoveExcused
}