/*Data Preprocess - Date Parse and Max/Min y axial value Get*/
function DataPreProcess(data){
	this.level_max = data[0].level;
	this.level_min = data[0].level;
	this.dataPro = new Array(); 
	for(var i=0;i<co2.length;i++){
		var list = new Array();
		list.push(Number(new Date(co2[i].date).getFullYear())+Number(new Date(co2[i].date).getMonth())/12.0);
		list.push(Number(co2[i].level));
		this.dataPro.push(list);
		//console.log(list);
		if(data[i].level<this.level_min){
			this.level_min = data[i].level;
		}else if(data[i].level>this.level_max){
			this.level_max = data[i].level;
		}
	}
}


function Plot(svg, data) {
	this._svg = svg;
    this.wid = this._svg.getAttribute("width");
    this.hei = this._svg.getAttribute("height");
    this.data =new DataPreProcess(data);
    this.left = 80;
    this.right = 40;
    this.bottom = 60;
    this.top = 0;
    this.xspace = 12;
    this.yspace = 12;
    this.maxy = 0;
    console.log(this.data.dataPro)
    //console.log(this.wid+" "+this.hei+" "+this.data.dataPro.length)
        
    //draw coordinate
    this.drawCoords = function() {
            this.ax_x1 = this.left;
            this.ax_x2 = this.wid - this.right;
            this.x_max = this.ax_x2 - this.ax_x1;
            this.x_num = this.x_max/this.data.dataPro.length;
           	this.xstart = this.data.dataPro[0][0];                //1959   
            this.ax_y1 = this.hei - this.bottom;
            this.ax_y2 = this.top;

    
			//xcoord              
            var x_axis = new Line().x1(this.ax_x1).y1(this.ax_y1)
                            .x2(this.ax_x2).y2(this.ax_y1)
                            .stroke('black').strokeWidth(5).draw(this._svg);

		   	var ux = this.x_num * this.xspace;
		   	var i=11; 
		    while (ux <= this.x_max) {
		            var x_coor = new Line().x1(ux + this.left).y1(this.ax_y1)
		                    .x2(ux + this.left).y2(this.ax_y2)
		                    .stroke("blue").strokeWidth(1)
		                    .draw(this._svg);
		            
		            var x_text = new Text()
		                .x(ux + this.left - 15).y(this.ax_y1+20)
		                .text(Math.floor(this.data.dataPro[i][0]))
		                .draw(this._svg);
		            i += this.xspace;
		            ux += this.x_num * this.xspace;
		    }


			//ycoord  
      this.y_max = this.ax_y1 - this.ax_y2;				  //Distance on graph
      this.y_num = this.y_max/this.data.dataPro.length;     //
     	this.ystart = this.data.dataPro[0][1]/10;         
     	this.y_data_range_per = Math.round((this.data.level_max - this.data.level_min)/this.yspace);

     	//alert(this.y_max+" "+this.y_num+" "+this.ystart);
     	//alert(this.data.level_max +" "+ this.data.level_min);
     //alert(this.y_data_range);              
      var y_axis = new Line().x1(this.ax_x1).y1(this.ax_y1)
                      .x2(this.ax_x1).y2(this.ax_y2)
                      .stroke('black').strokeWidth(5).draw(this._svg);
	   	var uy = this.y_num * this.yspace;
	   	var iy= Math.floor(this.data.level_min); 
	    while (uy <= this.y_max) {
	            var y_coor = new Line().x1(this.ax_x1).y1(uy - this.ax_y2)
	                    .x2(this.ax_x2).y2(uy - this.ax_y2)
	                    .stroke("blue").strokeWidth(1)
	                    .draw(this._svg);
	            
	            var y_text = new Text()
	                .x(this.left - 55).y(this.ax_y2-uy + 560)
	                .text(iy)
	                .draw(this._svg);
	            iy += this.y_data_range_per;
	            uy += this.y_num * this.yspace;
	    }
	    this.maxy=iy;
    };


  this.getYPosition = function(data){
     	var pos_per = (this.ax_y1 - this.ax_y2)/(this.maxy-Math.floor(this.data.level_min));
		var base = Math.floor(this.data.level_min);
		var ypos = this.y_max-(data-base)*pos_per;
		return ypos;
	}

	this.getXPosition = function(data){
     	var pos_per = (this.ax_x2 - this.ax_x1)/(this.data.dataPro[this.data.dataPro.length-1][0]-this.data.dataPro[0][0]);
      //alert(this.data.dataPro[0][0])
     	//alert((data-this.xstart)*pos_per);
		var xpos = (data-this.xstart)*pos_per+this.left;
		return xpos;
	}

  this.drawData = function() {

      var data = this.data.dataPro;
      // for(var i=0;i<data.length;i++){
      // 		   		console.log(this.getXPosition(data[i][0])+" "+this.getYPosition(data[i][1]));
      // }
	    var prevX = this.getXPosition(data[0][0]);
      var prevY = this.getYPosition(data[0][1]);
      var newX, newY;
      for (var i = 1; i < data.length; i++) {

      		console.log(this.getXPosition(data[i][0])+" "+this.getYPosition(data[i][1]));
              newX = this.getXPosition(data[i][0]);
              newY = this.getYPosition(data[i][1]);
              var l = new Line().x1(prevX).y1(prevY)
              .x2(newX).y2(newY)
              .stroke("green").strokeWidth(1)
              .draw(this._svg);
        prevX = newX;
        prevY = newY;

  		}
  }
  this.drawCoords();
  this.drawData();
}

