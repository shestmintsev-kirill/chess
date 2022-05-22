import { FC } from 'react'
import { Figure } from '../models/figures/Figure'

type LostFiguresProps = {
	title: string
	figures: Figure[]
}

export const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
	return (
		<div className="lost">
			<div className="lost_title">{title}</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{figures.map(figure => (
					<div className="lost_item" key={figure.id}>
						{figure.logo && (
							<img
								style={{ width: 40, height: 40 }}
								src={figure.logo}
								alt="lost chess"
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
