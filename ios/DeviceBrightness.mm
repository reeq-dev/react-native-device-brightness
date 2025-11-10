#import "DeviceBrightness.h"
#import <UIKit/UIKit.h>

@interface DeviceBrightness ()
@property (nonatomic, assign) CGFloat previousBrightness;
@end

@implementation DeviceBrightness

- (instancetype)init {
  if (self = [super init]) {
    _previousBrightness = [UIScreen mainScreen].brightness;
  }
  return self;
}

#pragma mark - Brightness methods

- (void)setBrightnessLevel:(double)level {
  [self setBrightnessTo:(CGFloat)level duration:0.3 ticksPerSecond:120.0];
}

- (NSNumber *)getBrightnessLevel {
  CGFloat value = [UIScreen mainScreen].brightness;
  return @(value);
}

- (void)resetBrightness {
  [self setBrightnessTo:self.previousBrightness duration:0.3 ticksPerSecond:120.0];
}

#pragma mark - Private helper

- (void)setBrightnessTo:(CGFloat)value
               duration:(NSTimeInterval)duration
         ticksPerSecond:(double)ticksPerSecond
{
  CGFloat startingBrightness = [UIScreen mainScreen].brightness;
  CGFloat delta = value - startingBrightness;
  NSInteger totalTicks = (NSInteger)(ticksPerSecond * duration);
  if (totalTicks <= 0) {
    [UIScreen mainScreen].brightness = value;
    return;
  }

  CGFloat changePerTick = delta / (CGFloat)totalTicks;
  double delayBetweenTicks = 1.0 / ticksPerSecond;

  dispatch_time_t startTime = dispatch_time(DISPATCH_TIME_NOW, 0);

  for (NSInteger i = 1; i <= totalTicks; i++) {
    dispatch_after(dispatch_time(startTime, (int64_t)(delayBetweenTicks * (double)i * NSEC_PER_SEC)),
                   dispatch_get_main_queue(), ^{
      CGFloat newBrightness = startingBrightness + changePerTick * (CGFloat)i;
      newBrightness = fmax(fmin(newBrightness, 1.0), 0.0);
      [UIScreen mainScreen].brightness = newBrightness;
    });
  }
}

#pragma mark - TurboModule

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeDeviceBrightnessSpecJSI>(params);
}

+ (NSString *)moduleName {
  return @"DeviceBrightness";
}

@end
