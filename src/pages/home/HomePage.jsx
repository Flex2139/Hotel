import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';

export default function HomePage() {
	return (
		<div className="home-page">
			{/* Баннер с приветствием */}
			<section className="hero-banner">
				<div className="banner-content">
					<h1>Добро пожаловать в "Жемчужину Байкала"</h1>
					<p>Откройте для себя магию самого глубокого озера на планете</p>
					<Link to="/rooms">
						<Button size="large">Забронировать номер</Button>
					</Link>
				</div>
			</section>

			{/* Преимущества отеля */}
			<section className="features-section">
				<h2>Почему выбирают нас</h2>
				<div className="features-grid">
					<div className="feature-card">
						<h3>Уникальное расположение</h3>
						<p>Прямо на берегу Байкала с панорамным видом на озеро</p>
					</div>
					<div className="feature-card">
						<h3>Комфортные номера</h3>
						<p>Просторные номера с современным дизайном и удобствами</p>
					</div>
					<div className="feature-card">
						<h3>Экологичность</h3>
						<p>Используем только экологичные материалы и практики</p>
					</div>
				</div>
			</section>

			{/* О Байкале */}
			<section className="about-section">
				<div className="about-content">
					<h2>Озеро Байкал - жемчужина Сибири</h2>
					<p>
						Байкал - самое глубокое и древнее озеро на планете, содержащее 20%
						мировых запасов пресной воды. Окруженное величественными горами и
						тайгой, оно поражает своей красотой в любое время года.
					</p>
					<p>
						Наш отель расположен в живописном месте на берегу Байкала,
						предлагая уникальную возможность насладиться этим чудом природы с
						максимальным комфортом.
					</p>
				</div>
			</section>

			{/* Призыв к действию */}
			<section className="cta-section">
				<h2>Готовы к незабываемому отдыху?</h2>
				<Link to="/rooms">
					<Button>Выбрать номер</Button>
				</Link>
			</section>
		</div>
	);
}
