// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const path = require('path')
const exec = require('child_process').exec
const ADB_PATH = 'adb'
const SCREENCAP_REMOTE_PATH = '/sdcard/screencap.jpg'
const {app} = require('electron').remote;
var userDataPath = app.getPath('userData');
const SCREENCAP_PATH = path.join(userDataPath, 'screencap.jpg')
const BOOM = 4.88

module.exports = {
    fetchScreenCap:function (callBack) {
        exec(`${ADB_PATH} shell screencap -p /sdcard/screencap.jpg`,function(err, stdout , stderr) {
          exec(`${ADB_PATH} pull ${SCREENCAP_REMOTE_PATH} ${SCREENCAP_PATH}`,function(err, stdout , stderr){
            callBack(SCREENCAP_PATH)
          })
        })
    },
    sendJump:function(distance,callBack){
        let time = parseInt(distance*BOOM)
        exec(`${ADB_PATH} shell input touchscreen swipe 170 187 170 187 ${time}`,function(err, stdout , stderr) {
            setTimeout(callBack,1200)
        })
    }
}