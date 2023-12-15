const O = "0";
const X = "X";
const EMPTY = null;

const initialState = () => [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
];

const player = board => {
  let num_x = 0;
  let num_o = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === X) {
        num_x += 1;
      }

      if (board[i][j] === O) {
        num_o += 1;
      }
    }
  }

  if (num_x > num_o) {
    return O;
  } else {
    return X;
  }
};

const actions = board => {
  const actions = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === EMPTY) {
        actions.add([i, j]);
      }
    }
  }

  return actions;
};

const result = (board, action) => {
  const possible_actions = actions(board);
  // console.log(possible_actions);

  

  if (!possible_actions.has(action)) {
    // console.log(action);
    // console.log("error");
    // return;
  }

  // if(action)

  const copy_board = JSON.parse(JSON.stringify(board));

  let x, y;
  [x, y] = action;

  // console.log(player(board));
  copy_board[x][y] = player(board);

  return copy_board;
};

const getWinner = board => {
  for (let j of ["X", "O"]) {
    for (let x = 0; x < 3; x++) {
      if (((board[x][0] === board[x][1]) === board[x][2]) === j) {
        return j;
      }
    }

    for (let x = 0; x < 3; x++) {
      if (((board[0][x] === board[1][x]) === board[2][x]) === j) {
        return j;
      }
    }

    if (((board[0][0] === board[1][1]) === board[2][2]) === j) {
      return j;
    }

    if (((board[0][2] === board[1][1]) === board[2][0]) === j) {
      return j;
    }
  }

  return null;
};

const terminal = board => {
  let winner = getWinner(board);

  if (winner !== null) {
    return true;
  }

  for (let row in board) {
    for (let cell in row) {
      if (board[row][cell] == EMPTY) {
        return false;
      }
    }
  }

  return true;
};

const utility = board => {
  const winner = getWinner(board);

  if (winner === X) {
    return 1;
  } else if (winner === O) {
    return -1;
  } else {
    return 0;
  }
};

const minimax = board => {
  if (terminal(board)) {
    return null;
  } else {
    let value, move;

    if (player(board) == X) {
      [value, move] = maxValue(board);
      return move;
    } else {
      [value, move] = minValue(board);
      return move;
    }
  }
};

const maxValue = board => {
  if (terminal(board)) {
    return [utility(board), null];
  }

  let v = -Infinity;
  let move = null;

  for (const action of actions(board)) {
    let aux, act;

    [aux, act] = minValue(result(board, action));
    if (aux > v) {
      v = aux;
      move = action;
      if (v == 1) {
        // console.log([v, move]);
        return [v, move];
      }
    }
  }
  return [v, move];
};

const minValue = board => {
  if (terminal(board)) {
    return [utility(board), null];
  }

  let v = Infinity;
  let move = null;

  for (const action of actions(board)) {
    let aux, act;

    [aux, act] = maxValue(result(board, action));
    if (aux < v) {
      v = aux;
      move = action;
      if (v == -1) {
        return [v, move];
      }
    }
  }
  return [v, move];
};

export const tictactoe = {
  X,
  O,
  initialState,
  player,
  result,
  minimax,
};
