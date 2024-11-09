import Carousel from 'react-bootstrap/Carousel';
import styles from '../../styles/components/Banner.module.css';

const Banner = () => {
    return (
        <div className={styles['carousel-container']}>
            <Carousel controls={false} >
                <Carousel.Item interval={2000} className={styles['carousel-item']}>
                    <div className={styles['text-container']}>
                        <h1 className={styles.heading}>
                            DISCOVER ENDLESS OPPORTUNITIES
                            <br />
                            JOIN OUR PLATFORM NOW!
                        </h1>
                        <p className={styles.subtitle}>
                            Explore a vast network of employers and find your ideal role today.
                        </p>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={2000} className={styles['carousel-item']}>
                    <div className={styles['text-container']}>
                        <h1 className={styles.heading}>
                            YOUR SUCCESS JOURNEY BEGINS HERE
                        </h1>
                        <p className={styles.subtitle}>
                            Get personalized recommendations and insights to boost your career.
                        </p>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;


