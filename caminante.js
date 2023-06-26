let cPosX;
let cPosY;

class Caminante{


	//--------------------------------------------------------------------

	constructor(){
		this.x = 350;
        this.y = 350;            
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


        ellipse( this.x , this.y , this.d , this.d );
    
        cPosX = this.x;
        cPosY = this.y;
        
        pop();
    }
    //--------------------------------------------------------------------

    mover(){
    
    //console.log( this.x + "   " + this.d ); 

    this.x = this.x + this.vel * cos( this.dir );
    this.y = this.y + this.vel * sin( this.dir );

    this.x = ( this.x > 700 ? this.x-700 : this.x );
    this.x = ( this.x < 0 ? this.x+700 : this.x );
    this.y = ( this.y > 700 ? this.y-700 : this.y );
    this.y = ( this.y < 0 ? this.y+700 : this.y );


    }




}