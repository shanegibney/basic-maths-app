import { Component, Directive, OnInit, ElementRef, Renderer, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { D3graphComponent } from './d3graph/d3graph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  num1: number = 1;
  num2: number = 10;
  result: boolean = null;
  addmin1: number = 1;
  addmax1: number = 10;
  addmin2: number = 1;
  addmax2: number = 10;
  submin1: number = 1;
  submax1: number = 10;
  submin2: number = 1;
  submax2: number = 10;
  multmin1: number = 1;
  multmax1: number = 10;
  multmin2: number = 1;
  multmax2: number = 10;
  divmin1: number = 1;
  divmax1: number = 10;
  divmin2: number = 1;
  divmax2: number = 10;
  addtotal: number = 0;
  subtotal: number = 0;
  multtotal: number = 0;
  divtotal: number = 0;
  answer: number;
  solution: number;
  score: number = 0;
  addscore: number = 0;
  subscore: number = 0;
  multscore: number = 0;
  divscore: number = 0;
  total: number = 0;
  operation: boolean[];
  problems: { num1: number, op: string, num2: number, answer: number, result: boolean, solution: number}[] = [];
  show: boolean = true;
  addition: boolean = true;
  subtraction: boolean = false;
  multiplication: boolean = false;
  division: boolean = false;
  op: string;
  negativeanswers: boolean = true;
  // details: {}[]= [{name: 'John', addtotal: 'this.addtotal}];
  values: {name: string, yVal: number}[]= [];

  constructor() {
    this.makeadd();
  }

  arrayBuild(){
    console.log("arrayBuild() running");
    this.values = [{name: 'add', yVal: this.addscore}, {name: 'sub', yVal: this.subscore}, {name: 'mult', yVal: this.multscore}, {name: 'div', yVal: this.divscore}];
    for(let i=0; i<this.values.length; i++){
      console.log("name: ", this.values[i].name, " yVal: ", this.values[i].yVal);
    }
  }

  makeadd(){
    if(!this.addition && !this.subtraction && !this.multiplication && !this.division){
      this.addition = true;
      alert("At least one operator must be chosen. Setting addition to on.");
    }

    if(this.addition){
      this.additionproblem();
    } else {
      this.makesub();
    }
  }

  makesub(){
    if(this.subtraction){
      this.subtractionproblem();
    } else {
      this.makemult();
    }
  }

  makemult(){
    if(this.multiplication){
      this.multiplicationproblem();
    } else {
      this.makediv();
    }
  }

   makediv(){
    if(this.division){
      this.divisionproblem();
    } else {
      this.makeadd();
    }
  }

additionproblem(){
   this.op = "+";
   this.num1 = this.generate(this.addmin1, this.addmax1);
   this.num2 = this.generate(this.addmin2, this.addmax2);
}

subtractionproblem(){
  this.op = "-";
  this.num1 = this.generate(this.submin1, this.submax1);
  this.num2 = this.generate(this.submin2, this.submax2);

  // disallow negative answers if checked
  if(this.negativeanswers){
    if(this.num1 < this.num2){
      this.subtractionproblem();
    }
  }

}

multiplicationproblem(){
this.op = "*";
this.num1 = this.generate(this.multmin1, this.multmax1);
this.num2 = this.generate(this.multmin2, this.multmax2);
}

divisionproblem(){
this.op = "/";
this.num1 = this.generate(this.divmin1, this.divmax1);
this.num2 = this.generate(this.divmin2, this.divmax2);
console.log("this.num1 = " + this.num1 + ", this.num2 = " + this.num2 + ", modulus: num1/num2 = " + this.num1%this.num2);
if(this.num1%this.num2!=0){
  this.divisionproblem();
}
}

generate(min,max){
  max = +max;
  min = +min;
  return Math.round(Math.random() * (max -  min) + min);
}

check(){
  if(this.answer==null){
    alert("You did not submit an answer. This will be marked as incorrect.");
  }
  if(this.op == "/"){
    this.solution = this.num1 / this.num2;
    if(this.answer == this.num1 / this.num2){
      this.result = true;
      this.score++;
      this.divscore++;
    } else {
      this.result = false;
    }
    this.problems.push({num1: this.num1, op: this.op, num2: this.num2, answer: this.answer, result: this.result, solution: this.solution});
    this.answer = null;
    this.divtotal++;
    this.total++;
    this.arrayBuild();
    this.makeadd();
    return;
  }

  if(this.op == "*"){
    this.solution = this.num1 * this.num2;
    if(this.answer == this.num1 * this.num2){
      this.result = true;
      this.score++;
      this.multscore++;
    } else {
      this.result = false;
    }
    this.problems.push({num1: this.num1, op: this.op, num2: this.num2, answer: this.answer, result: this.result, solution: this.solution});
    this.answer = null;
    this.multtotal++;
    this.total++;
    this.arrayBuild();
    this.makediv();
    return;
  }

  if(this.op == "-"){
    this.solution = this.num1 - this.num2;
    if(this.answer == this.num1 - this.num2){
      this.result = true;
      this.score++;
      this.subscore++;
    } else {
      this.result = false;
    }
    this.problems.push({num1: this.num1, op: this.op, num2: this.num2, answer: this.answer, result: this.result, solution: this.solution});
    this.answer = null;
    this.subtotal++;
    this.total++;
    this.arrayBuild();
    this.makemult();
    return;
  }

  if(this.op == "+"){
    this.solution = this.num1 + this.num2;
    if(this.answer == this.num1 + this.num2){
      this.result = true;
      this.score++;
      this.addscore++;
    } else {
      this.result = false;
    }
    this.problems.push({num1: this.num1, op: this.op, num2: this.num2, answer: this.answer, result: this.result, solution:this.solution});
    this.answer = null;
    this.addtotal++;
    this.total++;
    // this.values[0] = {name: "add", yVal: this.addscore};
    this.arrayBuild();
    this.makesub();
    return;
  }
 }

  toggle(){
    this.show =! this.show;
  }

  restart(){
    this.answer = null;
    this.result = null;
    this.addtotal = 0;
    this.subtotal = 0;
    this.multtotal = 0;
    this.divtotal = 0;
    this.score = 0;
    this.addscore = 0;
    this.subscore = 0;
    this.multscore = 0;
    this.divscore = 0;
    this.total = 0;
    this.problems = [];
    this.addition = true;
    this.subtraction = false;
    this.multiplication = false;
    this.division = false;
    this.negativeanswers = true;
  }
}
