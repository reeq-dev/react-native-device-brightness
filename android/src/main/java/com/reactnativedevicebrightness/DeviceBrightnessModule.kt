package com.reactnativedevicebrightness
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.provider.Settings;


class DeviceBrightnessModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceBrightness"
    }

    @ReactMethod
    fun setBrightnessLevel(brightnessLevel: Float, animated: Boolean) {
      val activity = currentActivity ?: return
      activity.runOnUiThread {
        val atts = activity.window.attributes
        atts.screenBrightness = brightnessLevel
        activity.window.attributes = atts
      }
    }

    @ReactMethod
    fun getBrightnessLevel(promise: Promise) {
      promise.resolve(currentActivity!!.window.attributes.screenBrightness)
    }

    @ReactMethod
    fun getSystemBrightnessLevel(promise: Promise) {
      val brightness: String = Settings.System.getString(currentActivity!!.contentResolver, "screen_brightness")
      promise.resolve(brightness.toInt() / 255f)
    }

    @ReactMethod
    fun addListener(eventName: String?) {
    }

    @ReactMethod
    fun removeListeners(count: Int?) {
    }

}
