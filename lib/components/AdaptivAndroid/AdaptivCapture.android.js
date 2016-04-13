/*
* Crystal Lin, 2016.04.12
* This exposes the native StdToast android module as a JS module.
  show(width, height, Callback msgCallback, Callback errorMsgCallback)
*/

'use strict';

var { NativeModules } = require('react-native');
var RCTCaptureAndroid = NativeModules.CaptureAndroid;
var CaptureAndroid = {
    show: function (
        width: Number,
        height: Number,
        msgCallback: Function,
    ): void{
        RCTCaptureAndroid.show(width, height, msgCallback)
    },
};
module.exports = CaptureAndroid;
