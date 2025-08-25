const sessionIdToUserMap = new Map();


function setUser(sessionId,username) {
 sessionIdToUserMap.set(sessionId,username);
}

function getUser(sessionId) {
    return sessionIdToUserMap.get(sessionId);
}

module.exports = {  setUser, getUser  };