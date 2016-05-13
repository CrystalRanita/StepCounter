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

    StepCount:function(
        stopped: Bool,
    ): void{
        RCTCaptureAndroid.StepCount(stopped)
    },

    startSensorCounter: function(
        delay: Number,
    ): void{
    	RCTCaptureAndroid.startSensorCounter(delay)
    },

    stopSensorCounter: function(
    ): void{
    	RCTCaptureAndroid.stopSensorCounter()
    },

    setBPM_Value:function(
        value: Number,
    ): void{
        RCTCaptureAndroid.setBPM_Value(value)
    },
};
module.exports = CaptureAndroid;
