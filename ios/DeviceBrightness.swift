@objc(DeviceBrightness)
class DeviceBrightness: NSObject {

    @objc(setBrightnessLevel:animated:)
    func setBrightnessLevel(_ level: NSNumber, animated: Bool) -> Void {
        if let floatLevel = CGFloat(exactly: level){
            if(animated) {
                UIScreen.main.setBrightness(to: floatLevel)
            } else {
                DispatchQueue.main.async { () -> Void in
                    UIScreen.main.brightness = floatLevel
                }
            }
        }
    }

    @objc(getBrightnessLevel:rejecter:)
    func getBrightnessLevel(_ resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      resolve(UIScreen.main.brightness)
    }

}

extension UIScreen {
    
    public func setBrightness(to value: CGFloat, duration: TimeInterval = 0.3, ticksPerSecond: Double = 120) {
        let startingBrightness = UIScreen.main.brightness
        let delta = value - startingBrightness
        let totalTicks = Int(ticksPerSecond * duration)
        let changePerTick = delta / CGFloat(totalTicks)
        let delayBetweenTicks = 1 / ticksPerSecond
        
        let time = DispatchTime.now()
        
        for i in 1...totalTicks {
            DispatchQueue.main.asyncAfter(deadline: time + delayBetweenTicks * Double(i)) {
                UIScreen.main.brightness = max(min(startingBrightness + (changePerTick * CGFloat(i)),1),0)
            }
        }
        
    }
}
