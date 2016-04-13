/**
* Original adaptiv from:
* https://github.com/danielmurray/adaptiv
* Author: danielmurray
*/

package com.react.modules.adaptiv;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.Callback;
import com.facebook.react.uimanager.IllegalViewOperationException;

//For Capture import
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Date;


/**
* {@link NativeModule} that allows JS to show an Android Toast.
*/

public class CaptureAndroid extends ReactContextBaseJavaModule {

    public CaptureAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CaptureAndroid";
    }

    @ReactMethod
    public void show(float width, float height, Callback msgCallback) {
        try{
            width = 12;
            height = 10;
            msgCallback.invoke(width, height);
        //}catch (IllegalViewOperationException e) {
        }catch (Exception e) {
            //errorMsgCallback.invoke(e.getMessage());
            e.printStackTrace();
        }
    }
}
