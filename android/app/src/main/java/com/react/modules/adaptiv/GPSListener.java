package com.react.modules.adaptiv;

//import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationProvider;
import android.os.Bundle;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import android.support.annotation.Nullable;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by rbonick on 4/28/2015.
 */
public class GPSListener implements LocationListener {

    protected final String GPS_FILE_NAME = "record_gps.csv";

    protected long startTime;
    protected FileIO gpsFile;
    protected int count;
    private ReactContext mReactContext;

    public GPSListener(ReactContext reactContext) {
        mReactContext = reactContext;
        startTime = getCurrentTime();
        Date date = new Date();
        String dateString = new SimpleDateFormat("yyyy-MM-dd_hh:mm:ss").format(date);
        String dirName = "Adaptiv/reading_GPS_"+dateString+"/";
        gpsFile = new FileIO(dirName, GPS_FILE_NAME, reactContext);
        String title = "Timestamp, x, y, z";
        gpsFile.writeLine(title);  
        count = 0;
    }

    private long getCurrentTime() {
        return Calendar.getInstance().getTimeInMillis();
    }

    @Override
    public void onLocationChanged(Location location) {
        Log.e("INFO", "gps_status: 1");
        long timeElapsed = getCurrentTime();
        gpsFile.writeLine(timeElapsed + "," + location.getLatitude() + "," + location.getLongitude());
        count++;
        WritableMap params = Arguments.createMap();
        params.putString("gps_status", " Connected: " + count);
        sendEvent("GPS", params);
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

        if(status == LocationProvider.AVAILABLE) {
            Log.e("INFO", "gps_status: 2");
            WritableMap params = Arguments.createMap();
            params.putString("gps_status", "Connected");
            sendEvent("GPS", params);
        } else if (status == LocationProvider.OUT_OF_SERVICE) {
            Log.e("INFO", "gps_status: 3");
            count = 0;
            WritableMap params = Arguments.createMap();
            params.putString("gps_status", "No Connection!");
            sendEvent("GPS", params);
        } else if (status == LocationProvider.TEMPORARILY_UNAVAILABLE) {
            Log.e("INFO", "gps_status: 4");
            count = 0;
            WritableMap params = Arguments.createMap();
            params.putString("gps_status", "No Connection!");
            sendEvent("GPS", params);
        }
    }

    @Override
    public void onProviderEnabled(String provider) {
    }

    @Override
    public void onProviderDisabled(String provider) {
    }

    public void closeFile(){
        gpsFile.close();
    }

    private void sendEvent(String eventName, @Nullable WritableMap params)
    {
        try {
            mReactContext 
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class) 
                .emit(eventName, params);
        } catch (RuntimeException e) {
            Log.e("ERROR", "GPS, java.lang.RuntimeException: Trying to invoke JS before CatalystInstance has been set!");
        }
    }
}
