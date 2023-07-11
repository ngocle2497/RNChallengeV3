#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSound, RCTEventEmitter)

RCT_EXTERN_METHOD(prepare: (float) barAmount);

RCT_EXTERN_METHOD(play);

RCT_EXTERN_METHOD(restart);

RCT_EXTERN_METHOD(pause);

RCT_EXTERN_METHOD(destroy);

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
