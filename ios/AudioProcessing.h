#import <AVFoundation/AVFoundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AudioProcessing : NSObject

@property (nonatomic, assign) BOOL isEnded;
@property (nonatomic, readonly) NSArray<NSNumber *> *fftMagnitudes;

+ (instancetype)shared;
- (void)restart;

@end

NS_ASSUME_NONNULL_END
