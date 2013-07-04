/* Problemi:
 *
 * - Posizione Player 1
 * - Collides
 * /



/*
 * This initialize a player with id a ship
 */
function Player(index, ship){

    if (index == 1) this.posy = GetHeight() - ship.stats.dy;
    else this.posy = 0;

    this.posx = GetWidth() / 2;
    
    this.id = index;
    this.ship = ship;
    
    this.lastShoot = Date.now();
    
    this.goLeft = function(delta){
    
        if ( this.posx > 0 ) 
            this.posx -= this.ship.stats.vx * delta;       
    }
    
    this.goRight = function(delta){
    
        if ( this.posx < ( GetWidth() - this.ship.stats.dx ) ) 
            this.posx += this.ship.stats.vx * delta;       
    }
    
    this.Draw = function(ctx){
        
        ctx.drawImage(this.ship.img, this.posx, this.posy , this.ship.stats.dx, this.ship.stats.dy);
    }
    
    this.Shoot = function(){
        
        AddColpo(this);    
    }
    
    this.attacked = function(atk) {
        
        var def = this.ship.stats.def;
        
        if ( def >= atk ) 
            this.ship.stats.life -= Math.round(  ( ( Math.random() * 3 ) + 1 ) );
            
        else 
            this.ship.stats.life -=  Math.round( ( Math.random() * (atk - def) ) + 5 );
        
        if ( this.ship.stats.life <= 0 ) return true;
            else return false;
    }
}

/*
 * This defines a ship
 * ShipStats contains statistics about every Ship
 */
function Ship(id){

    this.stats = ShipStat[id];
    this.img = new Image();
    this.img.src = ShipImage[id];
}

function Colpo(player){
    
    this.player = player;
    
    if ( player.id == 1 ) {
        this.shoots = Shoots.p1;
        this.versus = Players.p2;
        this.posy = player.posy;
        this.vy = - ( player.ship.stats.vel - ( Math.random() * ( player.ship.stats.vel / 3 ) ) );
        this.img = 'images/colpo1.png';
        this.versus = Players.p2;
        this.image = immagineColpo1;
    }
    
    else {
        this.shoots = Shoots.p2;
        this.versus = Players.p1;
        this.posy = player.posy + player.ship.stats.dy;
        this.vy = ( player.ship.stats.vel - ( Math.random() * ( player.ship.stats.vel / 3 ) ) );
        this.img = 'images/colpo1.png';
        this.versus = Players.p1;
        this.image = immagineColpo2;
    }
    
    this.posx = player.posx + ( player.ship.stats.dx / 2 );
    
    this.str = player.ship.stats.atk;

    this.Collides = function(player){
        
        if ( ( this.posx >= player.posx ) && ( this.posx <= ( player.posx + player.ship.stats.dx ) )
            && ( this.posy >= player.posy ) && ( this.posy <= ( player.posy + player.ship.stats.dy ) ) )
                return true;
        
        return false;    
    }
    
    this.Update = function(delta) {
        
        this.posy += this.vy * delta;
        
        if ( ( this.posy < 0 ) || ( this.posy >= Canvas.height ) ) {
            removeShoot( this.shoots , i );
            return;
        }
        
        /* Collides Second Ship */
        if ( this.Collides( this.versus ) ) {
            
            removeShoot( this.shoots , i );
            
            /* Morto */
            if ( this.versus.attacked( this.str ) )
                SetWinner( this.player );
        }
    }
    
    this.Draw = function(ctx){
        ctx.drawImage( this.image , this.posx, this.posy );
    }

}