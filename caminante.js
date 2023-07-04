let cPosX;
let cPosY;

class Caminante{


	//--------------------------------------------------------------------

	constructor(){
		this.x = 0;
        this.y = 0;            
		this.d = 10;		
		this.vel = 50;
        this.dir = 0;
        this.elColor = color(0);
	}

    actualizar( intensidad , altura , derivada ){

        
        this.dir -= radians( derivada *-200);



        this.d = intensidad*40;
        

    }
    //--------------------------------------------------------------------


    dibujar(){
        push();

    
        cPosX = this.x;
        cPosY = this.y;
        
        pop();
    }
    //--------------------------------------------------------------------

    mover(){
    
    //console.log( this.x + "   " + this.d ); 

    this.x = this.x + this.vel * cos( this.dir );
    this.y = this.y + this.vel * sin( this.dir );

    this.x = ( this.x > 800 ? this.x-800 : this.x );
    this.x = ( this.x < 0 ? this.x+800 : this.x );
    this.y = ( this.y > 800 ? this.y-800 : this.y );
    this.y = ( this.y < 0 ? this.y+800 : this.y );


    }


}