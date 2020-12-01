import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public allBeakers =
  [
    [1, 0, 0],
    [2, 1, 2],
    [2, 1, 0]
  ];
  public move = {
    oldBeaker: 1,
    newBeaker: 2
  };

  constructor() {}

  public makeMove() {
  }

  isMoveLegal() {
    // the target beaker has enough space for the entire liquid that is going to be poured into it
    let firstRequirement = false;
    let secondRequirement = false;

    if (this.allBeakers[this.move.oldBeaker - 1][2] === 0) {
      firstRequirement = true;
    }

    if (this.findLastNonZeroElement(this.allBeakers[this.move.oldBeaker - 1]) === this.findLastNonZeroElement(this.allBeakers[this.move.newBeaker - 1])) {
      secondRequirement = true;
    }

    console.log({
      firstRequirement,
      secondRequirement
    });
  }

  private findLastNonZeroElement(array: number[]) {
    let lastNonZero = 0;

    array.forEach(
      element => {
        if (element > 0) {
          lastNonZero = element;
        }
      }
    );

    return lastNonZero;
  }
}
