function on_movetoedge_clicked(){
    if (ui.messages.plainText == 'Edge caliculation Finished!'){
      var movetoedgegcode = 'G90G00X'+String(ui.edgex.value)+'Y'+String(ui.edgey.value);
      main.sendCommand(movetoedgegcode, -10, mainSettings.showUICommands);
    }
    else{
        ui.messages.plainText = 'Caliculate Edge Point first.'; 
    }
}

function on_probex_clicked(){
    var probexgcode = settings.probexcommand.text
    ui.messages.plainText = probexgcode;
    main.sendCommand(probexgcode, -10, mainSettings.showUICommands);
}

function on_probey_clicked(){
    var probeygcode = settings.probeycommand.text
    main.sendCommand(probeygcode, -10, mainSettings.showUICommands);
}

function on_setpoint1_clicked() {
    ui.point1x.value = vars.Wx;
    ui.point1y.value = vars.Wy;
}

function on_setpoint2_clicked() {
    ui.point2x.value = vars.Wx;
    ui.point2y.value = vars.Wy;
}

function on_setpoint3_clicked() {
    ui.point3x.value = vars.Wx;
    ui.point3y.value = vars.Wy;
}

function on_setpoint4_clicked() {
    ui.point4x.value = vars.Wx;
    ui.point4y.value = vars.Wy;
}

function on_calcedge_clicked() {
    var rad2deg = 180/3.14159265;
    var p1x = ui.point1x.value;
    var p1y = ui.point1y.value;
    var p2x = ui.point2x.value;
    var p2y = ui.point2y.value;
    var p3x = ui.point3x.value;
    var p3y = ui.point3y.value;
    var p4x = ui.point4x.value;
    var p4y = ui.point4y.value;
    var probedia = ui.probedia.value;
    

    var ox = 999999999;
    var oy = 999999999;
    var p1xoffset=p1x;
    var p1yoffset=p1y;
    var p3xoffset=p3x;
    var p3yoffset=p3y;
    var theata1 = 999999999;
    var theata2 = 999999999;
    var a1 = 0;
    var b1 = 0;
    var a2 = 0;
    var b2 = 0;
    
    
    if ( (p1y==p2y) | (p3x==p4x) ){
        ui.messages.plainText = 'Point Error.Probe Again.';
        javascript_die();
    }
    
    if ( (probedia > 99) | (probedia < 0.001) ){
        ui.messages.plainText = 'Invalid probe diameter.';
        javascript_die();
    }
    
    if (p1x == p2x){
        ox = p1x+probedia/2;
        theata1 = 0;
    }
    else {
    a1 = (p2y-p1y)/(p2x-p1x);
    theata1 = Math.atan(-1/a1);

    p1xoffset=p1x+Math.cos(theata1)*probedia/2;
    p1yoffset=p1y+Math.sin(theata1)*probedia/2;
    b1= -a1*p1xoffset+p1yoffset;
    } 
    
    a2 = (p4y-p3y)/(p4x-p3x);
    theata2 = Math.atan(a2);
    p3xoffset=p3x-Math.sin(theata2)*probedia/2;
    p3yoffset=p3y+Math.cos(theata2)*probedia/2;
    b2 = -a2*p3xoffset+p3yoffset;
    
    if (theata1 != 0) ox = (b2-b1)/(a1-a2);
    
    oy = a2 * ox + b2;
    
    theata1 = theata1*rad2deg;
    theata2 = theata2*rad2deg;
    theata1 = theata1.toFixed(4);
    theata2 = theata2.toFixed(4);
    ox=ox.toFixed(3);
    oy=oy.toFixed(3);
    ui.theata1deg.value = theata1;
    ui.theata2deg.value = theata2;
    ui.edgex.value = ox;
    ui.edgey.value = oy;
    
    ui.messages.plainText = 'Edge caliculation Finished!';
}

ui.setpoint1.clicked.connect(on_setpoint1_clicked);
ui.setpoint2.clicked.connect(on_setpoint2_clicked);
ui.setpoint3.clicked.connect(on_setpoint3_clicked);
ui.setpoint4.clicked.connect(on_setpoint4_clicked);
ui.calcedge.clicked.connect(on_calcedge_clicked);
ui.probex.clicked.connect(on_probex_clicked);
ui.probey.clicked.connect(on_probey_clicked);
ui.movetoedge.clicked.connect(on_movetoedge_clicked);
//main.responseReceived.connect(on_responseReceived);
//main.settingsLoaded.connect(on_settings_loaded);
//main.settingsAboutToSave.connect(on_settings_aboutToSave);
//main.settingsChanged.connect(on_settings_changed);