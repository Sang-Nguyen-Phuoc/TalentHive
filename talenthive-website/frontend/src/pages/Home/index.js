import { useCallback, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner from "../../components/Banner";
import Jumbotron from "../../components/Jumpotron";
import JobItem from "../../components/JobItem";
import IconChevronLeft from "../../components/icons/IconChevronLeft";
import IconChevronRight from "../../components/icons/IconChevronRight";
import styles from "../../styles/pages/Home.module.css";
import { getPublicJobList } from "../../services/jobsServices";


const CustomCarouselControls = ({ activeIndex, numPage, onPrev, onNext }) => (
    <div className={styles.controlsWrapper}>
        <button className={styles.control} onClick={onPrev}>
            <IconChevronLeft color="#3493ff" />
        </button>
        <span className={styles.indexWrapper}>
            <span className={styles["current-index"]}>{activeIndex + 1}</span>
            <span className={styles["page-index"]}>/ {numPage}</span>
        </span>
        <button className={styles.control} onClick={onNext}>
            <IconChevronRight color="#3493ff" />
        </button>
    </div>
);

function Home() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const Job = JobItem.HomePage;
    const calculateNumJob = () => (window.innerWidth >= 1400 ? 12 : 8);

    const fetchJobs = useCallback(async () => {
        try {
            const numJob = calculateNumJob();
            const data = await getPublicJobList(page, numJob);
            setJobs(data.jobs);
            setNumPage(Math.ceil(data.total_jobs / numJob));
            console.log(data);
            
        } catch (error) {
            console.error('Error:', error);
        }
    }, [page]);

    const handleResize = useCallback(() => {
        fetchJobs();
    }, [fetchJobs]);

    useEffect(() => {
        fetchJobs();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [fetchJobs, handleResize]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : numPage - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % numPage);
    };

    const numJob = calculateNumJob();

    const renderCarouselItems = () => {
        const numPage = Math.ceil(jobs.length / calculateNumJob());
        const pages = [];
        for (let i = 0; i < numPage; i++) {
            const start = i * numJob;
            const page = jobs.slice(start, start + numJob);
            pages.push(
                <Carousel.Item key={i}>
                    <div className={styles.page}>
                        {page.map((item, index) => (
                            <Job key={index} job={item} />
                        ))}
                    </div>
                </Carousel.Item>
            );
        }
        return pages;
    };

    return (
        <>
            <Banner />
            <div className={styles.wrapper}>
                <Carousel
                    indicators={false}
                    interval={null}
                    activeIndex={activeIndex}
                    onSelect={(index) => setActiveIndex(index)}
                    controls={false}
                >
                    {renderCarouselItems()}
                </Carousel>
                <CustomCarouselControls
                    activeIndex={activeIndex}
                    numPage={numPage}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            </div>
            <Jumbotron />
        </>
    );
}

export default Home;
