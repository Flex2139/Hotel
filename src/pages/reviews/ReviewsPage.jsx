import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
	const [reviews, setReviews] = useState([]);
	const [userReview, setUserReview] = useState(null);
	const [rating, setRating] = useState(5);
	const [text, setText] = useState('');
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		// Загрузка отзывов
		const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
		setReviews(savedReviews);

		// Загрузка текущего пользователя
		const user = JSON.parse(localStorage.getItem('currentUser'));
		setCurrentUser(user);

		// Поиск отзыва текущего пользователя
		if (user) {
			const userRev = savedReviews.find((r) => r.userId === user.id);
			setUserReview(userRev || null);

			if (userRev) {
				setRating(userRev.rating);
				setText(userRev.text);
			}
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!currentUser) {
			alert('Для добавления отзыва необходимо авторизоваться!');
			return;
		}

		const newReview = {
			id: userReview ? userReview.id : Date.now(),
			userId: currentUser.id,
			userName: currentUser.name,
			rating,
			text,
			date: new Date().toISOString().split('T')[0],
		};

		let updatedReviews;
		if (userReview) {
			updatedReviews = reviews.map((r) => (r.id === userReview.id ? newReview : r));
		} else {
			updatedReviews = [...reviews, newReview];
		}

		setReviews(updatedReviews);
		setUserReview(newReview);
		localStorage.setItem('reviews', JSON.stringify(updatedReviews));
	};

	const handleDelete = (reviewId) => {
		const review = reviews.find((r) => r.id === reviewId);

		// Проверка прав: только автор или админ может удалить
		if (currentUser && (currentUser.isAdmin || currentUser.id === review.userId)) {
			const updatedReviews = reviews.filter((r) => r.id !== reviewId);
			setReviews(updatedReviews);
			localStorage.setItem('reviews', JSON.stringify(updatedReviews));

			if (userReview && userReview.id === reviewId) {
				setUserReview(null);
				setText('');
				setRating(5);
			}
		}
	};

	return (
		<div className="reviews-page p-4">
			<h1 className="text-2xl font-bold mb-6">Отзывы об отеле</h1>

			{/* Форма добавления/редактирования отзыва */}
			{currentUser ? (
				<form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
					<h2 className="text-xl font-semibold mb-4">
						{userReview ? 'Редактировать ваш отзыв' : 'Добавить ваш отзыв'}
					</h2>
					<div className="mb-4">
						<label className="block mb-2">Оценка:</label>
						<select
							value={rating}
							onChange={(e) => setRating(Number(e.target.value))}
							className="border rounded p-2"
						>
							{[1, 2, 3, 4, 5].map((num) => (
								<option key={num} value={num}>
									{num} ★
								</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<label className="block mb-2">Текст отзыва:</label>
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							rows="4"
							required
							className="w-full border rounded p-2"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						{userReview ? 'Обновить отзыв' : 'Добавить отзыв'}
					</button>
				</form>
			) : (
				<div className="mb-6 p-4 bg-yellow-100 rounded">
					<p className="mb-2">
						Чтобы оставить отзыв, необходимо авторизоваться
					</p>
					<Link to="/login" className="text-blue-500 hover:underline">
						Войти в аккаунт
					</Link>
				</div>
			)}

			{/* Список всех отзывов */}
			<div className="reviews-list">
				<h2 className="text-xl font-semibold mb-4">Все отзывы</h2>

				{reviews.length === 0 ? (
					<p>Пока нет отзывов. Будьте первым!</p>
				) : (
					reviews.map((review) => (
						<div
							key={review.id}
							className="review-item mb-6 p-4 border rounded"
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-semibold">{review.userName}</h3>
									<div className="flex items-center mb-2">
										<span className="mr-2">Оценка:</span>
										<span className="text-yellow-500">
											{'★'.repeat(review.rating)}
											{'☆'.repeat(5 - review.rating)}
										</span>
									</div>
									<div className="text-sm text-gray-500 mb-2">
										Дата: {review.date}
									</div>
								</div>

								{/* Кнопка удаления (видна только автору или админу) */}
								{currentUser &&
									(currentUser.isAdmin ||
										currentUser.id === review.userId) && (
										<button
											onClick={() => handleDelete(review.id)}
											className="text-red-500 hover:text-red-700"
										>
											Удалить
										</button>
									)}
							</div>
							<p className="mt-2">{review.text}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ReviewsPage;
