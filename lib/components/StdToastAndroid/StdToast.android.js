/*
* Crystal Lin, 2016.04.12
* This exposes the native StdToast android module as a JS module.
* Function 'show' parameters:
* 1. String msg: A string with the text to toast
* 2. int duration:
*    ToastAndroid.SHORT or ToastAndroid.LONG
*/

'use strict';

var { NativeModules } = require('react-native');
module.exports = NativeModules.StdToastAndroid;
