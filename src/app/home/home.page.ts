import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public allBeakers =
  [
    [1, 3, 3, 1],
    [1, 3, 2, 2],
    [3, 2, 1, 3],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  public move = {
    oldBeaker: 1,
    newBeaker: 2
  };
  public gameEnded = false; // var to disable the "Make a move" button

  constructor() {}



  /**
   * Function for making a move.
   * It is executed when the button is clicked.
   */
  public makeMove() {
    const oldBeaker = this.allBeakers[this.move.oldBeaker - 1];
    const newBeaker = this.allBeakers[this.move.newBeaker - 1];
    const unitsToMove = this.getUnitLength(oldBeaker);

    if (this.isMoveLegal(this.move.oldBeaker, this.move.newBeaker) === true && this.move.oldBeaker !== this.move.newBeaker) {
      for (let i = unitsToMove; i > 0; i--) {
        const colorOfUnitToMove = this.findLastNonZeroElement(oldBeaker);
        const indexOfOldUnit = this.getUnitLength(oldBeaker);
        const indexOfNewUnit = this.getUnitLength(newBeaker) + 1;
        this.allBeakers[this.move.oldBeaker - 1][indexOfOldUnit - 1] = 0;
        this.allBeakers[this.move.newBeaker - 1][indexOfNewUnit - 1] = colorOfUnitToMove;
      }
    }

    this.checkIfGameEnds();
  }

  /**
   * Checks if the move is possible.
   * @param moveOldBeaker: old beaker, 1-5
   * @param moveNewBeaker: new beaker, 1-5
   */
  isMoveLegal(moveOldBeaker: number, moveNewBeaker: number) {
    // the target beaker has enough space for the entire liquid that is going to be poured into it
    let firstRequirement = false;
    let secondRequirement = false;

    const oldBeaker = this.allBeakers[moveOldBeaker - 1];
    const newBeaker = this.allBeakers[moveNewBeaker - 1];

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

    return (firstRequirement && secondRequirement);
  }

  /**
   * Check whether the player has won or lost.
   * If the user lost or won, the game ends. 
   * The send button in the UI gets disabled.
   * If user can still play, nothing happens.
   */
  checkIfGameEnds() {
    if (this.checkIfLegalMovesArePossible() === false) {
      console.log("[Game over!] There are no more legal moves to make.");
      this.gameEnded = true;
      return;
    }

    if (this.checkForContent() === true) {
      console.log("[You won!] Congratulations.");
      this.gameEnded = true;
      return;
    }
  }

  /**
   * Checks if there are still some legal moves.
   * @returns true, if possible, or false 
   */
  checkIfLegalMovesArePossible() {
    let isPossible = false;
    for (let i = 5; i > 0; i--) {
      for (let j = 5; j > 0; j--) {
        isPossible = true;
      }
    }

    return isPossible;
  }

  /**
   * Checks if the column (beaker) has homogeneous content
   */
  checkForContent() {
    let hasSameContent = false;

    for (let i = 0; i < this.allBeakers.length; i++) { // every beaker
      const isBeakerHomogeneous = this.allBeakers[i].every((value, index, array) => value === array[0]); // same content
      if(!isBeakerHomogeneous) {
        hasSameContent = false;
      }
    }
    return hasSameContent;
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
