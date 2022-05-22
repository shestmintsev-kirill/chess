import { FC } from 'react'
import { Cell } from '../models/Cell'

type CellProps = {
	cell: Cell
	selected: boolean
	click: (cell: Cell) => void
}

export const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
	return (
		<div
			className={`cell ${cell.color} ${selected ? 'selected' : ''}`}
			onClick={() => click(cell)}
			style={{ background: cell.available && cell.figure ? 'brown' : '' }}

		>
			{cell.available && !cell.figure && <div className="available" />}
			{cell.figure?.logo && <img src={cell.figure.logo} alt="chess" />}
		</div>
	)
}
