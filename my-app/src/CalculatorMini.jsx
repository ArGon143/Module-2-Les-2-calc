import { useState } from 'react';
import styles from './CalculatorMini.module.css';

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

export const CalculatorMini = () => {
	const [inputDisplay, setInputDisplay] = useState('0');
	const [result, setResult] = useState('');
	const [isResult, setIsResult] = useState(false);

	function evaluateExpression(expression) {
		const numberRegex = /\d+(\.\d+)?/g;
		const operatorRegex = /[+-]/g;
		const numbers = expression.match(numberRegex).map(parseFloat);
		const operators = expression.match(operatorRegex);
		let resultEvaluate = numbers[0];

		if (operators && numbers) {
			if (expression[0] === '-') {
				resultEvaluate = resultEvaluate * -1;
				for (let i = 0; i < operators.length - 1; i++) {
					const operator = operators[i + 1];
					const number = numbers[i + 1];
					switch (operator) {
						case '+':
							resultEvaluate += number;
							break;
						case '-':
							resultEvaluate -= number;
							break;
						default:
							break;
					}
				}
			} else {
				for (let i = 0; i < operators.length; i++) {
					const operator = operators[i];
					const number = numbers[i + 1];
					switch (operator) {
						case '+':
							resultEvaluate += number;
							break;
						case '-':
							resultEvaluate -= number;
							break;
						default:
							break;
					}
				}
			}
		}
		return resultEvaluate;
	}

	const NumbersBtn = (props) => {
		const nameBtn = numbers.map((numberName) => {
			return (
				<button
					className={styles.button}
					key={numberName}
					onClick={(event) => {
						setResult('');
						setIsResult(false);
						if (props.data !== '0') {
							props.onClick(props.data + event.target.textContent);
						} else {
							props.onClick(event.target.textContent);
						}
					}}
				>
					{numberName}
				</button>
			);
		});
		return <div>{nameBtn}</div>;
	};

	const EqualBtn = (props) => {
		function checkInput() {
			const expressions = /[+-]/g;
			let lastNumber = props.data?.slice(-1);

			if (!expressions.test(lastNumber)) {
				if (props.data !== '0' && !result) {
					props.onClick(setResult(evaluateExpression(inputDisplay)));
					setInputDisplay('');
					setIsResult(true);
				}
			}
		}
		return (
			<button
				className={`${styles.button} ${styles.bigBtn} ${styles.equBtn}`}
				key="equ"
				onClick={() => {
					checkInput();
				}}
			>
				{props.operator}
			</button>
		);
	};

	const CleanBtn = (props) => {
		return (
			<button
				className={`${styles.button} ${styles.bigBtn}`}
				key="clean"
				onClick={() => {
					setInputDisplay('0');
					setResult('');
					setIsResult(false);
				}}
			>
				{props.operator}
			</button>
		);
	};

	const AdditionBtn = (props) => {
		function checkInput() {
			const expressions = /[+-]/g;
			let lastNumber = props.data?.slice(-1);

			if (!expressions.test(lastNumber)) {
				if (props.data !== '0') {
					props.onClick(props.data + props.operator);
				} else {
					setInputDisplay('0');
					setIsResult(false);
				}
				if (props.data !== '') {
					props.onClick(props.data + props.operator);
				} else {
					setInputDisplay(result + props.operator);
					setIsResult(false);
				}
			}
		}
		return (
			<button
				className={`${styles.button} ${styles.bigBtn}`}
				key="add"
				onClick={() => {
					setResult('');
					checkInput();
				}}
			>
				{props.operator}
			</button>
		);
	};

	const SubtractionBtn = (props) => {
		function checkInput() {
			const expressions = /[+-]/g;
			let lastNumber = props.data?.slice(-1);
			if (!expressions.test(lastNumber)) {
				if (props.data !== '0') {
					props.onClick(props.data + props.operator);
				} else {
					setInputDisplay('0');
					setIsResult(false);
				}
				if (props.data !== '') {
					props.onClick(props.data + props.operator);
				} else {
					setInputDisplay(result + props.operator);
					setIsResult(false);
				}
			}
		}
		return (
			<button
				className={`${styles.button} ${styles.bigBtn}`}
				key="sub"
				onClick={() => {
					setResult('');
					checkInput();
				}}
			>
				{props.operator}
			</button>
		);
	};

	return (
		<>
			<div className={styles.wrapper}>
				<div
					className={isResult ? styles.equDisplay : styles.display}
				>{`${inputDisplay}${result}`}</div>
				<div className={styles.wrapperButtons}>
					<NumbersBtn data={inputDisplay} onClick={setInputDisplay} />
					<div className={styles.wrapperOperators}>
						<CleanBtn
							data={inputDisplay}
							operator={'C'}
							onClick={setInputDisplay}
						/>
						<AdditionBtn
							data={inputDisplay}
							operator={'+'}
							onClick={setInputDisplay}
						/>
						<SubtractionBtn
							data={inputDisplay}
							operator={'-'}
							onClick={setInputDisplay}
						/>
						<EqualBtn
							data={inputDisplay}
							operator={'='}
							onClick={setInputDisplay}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
