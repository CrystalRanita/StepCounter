package com.react.modules.adaptiv;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Date;
import java.util.Timer;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.hardware.*;
//import android.location.LocationManager;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.Bundle;
import android.os.HandlerThread;
import android.preference.PreferenceManager;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.AppCompatButton;
import android.support.v7.widget.ShareActionProvider;
import android.support.v7.widget.AppCompatButton;
import android.util.Log;
import android.os.Handler;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;

public class AdaptivAndroid implements SensorEventListener {

    private ShareActionProvider mShareActionProvider;
    private SensorManager sensorManager;
    private Sensor accel;
    private Sensor gyro;
    private Sensor la;
    private Sensor grav;
    private Sensor step;

    //private LocationManager locationManager;

    //private GPSListener gpsListener;

    private FileIO accelFile;
    private FileIO gyroFile;
    private FileIO laFile;
    private FileIO gravFile;
    private FileIO stepFile;

    private HandlerThread mBackgroundThread;
    private Handler mBackgroundThreadHandler;
    private Runnable mPlaySoundRunnable;
    private ToneGenerator mToneGen;
    private int mTestBPM = 90;
    private long mStartTime = 0;
    private long mStopTime = 0;
    private String mOutputDir;
    private boolean mCollecting = false;

    static String ACC_FILE_NAME = "record_accelerometer.csv";
    static String GYRO_FILE_NAME = "record_gyroscope.csv";
    static String LINEAR_ACC_FILE_NAME = "record_linear_accelerometer.csv";
    static String GRAVITY_FILE_NAME = "record_gravity.csv";
    static String STEP_FILE_NAME = "record_step.csv";

    static boolean ENABLE_ACC = true;
    static boolean ENABLE_GYRO = false;
    static boolean ENABLE_LINEAR_ACC = false;
    static boolean ENABLE_GRAVITY = false;
    static boolean ENABLE_STEP = true;

    //React Native
    private ReactContext mReactContext;
    private Arguments mArguments;
    private long lastUpdate = 0;
    private long step_lastUpdate = 0;
    private int delay;
    private String type;

    public AdaptivAndroid(ReactApplicationContext reactContext) {
        sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
        mReactContext = reactContext;
        //locationManager = (LocationManager) reactContext.getSystemService(reactContext.LOCATION_SERVICE);
        //gpsListener = new GPSListener(reactContext);
    }

    public void start(int delay) {
        this.delay = delay;
        if (ENABLE_ACC && sensorManager.getSensorList(Sensor.TYPE_ACCELEROMETER).size() != 0) {
            accel = sensorManager.getSensorList(Sensor.TYPE_ACCELEROMETER).get(0);
            sensorManager.registerListener(this,accel, SensorManager.SENSOR_DELAY_GAME, 0, mBackgroundThreadHandler);
        }

        if (ENABLE_GYRO && sensorManager.getSensorList(Sensor.TYPE_GYROSCOPE).size() != 0) {
            gyro = sensorManager.getSensorList(Sensor.TYPE_GYROSCOPE).get(0);
            sensorManager.registerListener(this,gyro, SensorManager.SENSOR_DELAY_GAME, 0, mBackgroundThreadHandler);
        }

        if (ENABLE_LINEAR_ACC && sensorManager.getSensorList(Sensor.TYPE_LINEAR_ACCELERATION).size()!=0) {
            la = sensorManager.getSensorList(Sensor.TYPE_LINEAR_ACCELERATION).get(0);
            sensorManager.registerListener(this, la, SensorManager.SENSOR_DELAY_GAME, 0, mBackgroundThreadHandler);
        }

        if(ENABLE_GRAVITY && sensorManager.getSensorList(Sensor.TYPE_GRAVITY).size()!=0) {
            grav = sensorManager.getSensorList(Sensor.TYPE_GRAVITY).get(0);
            sensorManager.registerListener(this, grav, SensorManager.SENSOR_DELAY_GAME, 0, mBackgroundThreadHandler);
        }

        if(ENABLE_STEP && sensorManager.getSensorList(Sensor.TYPE_STEP_COUNTER).size()!=0) {
            step = sensorManager.getSensorList(Sensor.TYPE_STEP_COUNTER).get(0);
            sensorManager.registerListener(this, step, SensorManager.SENSOR_DELAY_GAME, 0, mBackgroundThreadHandler);
        }

        mBackgroundThread = new HandlerThread("background");
        mBackgroundThread.start();
        mBackgroundThreadHandler = new Handler(mBackgroundThread.getLooper());
        mToneGen = new ToneGenerator(AudioManager.STREAM_MUSIC, 100);

        mPlaySoundRunnable = new Runnable() {
            @Override
            public void run() {
                if (mStartTime == 0)
                    mStartTime = getCurrentTime();
                mToneGen.startTone(ToneGenerator.TONE_PROP_BEEP);
                mBackgroundThreadHandler.postDelayed(
                    new Runnable() {
                        @Override
                        public void run() {
                            mToneGen.stopTone();
                        }
                    },
                    100
                );
                mBackgroundThreadHandler.postDelayed(this, (60 * 1000 / mTestBPM));
            }
        };
    }

    public void stop() {
        sensorManager.unregisterListener(this);
    }

    public void setBPM_ValueFromUI(int value) {
        mTestBPM = value;
        WritableMap map = mArguments.createMap();
        map.putInt("bpm", mTestBPM);
        sendEvent("BPM", map);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params)
    {
        try {
            mReactContext 
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class) 
                .emit(eventName, params);
        } catch (RuntimeException e) {
            Log.e("ERROR", "java.lang.RuntimeException: Trying to invoke JS before CatalystInstance has been set!");
        }
    }


    @Override
    public void onSensorChanged(SensorEvent event) {

        if(event.sensor.getType() == Sensor.TYPE_ACCELEROMETER){
            
            long curTime = System.currentTimeMillis();
            if ((curTime - lastUpdate) > delay) {
                double x = event.values[0];
                double y = event.values[1];
                double z = event.values[2];
                WritableMap map = mArguments.createMap();
                map.putDouble("x", x);
                map.putDouble("y", y);
                map.putDouble("z", z);
                sendEvent("Accelerometer", map);
                Log.e("INFO", "TYPE_ACCELEROMETER mCollecting: " + mCollecting);
                if(mCollecting && ENABLE_ACC){
                    String line = String.valueOf(event.timestamp) + ',' + x + ',' + y + ',' + z + ',' + mTestBPM;
                    Log.e("INFO", "TYPE_ACCELEROMETER line: " + line);
                    accelFile.writeLine(line);
                }
                lastUpdate = curTime;
            }
        }else if(event.sensor.getType() == Sensor.TYPE_GYROSCOPE){
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];

            if(mCollecting && ENABLE_GYRO){
                String line = String.valueOf(event.timestamp) + ',' + x + ',' + y + ',' + z;
                gyroFile.writeLine(line);
            }

        }else if(event.sensor.getType() == Sensor.TYPE_LINEAR_ACCELERATION){
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];

            if(mCollecting && ENABLE_LINEAR_ACC){
                String line = String.valueOf(event.timestamp) + ',' + x + ',' + y + ',' + z;
                laFile.writeLine(line);
            }

        }else if(event.sensor.getType() == Sensor.TYPE_STEP_COUNTER){
            long curTime = System.currentTimeMillis();
            if ((curTime - step_lastUpdate) > delay) {
                double steps = event.values[0];
                WritableMap map = mArguments.createMap();
                map.putDouble("steps", steps);
                sendEvent("StepCount", map);
                Log.e("INFO", "STEP_COUNTER mCollecting: " + mCollecting + "steps: " + steps);
                if(mCollecting && ENABLE_STEP){
                    String line = String.valueOf(event.timestamp) + ',' + steps + ',' + mTestBPM;
                    stepFile.writeLine(line);
                }
                step_lastUpdate = curTime;
            }
        }else if(event.sensor.getType() == Sensor.TYPE_GRAVITY){
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];

            if(mCollecting && ENABLE_GRAVITY){
                String line = String.valueOf(event.timestamp) + ',' + x + ',' + y + ',' + z;
                gravFile.writeLine(line);
            }
        }
    }

    private long getCurrentTime() {
        return System.currentTimeMillis();
    }

    public void BtnPressEvent(boolean stopped) {
        if(!stopped){
            Log.e("INFO", "start step count...");
            mBackgroundThreadHandler.post(new Runnable() {
                @Override
                public void run() {
                    onCaptureStarted();
                }
            });
        }else{
            Log.e("INFO", "stopping step count...");
            mBackgroundThreadHandler.post(new Runnable() {
                @Override
                public void run() {
                    onCaptureStopped();
                }
            });
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // TODO Auto-generated method stub
    }
    
    private void onCaptureStarted() {
        // update BPM from preference
        //SharedPreferences p = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
        //mTestBPM = Integer.parseInt(p.getString("bpm_list", "90"));
        Log.e("INFO", "mTestBPM= " + mTestBPM);
        // Delay a little bit for user to catch up
        mStartTime = 0;
        mStopTime = 0;
        //mBackgroundThreadHandler.postDelayed(mPlaySoundRunnable, 2000);

        // Begin data stream to CSV file
        mCollecting = true;

        Date date = new Date();
        String dateString = new SimpleDateFormat("yyyy-MM-dd_hh:mm:ss").format(date);
        mOutputDir = "Adaptiv/reading_" + dateString + "/";

        accelFile = new FileIO(mOutputDir, ACC_FILE_NAME, mReactContext);
        String accelTitle = "Timestamp, x, y, z, mTestBPM";
        accelFile.writeLine(accelTitle);

        gyroFile = new FileIO(mOutputDir, GYRO_FILE_NAME, mReactContext);
        String gyroTitle = "Timestamp, x, y, z";
        gyroFile.writeLine(gyroTitle);


        laFile = new FileIO(mOutputDir, LINEAR_ACC_FILE_NAME, mReactContext);
        String laTitle = "Timestamp, x, y, z";
        laFile.writeLine(laTitle);   


        gravFile = new FileIO(mOutputDir, GRAVITY_FILE_NAME, mReactContext);
        String gravTitle = "Timestamp, x, y, z";
        gravFile.writeLine(gravTitle); 


        stepFile = new FileIO(mOutputDir, STEP_FILE_NAME, mReactContext);
        String stepTitle = "Timestamp, steps, mTestBPM";
        stepFile.writeLine(stepTitle); 

        /*
        Log.e("INFO", "Get location data...");
        if(locationManager.getAllProviders().size()!=0) {
            Log.e("INFO", "Get location data...");
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 2, gpsListener);
        }
        */
    }

    private void onCaptureStopped() {
        //mBackgroundThreadHandler.removeCallbacks(mPlaySoundRunnable);
        mStopTime = getCurrentTime();
        mCollecting = false;

        //Log.d("ASKA", String.format("start: %d, stop: %d, bpm: %d", mStartTime, mStopTime, mTestBPM));
        String newName = String.format("50hz_%dbpm_%dsteps.csv", mTestBPM, (int) Math.floor(mStopTime - mStartTime) * mTestBPM / (60 * 1000));
        //Log.d("ASKA", "S: " + newName);
        accelFile.renameTo(mOutputDir, newName);
        accelFile.close();

        gyroFile.close();
        laFile.close();
        gravFile.close();
        stepFile.close();
/*
        if (locationManager.getAllProviders().size()!=0) {
            gpsListener.closeFile();
            locationManager.removeUpdates(gpsListener);
        }
        */
        mTestBPM=90;//Set default value whie capture stopped
        setBPM_ValueFromUI(mTestBPM);
        Log.e("INFO", "After reset mTestBPM= " + mTestBPM);
    }
}
