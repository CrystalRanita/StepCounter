/**
* Crystal Lin, 2016.04.12
* Register the module for JS here
*/

package com.fb.react.shell;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.fb.react.modules.toast.*;

/*
* Self define modules and view managers.
*/

public class BasicReactPackage implements ReactPackage {

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      List<NativeModule> modules = new ArrayList<>();
      modules.add(new StdToastModule(reactContext));
    return modules;
  }
}
