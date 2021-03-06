import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
//import { count } from 'console';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: any[];
  hidden_values: any[];
  gameover: boolean;
  found: boolean;//remove later
  result: string;
  temp : any;
  bomb_count: any;
  scenario : any;
  checked_on_right: boolean;
  on_right : boolean;
  games_played: any;
  victories: any;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(81).fill(null);
    this.hidden_values = Array(81).fill(null);
    this.result = null;
    this.found = null;//remove later
    this.gameover = null;
    this.checked_on_right = false;
    

    //place bombs
    for(let i=0; i<10; i++)
    {
      this.temp = Math.floor((Math.random()*81));
      //available space
      if(!this.hidden_values[this.temp])
      {
        this.hidden_values[this.temp]='B';
        
      }
      //bomb is already there
      else
      {
       i--; 
      }

    }

    //place numbers
    this.temp = 0;
    this.bomb_count = 0;
    for(let i=0; i<81; i++)
    {
      if(!(this.hidden_values[i]=='B'))
      {
        //corners
        if(i==0)
        {
          this.scenario=1;
          this.countBombs(i);
          
        }
        else if(i==8)
        {
          this.scenario=2;
          this.countBombs(i);
        }
        else if(i==72)
        {
          this.scenario = 3;
          this.countBombs(i);
        }
        else if(i==80)
        {
          this.scenario = 4;
          this.countBombs(i);
        }
        //Top row
        else if(i<9)
        {
          this.scenario = 5;
          this.countBombs(i);
        }
        //Left column
        else if((i%9)==0)
        {
          this.scenario = 6;
          this.countBombs(i);
        }
         //Bottom row
         else if(i>72)
         {
           this.scenario = 8;
           this.countBombs(i);
         }
      
        //normal square or right column
        else
        {
          this.checkRight(i)
          if(!this.on_right)
          {
            console.log("Normal Sq:", i);
            this.scenario = 9;
            this.countBombs(i);
          }
          this.on_right = false;
        }
       
      }
    }
    
    
  }

  //determines if square is on right edge of game board
  checkRight(i)
  {
    switch(i)
    {
      case 71:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      case 62:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      case 53:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      case 44:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      case 35:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      case 26:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      case 17:
        this.on_right = true;
        this.scenario = 7;
        this.countBombs(i);
        break;
      default:
        this.on_right = false;
        break;

    }

  }

  checkWinner()
  {
    if(this.gameover==false)
    {
      this.result="lose";
      return null;
    }
    else if(this.gameover==true)
    {
      this.result="win";
      return null;
    }
  }

  makeMove(i)
  {
    //player hit bomb
    if(this.hidden_values[i]=='B')
    {
      this.found=true;//remove later
      this.gameover=false;
      this.revealBoard();
    }
    //player didnt hit bomb
    else
    {
      console.log("move at ", i);
      console.log("hidden value ",this.hidden_values[i]);
      this.squares[i] = this.hidden_values[i];
    }
    this.checkWinner();
  }
  //reveal bomb locations
  revealBoard()
  {
    for(let i=0; i<81; i++)
    {
      this.squares[i]=this.hidden_values[i];
    }
  }

  //count bombs surrounding current space
  countBombs(i)
  {
    this.temp = 0;
    switch(this.scenario)
    {
      case 9: //regular square
        //check TopLeft for Bomb
        if(this.hidden_values[i-10]=='B')
        {
          this.bomb_count++;
        }
        //check TopMiddle for Bomb
        if(this.hidden_values[i-9]=='B')
        {
          this.bomb_count++;
        }
        //check TopRight for Bomb
        if(this.hidden_values[i-8]=='B')
        {
          this.bomb_count++;
        }
        //check Left for Bomb
        if(this.hidden_values[i-1]=='B')
        {
          this.bomb_count++;
       
        }
        //check Right for Bomb
        if(this.hidden_values[i+1]=='B')
        {
          this.bomb_count++;
        }
        //check BottomLeft for Bomb
        if(this.hidden_values[i+8]=='B')
        {
          this.bomb_count++;
        }
        //check BottomMiddle for Bomb
        if(this.hidden_values[i+9]=='B')
        {
          this.bomb_count++;
        }
        //check BottomRight for Bomb
        if(this.hidden_values[i+10]=='B')
        {
          this.bomb_count++;
        }
        console.log("regular square at", i);
        this.hidden_values[i]=this.bomb_count;
        this.bomb_count = 0;
        
        break;
      case 1://top left corner
   
        //check Right for Bomb
        if(this.hidden_values[i+1]=='B')
        {
          this.bomb_count++;
        }
      
        //check BottomMiddle for Bomb
        if(this.hidden_values[i+9]=='B')
        {
          this.bomb_count++;
        }
        //check BottomRight for Bomb
        if(this.hidden_values[i+10]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i]=this.bomb_count;
        this.bomb_count = 0;
        break;
      case 2://top right corner
        //check Left for Bomb
        if(this.hidden_values[i-1]=='B')
        {
          this.bomb_count++;
        }
        //check BottomLeft for Bomb
        if(this.hidden_values[i+8]=='B')
        {
          this.bomb_count++;
        }
        
        //check BottomMiddle for Bomb
        if(this.hidden_values[i+9]=='B')
        {
          this.bomb_count++;       
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      case 3://bottom left corner
      
        //check TopMiddle for Bomb
        if(this.hidden_values[i-9]=='B')
        {
          this.bomb_count++;
        }
        //check TopRight for Bomb
        if(this.hidden_values[i-8]=='B')
        {
          this.bomb_count++;
        }
     
        //check Right for Bomb
        if(this.hidden_values[i+1]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      case 4://bottom right corner
        //check TopLeft for Bomb
        if(this.hidden_values[i-10]=='B')
        {
          this.bomb_count++;
        }
        //check TopMiddle for Bomb
        if(this.hidden_values[i-9]=='B')
        {
          this.bomb_count++;
        }
        //check Left for Bomb
        if(this.hidden_values[i-1]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      case 5: //top row
        //check Left for Bomb
        if(this.hidden_values[i-1]=='B')
        {
          this.bomb_count++;
        }
        //check Right for Bomb
        if(this.hidden_values[i+1]=='B')
        {
          this.bomb_count++;
        }
        //check BottomLeft for Bomb
        if(this.hidden_values[i+8]=='B')
        {
          this.bomb_count++;
        }
        //check BottomMiddle for Bomb
        if(this.hidden_values[i+9]=='B')
        {
          this.bomb_count++;
        }
        //check BottomRight for Bomb
        if(this.hidden_values[i+10]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      case 6: //left column
        //check TopMiddle for Bomb
        if(this.hidden_values[i-9]=='B')
        {
          this.bomb_count++;
        }
        //check TopRight for Bomb
        if(this.hidden_values[i-8]=='B')
        {
          this.bomb_count++;
       
        }
        //check Right for Bomb
        if(this.hidden_values[i+1]=='B')
        {
          this.bomb_count++;
        }
        //check BottomMiddle for Bomb
        if(this.hidden_values[i+9]=='B')
        {
          this.bomb_count++;
        }
        //check BottomRight for Bomb
        if(this.hidden_values[i+10]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      case 7: //right column
        //check TopLeft for Bomb
        if(this.hidden_values[i-10]=='B')
        {
          this.bomb_count++;
        }
        //check TopMiddle for Bomb
        if(this.hidden_values[i-9]=='B')
        {
          this.bomb_count++;
        }
        //check Left for Bomb
        if(this.hidden_values[i-1]=='B')
        {
          this.bomb_count++;
        }
        //check BottomLeft for Bomb
        if(this.hidden_values[i+8]=='B')
        {
          this.bomb_count++;
        }
        //check BottomMiddle for Bomb
        if(this.hidden_values[i+9]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      case 8: //bottom row
        //check TopLeft for Bomb
        if(this.hidden_values[i-10]=='B')
        {
          this.bomb_count++;
        }
        //check TopMiddle for Bomb
        if(this.hidden_values[i-9]=='B')
        {
          this.bomb_count++;
        }
        //check TopRight for Bomb
        if(this.hidden_values[i-8]=='B')
        {
          this.bomb_count++;
        }
        //check Left for Bomb
        if(this.hidden_values[i-1]=='B')
        {
          this.bomb_count++;
        }
        //check Right for Bomb
        if(this.hidden_values[i+1]=='B')
        {
          this.bomb_count++;
        }
        this.hidden_values[i] = this.bomb_count;
        this.bomb_count = 0;
        break;
      default:
        break;

    }
    
  }

}
