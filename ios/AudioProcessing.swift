
import AVFoundation
import Accelerate

class AudioProcessing {
    private var engine = AVAudioEngine()
    private let bufferSize = 1024
    // Specify bass frequency range
    let bassFrequencyRange = 20...200
  
    var player = AVAudioPlayerNode()
    var isEnded = false
    var callback:(_ data: [Float]) -> Void;
    var onEnd:() -> Void;
    var barAmount:Int = 100
    var fftMagnitudes: [Float] = []
  
  func play() {
    if(self.isEnded){
      self.restart()
    }else{
      player.play()
    }
  }
  
   func restart() {
       player.stop()
       let audioFile = try! AVAudioFile(forReading: Bundle.main.url(forResource: "sound", withExtension: "mp3")!)
       player.scheduleFile(audioFile, at: nil)
       player.play()
       self.isEnded = false
   }
  
  func release() {
    self.player.stop()
    self.engine.stop()
  }
  
  init(barAmount: Int, callback: @escaping ((_ data: [Float]) -> Void), onEnd: @escaping () -> Void) {
        self.callback = callback
        self.barAmount = barAmount
        self.onEnd = onEnd
        _ = engine.mainMixerNode
        
        engine.prepare()
        try! engine.start()
        

        let audioFile = try! AVAudioFile(
            forReading: Bundle.main.url(forResource: "sound", withExtension: "mp3")!
        )
        let format = audioFile.processingFormat
            
        engine.attach(player)
        engine.connect(player, to: engine.mainMixerNode, format: format)
            
        player.scheduleFile(audioFile, at: nil){ [weak self] in
            self?.isEnded = true
            self?.onEnd()
        }
            
        let fftSetup = vDSP_DFT_zop_CreateSetup(
            nil,
            UInt(bufferSize),
            vDSP_DFT_Direction.FORWARD
        )
            
        engine.mainMixerNode.installTap(
            onBus: 0,
            bufferSize: UInt32(bufferSize),
            format: nil
        ) { [self] buffer, _ in
            let channelData = buffer.floatChannelData?[0]
            fftMagnitudes = fft(data: channelData!, setup: fftSetup!)
            self.callback(fftMagnitudes)
        }
    }
    
    func fft(data: UnsafeMutablePointer<Float>, setup: OpaquePointer) -> [Float] {
        var realIn = [Float](repeating: 0, count: bufferSize)
        var imagIn = [Float](repeating: 0, count: bufferSize)
        var realOut = [Float](repeating: 0, count: bufferSize)
        var imagOut = [Float](repeating: 0, count: bufferSize)
            
        for i in 0 ..< bufferSize {
            realIn[i] = data[i]
        }
        
        vDSP_DFT_Execute(setup, &realIn, &imagIn, &realOut, &imagOut)
        
        var magnitudes = [Float](repeating: 0, count: self.barAmount)
        
        realOut.withUnsafeMutableBufferPointer { realBP in
            imagOut.withUnsafeMutableBufferPointer { imagBP in
                var complex = DSPSplitComplex(realp: realBP.baseAddress!, imagp: imagBP.baseAddress!)
                vDSP_zvabs(&complex, 1, &magnitudes, 1, UInt(self.barAmount))
            }
        }
        
        var normalizedMagnitudes = [Float](repeating: 0.0, count: self.barAmount)
        var scalingFactor = Float(1)
        vDSP_vsmul(&magnitudes, 1, &scalingFactor, &normalizedMagnitudes, 1, UInt(self.barAmount))
        return normalizedMagnitudes
    }
}
