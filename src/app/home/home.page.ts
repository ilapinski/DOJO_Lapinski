import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public allBeakers =
  [
    [1, 3, 2, 1],
    [1, 3, 2, 2],
    [3, 2, 1, 3],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  public move = {
    oldBeaker: 1,
    newBeaker: 2
  };

  constructor() {}



  public makeMove() {
    const oldBeaker = this.allBeakers[this.move.oldBeaker - 1];
    const newBeaker = this.allBeakers[this.move.newBeaker - 1];
    const unitsToMove = this.getUnitLength(oldBeaker);

    if (this.isMoveLegal() === true && this.move.oldBeaker !== this.move.newBeaker) {
      for (let i = unitsToMove; i > 0; i--) {
        const colorOfUnitToMove = this.findLastNonZeroElement(oldBeaker);
        const indexOfOldUnit = this.getUnitLength(oldBeaker);
        const indexOfNewUnit = this.getUnitLength(newBeaker) + 1;
        this.allBeakers[this.move.oldBeaker - 1][indexOfOldUnit - 1] = 0;
        this.allBeakers[this.move.newBeaker - 1][indexOfNewUnit - 1] = colorOfUnitToMove;
      }
    }
  }



  isMoveLegal() {
    // the target beaker has enough space for the entire liquid that is going to be poured into it
    let firstRequirement = false;
    let secondRequirement = false;

    const oldBeaker = this.allBeakers[this.move.oldBeaker - 1];
    const newBeaker = this.allBeakers[this.move.newBeaker - 1];

    const oldBeakerUnitLength = this.getUnitLength(oldBeaker);
    const newBeakerUnitLength = this.getUnitLength(newBeaker);

    if ((oldBeakerUnitLength + newBeakerUnitLength) > 5) {
      // not enough space
      firstRequirement = false;
    } else {
      // enough space
      firstRequirement = true;
    }

    if (this.findLastNonZeroElement(oldBeaker) === this.findLastNonZeroElement(newBeaker) ||
        this.findLastNonZeroElement(newBeaker) === 0) {
      secondRequirement = true;
    }
    console.log()

    return (firstRequirement && secondRequirement);
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



  private getUnitLength(array: number[]) {
    let unitLength = 0;

    array.forEach(
      (element, index) => {
        if (element > 0) {
          unitLength = index + 1;
        }
      }
    );

    return unitLength;
  }
}
