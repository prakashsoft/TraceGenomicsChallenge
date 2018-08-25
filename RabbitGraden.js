// Prompt: Write a function that takes the input, gives the output, and meets the conditions below.
// Input: An N x M matrix of a garden. Each cell contains a positive integer representing the number of carrots in that part of the garden.
// Output: The number of carrots Bunny eats before falling asleep.


const findtrueNeighboringCells = (row, column, garden1) => {
  const trueNeighboringCells = {}

  const MoveUp = row !== 0 && garden1[row - 1][column] > 0
  const MoveDown = row !== garden1.length - 1 && garden1[row + 1][column] > 0
  const MoveLeft = column !== 0 && garden1[row][column - 1] > 0
  const MoveRight = column !== garden1[0].length - 1 && garden1[row][column + 1] > 0

  if (MoveUp) {
    trueNeighboringCells['up'] = {
      'cellValue': garden1[row - 1][column],
      'row': row - 1,
      'column': column
    }
  }
  if (MoveDown) {
    trueNeighboringCells['down'] = {
      'cellValue': garden1[row + 1][column],
      'row': row + 1,
      'column': column
    }
  }
  if (MoveLeft) {
    trueNeighboringCells['left'] = {
      'cellValue': garden1[row][column - 1],
      'row': row,
      'column': column - 1
    }
  }
  if (MoveRight) {
    trueNeighboringCells['right'] = {
      'cellValue': garden1[row][column + 1],
      'row': row,
      'column': column + 1
    }
  }
  return trueNeighboringCells
}

const numberofCarrotsToEat = garden1 => {
  const width = garden1[0].length
  const height = garden1.length

  // TODO: determine cell close to middle of garden with max carrot count
  let row = Math.floor(width / 2)
  let column = Math.floor(height / 2)

  let carrotsToEat = garden1[row][column]

  while (true) {
    let neighboringCells = findtrueNeighboringCells(row, column, garden1.slice())

    let neighboringCellWithMaxValue = {
      'cellValue': 0,
      'direction': ''
    }

    // Determine which neighboring cell has the largest amount of carrots
    for (direction in neighboringCells) {
      if (neighboringCells[direction]['cellValue'] > neighboringCellWithMaxValue['cellValue']) {
        neighboringCellWithMaxValue['cellValue'] = neighboringCells[direction]['cellValue']
        neighboringCellWithMaxValue['direction'] = direction
      }
    }

    garden1[row][column] = -1 // mark current cell as visited

    if (neighboringCellWithMaxValue['cellValue'] === 0) {
      return carrotsToEat // done
    } else {
      carrotsToEat += neighboringCellWithMaxValue['cellValue']

      // move
      row = neighboringCells[neighboringCellWithMaxValue['direction']]['row']
      column = neighboringCells[neighboringCellWithMaxValue['direction']]['column']
    }
  }
}

const garden1 = [
  [5, 7, 8, 6, 3],
  [0, 0, 7, 0, 4],
  [4, 6, 3, 4, 9],
  [3, 1, 0, 5, 8]
]

// Out put garden1

console.log(numberofCarrotsToEat(garden1))

// garden1 Path
console.log(garden1)
// [ [ -1, -1, -1, 6, 3 ],
//   [ 0, 0, -1, 0, 4 ],
//   [ 4, 6, -1, 4, 9 ],
//   [ 3, 1, 0, 5, 8 ] ]
