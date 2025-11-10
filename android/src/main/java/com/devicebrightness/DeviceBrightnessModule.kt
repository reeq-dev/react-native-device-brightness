package com.devicebrightness

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import android.view.WindowManager

@ReactModule(name = DeviceBrightnessModule.NAME)
class DeviceBrightnessModule(reactContext: ReactApplicationContext) :
  NativeDeviceBrightnessSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun getBrightnessLevel() : Double {
    val activity = reactApplicationContext.currentActivity ?: return 0.0
    return activity.window.attributes.screenBrightness.toDouble()
  }

  override fun setBrightnessLevel(level: Double) {
    val activity = reactApplicationContext.currentActivity ?: return
    activity.runOnUiThread {
      val attributes = activity.window.attributes
      attributes.screenBrightness = level.toFloat()
      activity.window.attributes = attributes
    }
  }

  override fun resetBrightness() {
    val activity = reactApplicationContext.currentActivity ?: return
    activity.runOnUiThread {
      val attributes = activity.window.attributes
      attributes.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
      activity.window.attributes = attributes
    }
  }

  companion object {
    const val NAME = "DeviceBrightness"
  }
}
