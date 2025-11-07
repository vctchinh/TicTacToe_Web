import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";

function TicTacToe({ isDarkMode }) {
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const checkWinner = (board) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return {
          player: board[i][0],
          cells: [
            [i, 0],
            [i, 1],
            [i, 2],
          ],
        };
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return {
          player: board[0][i],
          cells: [
            [0, i],
            [1, i],
            [2, i],
          ],
        };
      }
    }

    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return {
        player: board[0][0],
        cells: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      };
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return {
        player: board[0][2],
        cells: [
          [0, 2],
          [1, 1],
          [2, 0],
        ],
      };
    }

    return null;
  };

  const handleClick = (row, col) => {
    if (board[row][col] !== null || winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Add to history
    setHistory([...history, { move: [row, col], player: currentPlayer }]);

    // Check for winner
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.player);
      setWinningCells(result.cells);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))
    );
    setCurrentPlayer("X");
    setHistory([]);
    setWinner(null);
    setWinningCells([]);
  };

  const isWinningCell = (row, col) => {
    return winningCells.some(([r, c]) => r === row && c === col);
  };

  const displayHistory = isAscending ? history : [...history].reverse();

  return (
    <div
      className={`min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] w-full transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50"
      }`}
    >
      <div className="flex items-center justify-center py-6 sm:py-8 w-full">
        <div className="text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            TIC TAC TOE
          </h1>
          <div className="w-16 sm:w-24 h-1 mx-auto bg-emerald-400 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 px-4 sm:px-6 lg:px-8 pb-8">
        {/* Game Board */}
        <div className="lg:col-start-2 lg:col-span-4 flex flex-col items-center gap-4">
          {winner && (
            <div
              className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-emerald-500 text-white shadow-xl"
              }`}
            >
              😏 Player {winner} wins 😏
            </div>
          )}

          {!winner && history.length === 9 && (
            <div
              className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                  : "bg-amber-500 text-white shadow-xl"
              }`}
            >
              🤝 It's a Draw! 🤝
            </div>
          )}

          {!winner && (
            <div
              className={`text-lg sm:text-xl md:text-2xl font-semibold mb-2 ${
                isDarkMode ? "text-slate-200" : "text-slate-800"
              }`}
            >
              Current Player:{" "}
              <span
                className={`${
                  currentPlayer === "X"
                    ? isDarkMode
                      ? "text-blue-400"
                      : "text-indigo-600"
                    : isDarkMode
                    ? "text-pink-400"
                    : "text-pink-600"
                }`}
              >
                {currentPlayer}
              </span>
            </div>
          )}

          <div
            className={`w-full max-w-md aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800/50 border-2 border-slate-600 shadow-lg"
                : "bg-white border-2 border-gray-400 shadow-xl"
            }`}
          >
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex h-1/3">
                {row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`basis-1/3 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold transition-all duration-200 ${
                      isDarkMode ? "border-slate-600" : "border-gray-400"
                    } ${rowIndex < 2 ? "border-b" : ""} ${
                      colIndex < 2 ? "border-r" : ""
                    } ${
                      isWinningCell(rowIndex, colIndex)
                        ? isDarkMode
                          ? "bg-emerald-900/50"
                          : "bg-emerald-100"
                        : isDarkMode
                        ? "hover:bg-slate-700/50"
                        : "hover:bg-gray-300"
                    } ${
                      !cell && !winner ? "cursor-pointer" : "cursor-default"
                    }`}
                    onClick={() => handleClick(rowIndex, colIndex)}
                    disabled={!!winner}
                  >
                    {cell && (
                      <span
                        className={`${
                          cell === "X"
                            ? isDarkMode
                              ? "text-blue-400"
                              : "text-indigo-600"
                            : isDarkMode
                            ? "text-pink-400"
                            : "text-pink-600"
                        } ${
                          isWinningCell(rowIndex, colIndex)
                            ? "animate-pulse"
                            : ""
                        }`}
                      >
                        {cell}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className={`mt-4 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDarkMode
                ? "border-slate-600 bg-slate-800/50 text-emerald-400 hover:bg-slate-700/50 hover:border-emerald-500 shadow-lg shadow-emerald-500/20"
                : "border-indigo-200 bg-white text-emerald-600 hover:bg-emerald-300 hover:border-emerald-300 shadow-xl"
            }`}
          >
            Reset Game
          </button>
        </div>

        {/* Move History */}
        <div className="lg:col-start-6 lg:col-span-2">
          <div
            className={`rounded-2xl p-4 sm:p-6 transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800/50 border-2 border-slate-600"
                : "bg-white border-2 border-gray-200 shadow-xl"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 md:h-8 bg-emerald-400 rounded-full"></div>
                <h2
                  className={`text-xl sm:text-2xl font-bold ${
                    isDarkMode ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  Move History
                </h2>
              </div>
              <button
                onClick={() => setIsAscending(!isAscending)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isDarkMode
                    ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
                }`}
                title={isAscending ? "Sort Descending" : "Sort Ascending"}
              >
                <ArrowUpDown size={20} />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <p
                  className={`text-center text-sm py-4 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  No moves yet
                </p>
              ) : (
                displayHistory.map((item, index) => {
                  const actualIndex = isAscending
                    ? index
                    : history.length - 1 - index;
                  const moveNumber = actualIndex + 1;
                  return (
                    <div
                      key={actualIndex}
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? "bg-slate-700/50 hover:bg-slate-700"
                          : "bg-gray-50 hover:bg-indigo-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 text-base">▸</span>
                        <span
                          className={`text-sm font-mono ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          #{moveNumber}{" "}
                          <span
                            className={`font-bold ${
                              item.player === "X"
                                ? isDarkMode
                                  ? "text-blue-400"
                                  : "text-indigo-600"
                                : isDarkMode
                                ? "text-pink-400"
                                : "text-pink-600"
                            }`}
                          >
                            {item.player}
                          </span>{" "}
                          at [{item.move[0]}, {item.move[1]}]
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
