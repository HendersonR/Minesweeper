import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
   <button>{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%;  }']
})
export class SquareComponent{

   @Input() value: '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|' '|'B';

}
