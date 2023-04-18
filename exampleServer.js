process.env['CAMLIBS'] = '.\\libgphoto2\\2.5.30';
process.env['IOLIBS'] = '.\\libgphoto2_port\\0.12.1';

console.log(process.env.CAMLIBS);
console.log(process.env.IOLIBS);

var shutterSpeeds = [
  "30",
  "25",
  "20",
  "15",
  "13",
  "10.3",
  "8",
  "6.3",
  "5",
  "4",
  "3.2",
  "2.5",
  "2",
  "1.6",
  "1.3",
  "1",
  "0.8",
  "0.6",
  "0.5",
  "0.4",
  "0.3",
  "1/4",
  "1/5",
  "1/6",
  "1/8",
  "1/10",
  "1/13",
  "1/15",
  "1/20",
  "1/25",
  "1/30",
  "1/40",
  "1/50",
  "1/60",
  "1/100",
  "1/125",
  "1/160",
  "1/250",
  "1/320",
  "1/500",
  "1/640",
  "1/800",
  "1/1250",
  "1/1600",
  "1/2000",
  "1/3200",
  "1/4000",
  
]

function executeGphotoCommand(array){
  var child_process = require('child_process');
  var readline      = require('readline');
  var proc          = child_process.spawn('gphoto2.exe', array)
  proc.stdout.setEncoding('utf8');
  // proc.stdout.pipe(process.stdout);

  readline.createInterface({
    input     : proc.stdout,
    terminal  : false
  }).on('line', function(line) {
    console.log([line]);
  });
  proc.on('error', function(err) {
    console.log(err);
  });
  proc.on('exit', function() {
    console.log("gphoto exit");
    console.log("Execute time:", Date.now() - startTime)
  })
  console.log("gphoto started")
  var startTime = Date.now()

}

// executeGphotoCommand(["--wait-event"]);

// executeGphotoCommand(["--list-ports"]);
// executeGphotoCommand(["--list-config"]);
var lastShutterSpeed = 0
setInterval(() => {
  executeGphotoCommand(["--set-config", "/main/capturesettings/shutterspeed=" + shutterSpeeds[lastShutterSpeed]])
  lastShutterSpeed++
}, 500);