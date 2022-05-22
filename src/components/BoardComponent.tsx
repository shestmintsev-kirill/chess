import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Pleer } from '../models/Pleer'
import { CellComponent } from './CellComponent'

type BoardProps = {
	board: Board
	currentPleer: Pleer | null
	selectedCell: Cell | null
	setSelectedCell: (cell: Cell | null) => void
	setBoard: (board: Board) => void
	swapPleer: () => void
}

const wordNumerics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const BoardComponent: FC<BoardProps> = ({
	board,
	currentPleer,
	selectedCell,
	setSelectedCell,
	setBoard,
	swapPleer
}) => {
	useEffect(() => {
		highlightCells()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCell])

	const click = (cell: Cell): void => {
		if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
			selectedCell.moveFigure(cell)
			swapPleer()
			setSelectedCell(null)
		} else {
			if (cell.figure?.color === currentPleer?.color) {
				setSelectedCell(cell)
			}
		}
	}

	const highlightCells = () => {
		board.highlightCells(selectedCell)
		updateBoard()
	}

	const updateBoard = () => {
		const newBoard = board.getCopyBoard()
		setBoard(newBoard)
	}

	return (
		<>
			<div>
				<div className="currentPleer">
					Сurrent move -
					<div
						className="currentPleerColor"
						style={{ background: currentPleer?.color }}
					/>
				</div>
				<div className="board">
					{board.cells.map((row, index) => (
						<React.Fragment key={index}>
							{row.map(cell => (
								<CellComponent
									click={click}
									cell={cell}
									key={cell.id}
									selected={
										cell.x === selectedCell?.x && cell.y === selectedCell?.y
									}
								/>
							))}
						</React.Fragment>
					))}
				</div>
				<div className="word__numeric">
					{wordNumerics.map((word, index) => (
						<div key={index} className="word__numeric_item-word">
							{word}
						</div>
					))}
				</div>
			</div>
			<div>
				{board.cells.map((row, index) => (
					<div key={index} className="word__numeric_item-number">
						{board.cells.length - index}
					</div>
				))}
			</div>
		</>
	)
}
