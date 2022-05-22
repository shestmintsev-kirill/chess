import { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/colors'
import { Pleer } from '../models/Pleer'

type TimerProps = {
	currentPleer: Pleer | null
	isLoss: boolean
	setIsLoss: (value: boolean) => void
	restart: () => void
}

export const Timer: FC<TimerProps> = ({ currentPleer, isLoss, restart, setIsLoss }) => {
	const [blackTime, setBlackTime] = useState(300)
	const [whiteTime, setWhiteTime] = useState(300)
	const timer = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		startTimer()
	}, [currentPleer])

	useEffect(() => {
		if (whiteTime === 0 || blackTime === 0) {
			if (timer.current) {
				clearInterval(timer.current)
			}
			setIsLoss(true)
		}
	}, [whiteTime, blackTime, currentPleer, setIsLoss])

	const handleRestart = () => {
		setBlackTime(300)
		setWhiteTime(300)
		restart()
		startTimer()
	}

	const startTimer = () => {
		if (timer.current) {
			clearInterval(timer.current)
		}
		timer.current = setInterval(() => {
			currentPleer?.color === Colors.WHITE
				? setWhiteTime(prev => prev - 1)
				: setBlackTime(prev => prev - 1)
		}, 1000)
	}

	return (
		<>
			<div className="timer__wrapper">
				<button className="btn style-btn" onClick={() => handleRestart()}>
					Restart game
				</button>
				<div>Pleer black - {blackTime}</div>
				<div>Pleer white - {whiteTime}</div>
			</div>
			{isLoss && (
				<div className="loss-wrapper">
					<div className="loss">
						<h1>Pleer {currentPleer?.color} loss</h1>
						<button className="btn style-btn" onClick={() => handleRestart()}>
							Начать новую партию
						</button>
					</div>
				</div>
			)}
		</>
	)
}
