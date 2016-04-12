/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.fb.react.modules.toast;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.UiThreadUtil;

import java.util.Map;

/**
* {@link NativeModule} that allows JS to show an Android Toast.
*/

public class StdToastModule extends ReactContextBaseJavaModule {
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  //Our goal here is to be able to write
  //ToastAndroid.show('Awesome', ToastAndroid.SHORT);
  //from JavaScript to display a short toast on the screen.
  public StdToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  //ReactContextBaseJavaModule requires that a method called getName is implemented.
  //React.NativeModules.ToastAndroid
  @Override
  public String getName() {
    return "StdToastAndroid";
  }

  //An optional method called getConstants returns the constant values exposed to JavaScript.
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = MapBuilder.newHashMap();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  //To expose a method to JavaScript a Java method must be
  //annotated using @ReactMethod. The return type of bridge methods is always void.
  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  //Toast module already defined, if need to override existing module
  //Need to turn canOverrideExistingModule false to true
  @Override
  public boolean canOverrideExistingModule() {
    return true;
  }
}
