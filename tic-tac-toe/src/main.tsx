import { useState, useEffect, memo, useMemo, useCallback, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================================================
// TYPES
// ============================================================================

type Player = 'X' | 'O';
type SquareValue = Player | null;
type Board = SquareValue[];

interface WinnerResult {
  player: Player;
  line: number[];
}

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

interface WinningLineProps {
  line: number[];
  player: Player;
}

// ============================================================================
// STYLES
// ============================================================================

const squareStyle: CSSProperties = {
  width: '120px',
  height: '120px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden'
};

const boardStyle: CSSProperties = {
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
  position: 'relative'
};

const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
};

const instructionsStyle: CSSProperties = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle: CSSProperties = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px'
};

const rowStyle: CSSProperties = {
  display: 'flex'
};

// Shape styles
const xShapeWrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  animation: 'shapeEnter 0.3s ease-out'
};

const xLineStyle: CSSProperties = {
  position: 'absolute',
  width: '70px',
  height: '10px',
  backgroundColor: '#ff6b6b',
  borderRadius: '5px',
  left: '50%',
  top: '50%',
  marginLeft: '-35px',
  marginTop: '-5px',
};

const xLine1Style: CSSProperties = {
  ...xLineStyle,
  transform: 'rotate(45deg)'
};

const xLine2Style: CSSProperties = {
  ...xLineStyle,
  transform: 'rotate(-45deg)'
};

const oStyle: CSSProperties = {
  position: 'absolute',
  width: '60px',
  height: '60px',
  border: '10px solid #4ecdc4',
  borderRadius: '50%',
  left: '50%',
  top: '50%',
  marginLeft: '-30px',
  marginTop: '-30px',
  boxSizing: 'border-box',
  animation: 'shapeEnter 0.3s ease-out',
};

// ============================================================================
// COMPONENTS
// ============================================================================

const XShape = memo(function XShape() {
  return (
    <div style={xShapeWrapperStyle}>
      <div style={xLine1Style} />
      <div style={xLine2Style} />
    </div>
  );
});

const OShape = memo(function OShape() {
  return <div style={oStyle} />;
});

const Square = memo(function Square({ value, onClick }: SquareProps) {
  console.log('Rendering Square:', value);
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}
    >
      {value === 'X' && <XShape />}
      {value === 'O' && <OShape />}
    </div>
  );
});

const WinningLine = memo(function WinningLine({ line, player }: WinningLineProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Memoize position calculation based on winning line
  const positionStyle = useMemo(() => {
    const [a, b, c] = line;

    // Rows (centered at 62px, 190px, 318px for 120px squares)
    if (a === 0 && b === 1 && c === 2) return { top: '62px', left: '0', width: '384px', transform: 'rotate(0deg)' };
    if (a === 3 && b === 4 && c === 5) return { top: '190px', left: '0', width: '384px', transform: 'rotate(0deg)' };
    if (a === 6 && b === 7 && c === 8) return { top: '318px', left: '0', width: '384px', transform: 'rotate(0deg)' };

    // Columns (centered at 62px, 190px, 318px for 120px squares)
    if (a === 0 && b === 3 && c === 6) return { top: '0', left: '62px', width: '384px', transform: 'rotate(90deg)', transformOrigin: 'top left' };
    if (a === 1 && b === 4 && c === 7) return { top: '0', left: '190px', width: '384px', transform: 'rotate(90deg)', transformOrigin: 'top left' };
    if (a === 2 && b === 5 && c === 8) return { top: '0', left: '318px', width: '384px', transform: 'rotate(90deg)', transformOrigin: 'top left' };

    // Diagonals (for 120px squares, diagonal length = sqrt(384^2 + 384^2) ≈ 543px)
    if (a === 0 && b === 4 && c === 8) return { top: '0', left: '0', width: '543px', transform: 'rotate(45deg)', transformOrigin: 'top left' };
    if (a === 2 && b === 4 && c === 6) return { top: '0', left: '384px', width: '543px', transform: 'rotate(-45deg)', transformOrigin: 'top right' };

    return {};
  }, [line]);

  // Memoize final line style
  const lineStyle: CSSProperties = useMemo(() => ({
    position: 'absolute',
    height: '4px',
    backgroundColor: player === 'X' ? '#4ecdc4' : '#ff6b6b',
    borderRadius: '2px',
    pointerEvents: 'none',
    zIndex: 10,
    transition: 'transform 0.3s ease-out',
    transform: `${positionStyle.transform || ''} scaleX(${isVisible ? 1 : 0})`,
    transformOrigin: positionStyle.transformOrigin || 'left',
    top: positionStyle.top,
    left: positionStyle.left,
    width: positionStyle.width,
  }), [positionStyle, player, isVisible]);

  return <div style={lineStyle} />;
});

function Board() {
  const [squares, setSquares] = useState<Board>(Array(9).fill(null));

  // Derive current player from board state instead of separate state
  const isXNext = useMemo(() => {
    const xCount = squares.filter(s => s === 'X').length;
    const oCount = squares.filter(s => s === 'O').length;
    return xCount === oCount;
  }, [squares]);

  // Memoize winner calculation to avoid duplicate calls
  const winnerResult = useMemo(() => calculateWinner(squares), [squares]);

  // Memoize draw calculation to avoid unnecessary iterations
  const isDraw = useMemo(
    () => !winnerResult && squares.every(square => square !== null),
    [winnerResult, squares]
  );

  // Use functional update to make handleClick stable (no dependencies)
  const handleClick = useCallback((i: number) => {
    setSquares(prevSquares => {
      // Check if square is filled or game is won
      if (prevSquares[i] || calculateWinner(prevSquares)) {
        return prevSquares; // Return same array to prevent re-render
      }

      // Calculate whose turn it is from current board state
      const xCount = prevSquares.filter(s => s === 'X').length;
      const oCount = prevSquares.filter(s => s === 'O').length;
      const currentIsXNext = xCount === oCount;

      const newSquares = prevSquares.slice();
      newSquares[i] = currentIsXNext ? 'X' : 'O';
      return newSquares;
    });
  }, []); // Empty deps - function is now stable!

  // Create memoized handlers for each square - these are now STABLE
  const handleClick0 = useCallback(() => handleClick(0), [handleClick]);
  const handleClick1 = useCallback(() => handleClick(1), [handleClick]);
  const handleClick2 = useCallback(() => handleClick(2), [handleClick]);
  const handleClick3 = useCallback(() => handleClick(3), [handleClick]);
  const handleClick4 = useCallback(() => handleClick(4), [handleClick]);
  const handleClick5 = useCallback(() => handleClick(5), [handleClick]);
  const handleClick6 = useCallback(() => handleClick(6), [handleClick]);
  const handleClick7 = useCallback(() => handleClick(7), [handleClick]);
  const handleClick8 = useCallback(() => handleClick(8), [handleClick]);

  const handleReset = (): void => {
    setSquares(Array(9).fill(null));
  };

  const status = winnerResult
    ? `Winner: ${winnerResult.player}`
    : isDraw
    ? 'Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        {status}
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {winnerResult && <WinningLine line={winnerResult.line} player={winnerResult.player} />}
        <div className="board-row" style={rowStyle}>
          <Square value={squares[0]} onClick={handleClick0} />
          <Square value={squares[1]} onClick={handleClick1} />
          <Square value={squares[2]} onClick={handleClick2} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[3]} onClick={handleClick3} />
          <Square value={squares[4]} onClick={handleClick4} />
          <Square value={squares[5]} onClick={handleClick5} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[6]} onClick={handleClick6} />
          <Square value={squares[7]} onClick={handleClick7} />
          <Square value={squares[8]} onClick={handleClick8} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// ============================================================================
// HELPERS
// ============================================================================

const WINNING_LINES = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
] as const;

function calculateWinner(squares: Board): WinnerResult | null {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a] as Player,
        line: [...WINNING_LINES[i]]
      };
    }
  }
  return null;
}

// ============================================================================
// APP INITIALIZATION
// ============================================================================

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(<Game />);