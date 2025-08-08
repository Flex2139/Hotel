export default function Input({
	type = 'text',
	placeholder = '',
	value,
	onChange,
	min,
	max,
	error, // Добавляем проп для ошибки
}) {
	return (
		<div className="input-container">
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				min={min}
				max={max}
				className={error ? 'input-error' : ''} // Добавляем класс при ошибке
			/>
		</div>
	);
}
