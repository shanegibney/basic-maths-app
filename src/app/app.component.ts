import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<div class="container">
    <div class="row">
      <!-- <h2>Guess the Number!</h2>
      <p class="well lead">Guess the computer generated random number between 1 and 1000.</p>
      <label>Your Guess: </label>
      <input type="number" [value]="guess" (input)="guess = $event.target.value"/>
      <button (click)="verifyGuess()" class="btn btn-primary btn-sm">Verify</button>
      <button (click)="initializeGame()" class="btn btn-warning btn-sm">Restart</button>
      <div>
        <p *ngIf="deviation<0" class="alert alert-warning">Your guess is higher.</p>
        <p *ngIf="deviation>0" class="alert alert-warning">Your guess is lower.</p>
        <p *ngIf="deviation===0" class="alert alert-success">Yes! That's it.</p>

      </div>
      <p class="text-info">No of guesses:
        <span class="badge">{{noOfTries}}</span>
      </p> -->
      <h2>You do the Math!...</h2>
      <p><button (click)="toggle()" class="btn btn-warning btn-sm">Settings</button></p>
      <div *ngIf="show===true">
      <p>need checkboxes here!</p>
      <!-- <input class="form-control form-rounded" type="checkbox" [value]="operation" (input)="operation = $event.target.value" /> Addition -->
      <p><input [(ngModel)]="addition" type="checkbox"/> <i class="fa fa-plus"></i> addition</p>
      <p><input [(ngModel)]="subtraction" type="checkbox"/> <i class="fa fa-minus"></i> subtraction</p>
      <p><input [(ngModel)]="multiplication" type="checkbox"/> <i class="fa fa-times"></i> multiplication</p>
      <p><input [(ngModel)]="division" type="checkbox"/> <strong>&#247;</strong> division</p>

      <p><button (click)="toggle()" class="btn btn-warning btn-sm">Submit</button></p>
      </div>
      <div class="col-md-6" style="text-align:right;">
        <!-- Checkbox value: <input type="checkbox" [value]="operation" (input)="operation = $event.target.value"/> -->
        <span class="question"><font size="10">{{num1}} + {{num2}} = </font></span>
      </div>
      <div class="col-md-3" style="vertical-align:center;">
         <input class="form-control form-rounded" type="number" style="width:100px; height:50px;" [value]="answer" (input)="answer = $event.target.value" />
      </div>
      <div class="co-md-3">

      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="text-align:center;" >
        <button (click)="doCalculate()" class="btn btn-warning btn-sm">Submit</button>
        <button (click)="init()" class="btn btn-warning btn-sm">Restart</button>

        <!-- <p *ngIf="result===true" class="alert alert-warning">That is the correct answer.</p> -->
        <p *ngIf="result===false" class="alert alert-warning"><i class="fa wrong fa-times fa-3x" aria-hidden="true"></i> <font size="6">Have another go!</font></p>
        <p *ngIf="result===true" class="alert alert-warning"><i class="fa correct fa-check fa-3x" aria-hidden="true"></i> Well done!</p>
        <span *ngIf="total!=0" class="question"><font size="10">{{ score }} correct out of {{ total }}</font></span>
        <!-- <p>Checked value is {{ operation }}</p> -->
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app works!';
  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;
  num1: number;
  num2: number;
  result: boolean;
  answer: number;
  score: number;
  total: number;
  operation: boolean[];
  show: boolean;
  addition: boolean = true;
  subtraction: boolean = false;
  multiplication: boolean = false;
  division: boolean = false;
  selectedOperations: boolean[];

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.noOfTries = 0;
    this.original = Math.floor((Math.random() * 10) + 1);
    this.num1 = Math.floor((Math.random() * 10) + 1);
    this.num2 = Math.floor((Math.random() * 10) + 1);
    this.result = null;
    this.answer = null;
    this.guess = null;
    this.deviation = null;
    this.score = 0;
    this.total = 0;
    this.operation = [true, false, false, false];
    this.selectedOperations = [];
    this.addition = true;
    this.subtraction = false;
    this.multiplication = false;
    this.division = false;
    this.show = false;
  }

  verifySettings() {
    this.deviation = this.original - this.guess;
    this.noOfTries = this.noOfTries + 1;
  }

  toggle(){
    this.show =! this.show;
    this.operation = [this.addition, this.subtraction, this.multiplication, this.division];
    for(var i=0; i<this.operation.length; i++){
      console.log("settings " + this.operation[i]);
    }
    if(!this.operation[0] && !this.operation[1] && !this.operation[2] && !this.operation[3]){
      alert('You must choose at least one operator.');
    }
    this.doCalculate();
  }
    // console.log("blah bee blah bloo!");
    // console.log("checked result is " + this.operation);


  init(){
    this.total = 0;
    this.score = 0;
    this.answer = null;
    this.result = null;
    console.log(this.operation[0]);
    this.num1 = Math.floor((Math.random() * 10) + 1);
    this.num2 = Math.floor((Math.random() * 10) + 1);
  }

  doCalculate(){
    this.operation = [this.addition, this.subtraction, this.multiplication, this.division];
    if(this.answer == this.num1 + this.num2){
      this.result = true;
      this.score = this.score + 1;
    } else {
      this.result = false;
    }
    this.total = this.total + 1;
    this.answer = null;
    this.num1 = Math.floor((Math.random() * 10) + 1);
    this.num2 = Math.floor((Math.random() * 10) + 1);
    console.log(this.operation);
  }
}
