var gamepads = {};
var gp = {};
var mycanvas = null;
var ctx = null;

 window.addEventListener('gamepadconnected', function(e){gamepadHandler(e, true);}, false);
 window.addEventListener('gamepaddisconnected', function(e){gamepadHandler(e, false);}, false);

 function gamepadHandler(event, connecting) {
    update();
  }

 class Gamepad{
     constructor(index){
         this.id = index;
         this.x = ((this.id) % 2)*450+150;
         this.y = Math.floor((this.id) / 2)*350+150;
         this.width = 400;
         this.height = 300;
         this.gamepad = navigator.getGamepads()[index];
     }
     showInfo(){
        var info = this.gamepad.id;
        info = info.substr(0, info.indexOf("("));
        ctx.lineWidth = 2;
        ctx.fillStyle = "#1090AA";

        ctx.shadowColor = 'black';//'#798';
        ctx.shadowBlur = 20;

        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#FFFF00";
        ctx.strokeStyle = "#FFFF00";
        ctx.font = "15px Verdana";

        ctx.shadowBlur = 0;

        ctx.fillText(info, this.x+5, this.y+20);
        this.gamepad = navigator.getGamepads()[this.id];
        this.drawTrigger();
        this.drawButtons();
        this.drawSelect();
        this.drawStart();
        this.drawBigButtons();
        this.drawShoulder();
        this.drawSticks();
        this.drawPads();
     }
     static clear(){ 
        if(ctx){
            ctx.clearRect(0, 0, 1920, 1080);
        }
     }
     drawButtons(){
        //B
        ctx.beginPath();
        ctx.arc(this.x+this.width-60, this.y+(this.height) / 2, 10, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[1].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
        //X
        ctx.beginPath();
        ctx.arc(this.x+this.width-90, this.y+(this.height) / 2, 10, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[2].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
        //Y
        ctx.beginPath();
        ctx.arc(this.x+this.width-75, this.y+(this.height) / 2 - 15, 10, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[3].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
        //A
        ctx.beginPath();
        ctx.arc(this.x+this.width-75, this.y+(this.height) / 2 + 15, 10, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[0].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
     }
     drawSticks(){
        //left
        ctx.beginPath();
        ctx.arc(this.x+130, this.y + 160, 30, 0, 2*Math.PI);
        ctx.stroke();
        ctx.beginPath();
        var xfactL = this.gamepad ? this.gamepad.axes[0] * 19 : 0 ;
        var yfactL = this.gamepad ? this.gamepad.axes[1] * 19 : 0 ;
        ctx.arc(this.x+130+xfactL, this.y + 160+yfactL, 10, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[10].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
        //right
        ctx.beginPath();
        ctx.arc(this.x+this.width-130, this.y+200, 30, 0, 2*Math.PI);
        ctx.stroke();
        ctx.beginPath();
        var xfactR = this.gamepad ? this.gamepad.axes[2] * 19 : 0 ;
        var yfactR = this.gamepad ? this.gamepad.axes[3] * 19 : 0 ;
        ctx.arc(this.x+this.width-130+xfactR, this.y+200+yfactR, 10, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[11].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
     }
     drawPads(){
        if(this.gamepad && !this.gamepad.buttons[14].pressed){
            ctx.fillRect(this.x+49, this.y+this.height-88, 20,15);
        }
        else{
            ctx.strokeRect(this.x+49, this.y+this.height-88, 20,15);
        }
        if(this.gamepad && !this.gamepad.buttons[15].pressed){
            ctx.fillRect(this.x+90, this.y+this.height-88, 20,15);
        }
        else{
            ctx.strokeRect(this.x+90, this.y+this.height-88, 20,15);
        }
        if(this.gamepad && !this.gamepad.buttons[13].pressed){
            ctx.fillRect(this.x+72, this.y+this.height-71, 15,20);
        }
        else{
            ctx.strokeRect(this.x+72, this.y+this.height-71, 15,20);
        }
        if(this.gamepad && !this.gamepad.buttons[12].pressed){
            ctx.fillRect(this.x+72, this.y+this.height-110, 15,20);
        }
        else{
            ctx.strokeRect(this.x+72, this.y+this.height-110, 15,20);
        }
     }
     drawBigButtons(){
        ctx.beginPath();
        ctx.arc(this.x+this.width/2, this.y+(this.height) * 3 / 4 + 15, 15, 0, 2*Math.PI);
        if(this.gamepad && !this.gamepad.buttons[16].pressed){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
     }
     drawSelect(){
        ctx.font = "10px Arial";
        if(this.gamepad && !this.gamepad.buttons[8].pressed){
            ctx.fillRect(this.x+100, this.y+this.height/3, 42, 13);
            ctx.fillStyle = '#1090AA';
        }
        else{
            ctx.strokeRect(this.x+100, this.y+this.height/3, 42, 13);
            ctx.fillStyle = '#FFFF00';
        }
        ctx.fillText('SELECT', this.x+100+2, this.y+this.height/3+10);
        ctx.fillStyle = '#FFFF00';
     }
     drawStart(){
        ctx.font = "10px Arial";
        if(this.gamepad && !this.gamepad.buttons[9].pressed){
            ctx.fillRect(this.x+this.width-200+56, this.y+this.height/3, 42, 13);
            ctx.fillStyle = '#1090AA';
        }
        else{
            ctx.strokeRect(this.x+this.width-200+56, this.y+this.height/3, 42, 13);
            ctx.fillStyle = '#FFFF00';
        }
        ctx.fillText('START', this.x+this.width-200+56+5, this.y+this.height/3+10);
        ctx.fillStyle = '#FFFF00';
     }
     drawShoulder(){
        ctx.font = "10px Arial";
        if(this.gamepad && !this.gamepad.buttons[4].pressed){
            ctx.fillRect(this.x+30, this.y+75, 60, 15);
            ctx.fillStyle = '#1090AA';
        }
        else{
            ctx.strokeRect(this.x+30, this.y+75, 60, 15);
            ctx.fillStyle = '#FFFF00';
        }
        ctx.fillText('LB', this.x+30+21, this.y+75+10);
        ctx.fillStyle = '#FFFF00';
        if(this.gamepad && !this.gamepad.buttons[5].pressed){
            ctx.fillRect(this.x+this.width-90, this.y+75, 60, 15);
            ctx.fillStyle = '#1090AA';
        }
        else{
            ctx.strokeRect(this.x+this.width-90, this.y+75, 60, 15);
            ctx.fillStyle = '#FFFF00';
        }
        ctx.fillText('RB', this.x+this.width-90+21, this.y+75+10);
        ctx.fillStyle = '#FFFF00';
     }
     drawTrigger(){
        ctx.strokeRect(this.x+this.width-31, this.y+(this.height/3)+1.5, 12, 155);
         if(this.gamepad && this.gamepad.buttons[7]){
             for(var i=0 ; i < Math.floor(this.gamepad.buttons[7].value*22) ; i++){
                ctx.fillRect(this.x+this.width-30, this.y+this.height-50-i*7, 10, 5);
             }
         }
         ctx.strokeRect(this.x+19, this.y+(this.height/3)+1.5, 12, 155);
         if(this.gamepad && this.gamepad.buttons[6]){
            for(var i=0 ; i < Math.floor(this.gamepad.buttons[6].value*22) ; i++){
               ctx.fillRect(this.x+20, this.y+this.height-50-i*7, 10, 5);
            }
        }
     }
 }

 function update()
 {
    Gamepad.clear();
    //console.log("updated");
    gamepads = navigator.getGamepads();
    for(var i=0;i<gamepads.length;i++){
        if( gamepads[i]){
            if( gamepads[i].connected){
                gp[i] = new Gamepad(i);
                gp[i].showInfo();
            }
            else{
                delete gp[i];
            }
        }
    }
 }

 function start()
 {
    mycanvas = document.getElementById('gameCanvas');
    ctx = mycanvas.getContext('2d');

    gamepads = navigator.getGamepads();
    for(var i = 0 ; gamepads[i] != null ; i++){
        console.log(gamepads[i].id);
        gp[i] = new Gamepad(i);
        gp[i].showInfo();
    }
    setInterval(update, 20);
 }
