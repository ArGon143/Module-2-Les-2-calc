import { CalculatorMini } from './CalculatorMini.jsx';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<CalculatorMini />
			</header>
		</div>
	);
};
