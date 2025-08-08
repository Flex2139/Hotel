// src/components/Footer/Footer.jsx
export default function Footer() {
	return (
		<footer className="bg-gray-100 p-6 mt-auto">
			<div className="container mx-auto text-center">
				<p>Телефон: +7 (3952) 123-456</p>
				<p>Email: info@baikal-pearl.ru</p>
				<p className="mt-2">
					© {new Date().getFullYear()} Отель "Жемчужина Байкала"
				</p>
			</div>
		</footer>
	);
}
