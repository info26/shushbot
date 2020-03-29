function getNick(userobj){
	testcase = userobj.nickname
	if (testcase == null) {
		return userobj.user.username
	}
	else{
		return userobj.nickname
	}
}

module.exports = {
	getNick
}