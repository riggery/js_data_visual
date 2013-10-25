var NS="http://www.w3.org/2000/svg";

// addMethod - By John Resig (MIT Licensed)
function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}


function Shape(){
	this.svg = 'none'
	this.shp = null;
	this.col = 'none';
}

function Line(){
	Shape.apply(this);
	this.x1c = 0;
	this.y1c = 0;
	this.x2c = 0;
	this.y2c = 0;
	this.sw = 'none';
	addMethod(this, "x1", function(x1){
    	this.x1c = x1; 
		return this;
    });
	addMethod(this, "x1", function(){
		return this.x1c;
    });

	addMethod(this, "x2", function(x2){
    	this.x2c = x2; 
		return this;
    });
	addMethod(this, "x2", function(){
		return this.x2c;
    });

    addMethod(this, "y1", function(y1){
    	this.y1c = y1; 
		return this;
    });
	addMethod(this, "y1", function(){
		return this.y1c;
    });

	addMethod(this, "y2", function(y2){
    	this.y2c = y2; 
		return this;
    });
	addMethod(this, "y2", function(){
		return this.y2c;
    });
	
	/*for method overloadding*/
	addMethod(this, "stroke", function(color){
    	this.col = color; 
		console.log(this.col);
		return this;
    });
	addMethod(this, "stroke", function(){
		return this.col;
    });
    addMethod(this, "strokeWidth", function(sw){
    	this.sw = sw; 
		console.log(this.sw);
		return this;
    });
	addMethod(this, "strokeWidth", function(){
		return this.sw;
    });
	/*this.stroke = function(color){
				this.col = color; 
				console.log(this.col);
				return this;
			}
	this.strokeWidth = function(sw){
					this.sw = sw; 
					console.log(this.sw);
					return this;
				}*/
	this.draw = function(svg){
		console.log("Drawline");
		console.log(this.x1()+" "+this.x2()+" "+this.y1()+" "+this.y2()+" "+this.stroke()+" "+this.strokeWidth());
		this.shp = document.createElementNS(NS, "line");
        this.shp.setAttributeNS(null, "x1", this.x1());
        this.shp.setAttributeNS(null, "y1", this.y1());
        this.shp.setAttributeNS(null, "x2", this.x2());
        this.shp.setAttributeNS(null, "y2", this.y2());
        this.shp.setAttributeNS(null, "stroke", this.stroke());
        this.shp.setAttributeNS(null, "stroke-width", this.strokeWidth());
        svg.appendChild(this.shp);
        return this;
	}
}

function Square(){
	Shape.apply(this);
	this.cxc = 0;
	this.cyc = 0;
	this.wid =0;
	this.cx = function(){
				return this.cxc;
			}
	this.cy = function(){
				return this.cyc;
			}
	this.center = function(cx,cy){
					this.cxc = cx;
					this.cyc = cy; 
					return this;
				}

	addMethod(this, "width", function(width){
    	this.wid = width; 
		return this;
    });
	addMethod(this, "width", function(){
		return this.wid;
    });


	addMethod(this, "fill", function(color){
    	this.col = color; 
		return this;
    });
	addMethod(this, "fill", function(){
		return this.col;
    });
	this.draw = function(svg){
		console.log("draw Squre");
		console.log(this.cx()+" "+this.cy()+" "+this.width()+" "+this.fill());
	    this.shp = document.createElementNS(NS, "rect");
        this.shp.setAttributeNS(null, "x", this.cx()-this.width()/2);
        this.shp.setAttributeNS(null, "y", this.cy()-this.width()/2);
        this.shp.setAttributeNS(null, "height", this.width());
        this.shp.setAttributeNS(null, "width", this.width());
        this.shp.setAttributeNS(null, "fill", this.fill());
        svg.appendChild(this.shp);
        return this;
	}

}

//Circle has same paras with square, only different draw function
function Circle(){
	Square.apply(this);
	this.draw = function(svg){
		console.log("draw Circle");
		this.shp = document.createElementNS(NS, "circle");
        this.shp.setAttributeNS(null, "cx", this.cx());
        this.shp.setAttributeNS(null, "cy", this.cy());
        this.shp.setAttributeNS(null, "r", this.wid/2);
        this.shp.setAttributeNS(null, "fill", this.fill());
        svg.appendChild(this.shp);
        return this;
	}
}

//Rectange add a height attribute
function Rectangle(){
	Square.apply(this);
	this.height = function(hei){
					this.hei = hei; 
					console.log(this.hei);
					return this;
				}
	this.draw = function(svg){
		console.log("draw Rectangle");
		console.log(this.cx()+" "+this.cy()+" "+this.wid+" "+this.hei+" "+this.fill());
	    this.shp = document.createElementNS(NS, "rect");
        this.shp.setAttributeNS(null, "x", this.cx()-this.wid/2);
        this.shp.setAttributeNS(null, "y", this.cy()-this.hei/2);
        this.shp.setAttributeNS(null, "height", this.hei);
        this.shp.setAttributeNS(null, "width", this.wid);
        this.shp.setAttributeNS(null, "fill", this.fill());
        svg.appendChild(this.shp);
        return this;
	}
}


 function Text(){
 	Shape.apply(this);
 	this.xc = 0;
	this.yc = 0;
	this.con = "";
	this.x = function(x){
					this.xc = x;
					return this;
				}
	this.y = function(y){
					this.yc = y; 
					return this;
				}
    this.text = function(content) {
                    this.con = content;
                    return this;
            }
  
 	this.draw = function(svg){
		console.log("draw Text");
		console.log(this.con);
        this.dat  = document.createTextNode(this.con);
        this.shp = document.createElementNS(NS, "text");
        this.shp.setAttributeNS(null, "x", this.xc);
        this.shp.setAttributeNS(null, "y", this.yc);
        this.shp.setAttributeNS(null, "text-anchor", "start");
        this.shp.appendChild(this.dat);
        svg.appendChild(this.shp);
        return this;                
        
	};
}
