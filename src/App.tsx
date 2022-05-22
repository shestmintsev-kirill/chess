import { useEffect, useState } from 'react'
import './App.css'
import { BoardComponent } from './components/BoardComponent'
import { LostFigures } from './components/LostFigures'
import { Timer } from './components/Timer'
import { Board } from './models/Board'
import { Cell } from './models/Cell'
import { Colors } from './models/colors'
import { Pleer } from './models/Pleer'

const App = () => {
	const [board, setBoard] = useState(new Board())
	const [whitePleer, setWhitePleer] = useState(new Pleer(Colors.WHITE))
	const [blackPleer, setBlackPleer] = useState(new Pleer(Colors.BLACK))
	const [isLoss, setIsLoss] = useState<boolean>(false)
	const [currentPleer, setCurrentPleer] = useState<Pleer | null>(null)
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

	useEffect(() => {
		restart()
	}, [])

	const restart = () => {
		const newBoard = new Board()
		setCurrentPleer(whitePleer)
		newBoard.initCells()
		newBoard.addFigures()
		setBoard(newBoard)
		setIsLoss(false)
		setSelectedCell(null)
	}

	const swapPleer = () => {
		setCurrentPleer(currentPleer?.color === Colors.WHITE ? blackPleer : whitePleer)
	}

	return (
		<div className="app">
			<Timer
				currentPleer={currentPleer}
				restart={restart}
				setIsLoss={setIsLoss}
				isLoss={isLoss}
			/>
			<BoardComponent
				board={board}
				currentPleer={currentPleer}
				selectedCell={selectedCell}
				setSelectedCell={setSelectedCell}
				setBoard={setBoard}
				swapPleer={swapPleer}
			/>
			<div>
				<LostFigures title={'Black figures'} figures={board.lostBlackFigures} />
				<LostFigures title={'White figures'} figures={board.lostWhiteFigures} />
			</div>
		</div>
	)
}

export default App
