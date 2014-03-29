/* Problemi:
 *
 * - Posizione Player 1
 * - Collides
 * /



/*
 * This class identify a player
 */
function Player(index, ship){

    if (index == 1) this.posy = Util.getHeight() - ship.stats.dy;
    else this.posy = 0;

    this.posx = Util.getWidth() / 2;
    
    this.id = index;
    this.ship = ship;
    this.life = ship.stats.life;
    this.colpito = false;
    
    this.lastShoot = Date.now();
    
    this.goUp = function(delta){
        
        if (this.id == 1) {   
           if ( this.posy > ( $(Game.Canvas).attr('height') / 2 ) )
            this.posy -= this.ship.stats.vx * delta;        
        }
        else {
            
            if ( this.posy > 0 ) 
            this.posy -= this.ship.stats.vx * delta;  
        }
    }
    
    this.goLeft = function(delta){
        
        if ( this.posx > 0 ) 
            this.posx -= this.ship.stats.vx * delta;       
    }
    
    this.goDown = function(delta){
        
        if (this.id == 1) {  
           if ( this.posy < ( $(Game.Canvas).attr('height') - this.ship.stats.dy ) ) 
            this.posy += this.ship.stats.vx * delta;        
        }
        else {
            
            if ( this.posy < ( ( $(Game.Canvas).attr('height') / 2 ) - this.ship.stats.dy ) ) 
            this.posy += this.ship.stats.vx * delta;  
        }
    }
    
    this.goRight = function(delta){
    
        if ( this.posx < ( $(Game.Canvas).attr('width') - this.ship.stats.dx ) ) 
            this.posx += this.ship.stats.vx * delta;       
    }
    
    this.Draw = function(ctx){
        if (this.colpito) {
            ctx.setAlpha(0.65);
        }
        
        ctx.drawImage(this.ship.img, this.posx, this.posy , this.ship.stats.dx, this.ship.stats.dy);
        ctx.setAlpha(1);
    }
    
    this.Shoot = function(){
        
        Util.addColpo(this);    
    }
    
    this.attacked = function(atk) {
        
        var def = this.ship.stats.def;
        
        this.colpito = true;
        setTimeout( function(player){player.colpito = false;}, 100 , this);
        
        if ( def >= atk ) 
            this.life -= Math.round(  ( ( Math.random() * 3 ) + 1 ) );
            
        else 
            this.life -=  Math.round( ( ( (Math.random() / 4 ) + 1 ) * (atk - def) ) );
        
        if ( this.life <= 0 ) return true;
            else return false;
    }
}

/*
 * This class identify a ship
 *
 */
function Ship(id){

    this.stats = Game.ShipStat[id];
    this.img = new Image();
    this.img.src = Game.ShipImage[id];
}

/*
 * Colpo class
 */
function Colpo(player){
    
    this.player = player;
    this.shoots = Game.getShoots(player.id);
    this.versus = Game.getVersus(player.id)
    this.image = Game.getImmagineColpo(player.id);
    
    if ( player.id == 1 ) {
        this.posy = player.posy;
        this.vy = - ( ( ( Math.random() / 4 ) + 1 ) * player.ship.stats.vel );
    }
    
    else {
        this.posy = player.posy + player.ship.stats.dy;
        this.vy = ( ( ( Math.random() / 4 ) + 1 ) * player.ship.stats.vel );
    }
    
    this.posx = player.posx + ( player.ship.stats.dx / 2 );
    this.str = ( ( ( Math.random() / 4 ) + 1 ) * player.ship.stats.atk );

    this.Collides = function(player){
        
        if ( ( this.posx >= player.posx ) && ( this.posx <= ( player.posx + player.ship.stats.dx ) )
            && ( this.posy >= player.posy ) && ( this.posy <= ( player.posy + player.ship.stats.dy ) ) )
                return true;
        
        return false;    
    }
    
    this.Update = function(delta) {
        
        this.posy += this.vy * delta;
        
        if ( ( this.posy < 0 ) || ( this.posy >= $(Game.Canvas).attr('height') ) ) {
            Util.removeShoot( this.shoots , i );
            return;
        }
        
        /* Collides Second Ship */
        if ( this.Collides( this.versus ) ) {
            
            Util.removeShoot( this.shoots , i );
            
            /* Morto */
            if ( this.versus.attacked( this.str ) )
                Util.setWinner( this.player );
        }
    }
    
    this.Draw = function(ctx){
        ctx.drawImage( this.image , this.posx, this.posy );
    }

}