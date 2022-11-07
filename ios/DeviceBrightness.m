#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DeviceBrightness, NSObject)

RCT_EXTERN_METHOD(getBrightnessLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setBrightnessLevel:(nonnull NSNumber *)level animated:(BOOL *)animated)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
