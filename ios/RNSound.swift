import Foundation

@objc(RNSound)
class RNSound: RCTEventEmitter {
  var audioProcessing: AudioProcessing!;
  var isPlaying = false
  
  override init() {
    super.init()
  }
  
  override func supportedEvents() -> [String]! {
    return ["AudioProcessing", "AudioEnd"]
  }

  @objc
  func prepare(_ barAmount: Float) -> Void {
    if(self.audioProcessing == nil){
      self.audioProcessing = AudioProcessing(barAmount: Int(barAmount), callback: {data in
        if(self.isPlaying){
          self.sendEvent(withName: "AudioProcessing", body: data)
        }
      }, onEnd: {
        if(self.audioProcessing != nil) {
          self.sendEvent(withName: "AudioEnd", body: nil)
        }
      })
    }
  }
  
  @objc(play)
  func play() -> Void {
    if(self.audioProcessing != nil){
      self.isPlaying = true
      self.audioProcessing.play()
    }
  }
  
  @objc(pause)
  func pause() -> Void {
    if(self.audioProcessing != nil){
      self.isPlaying = false
      self.audioProcessing.player.pause()
    }
  }
  
  @objc(restart)
  func restart() -> Void {
    if(self.audioProcessing != nil){
      self.isPlaying = true
      self.audioProcessing.restart()
    }
  }
  
  @objc(destroy)
  func destroy() -> Void {
    if(self.audioProcessing != nil){
      self.isPlaying = false
      self.audioProcessing.release()
      self.audioProcessing = nil
    }
  }
  
  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}
