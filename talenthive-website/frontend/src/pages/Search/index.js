import { useNavigate } from 'react-router'
import JobItem from '../../components/JobItem'
import styles from '../../styles/pages/Search.module.css'
import JobDetail from '../JobDetail'
import { useRef, useState } from 'react'

function Search() {
    const items = [
        {
            state : 'Pending',
            position: 'ReactJS Developer (All level)',
            company: 'Sài Gòn Technology',
            image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png',
            salary: '2000 USD',
            category: 'Software engineer',
            candidate: 40,
            location: 'Đà Nẵng',
            createAt: '10',
            endAt: '19',
            worktime: 'fulltime',
            country: 'Việt Nam',
            gender: 'male',
        },
        {
            state : 'Accepted',
            position: 'Middle Frontend Engineer (ReactJS/ Typescript)',
            company: 'MONEY FORWARD VIETNAM CO.,LTD',
            image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png',
            salary: '10 - 20 triệu VND',
            category: 'Hardware',
            candidate: 19,
            location: 'Hồ Chí Minh',
            createAt: '9',
            endAt: '21',
            worktime: 'fulltime',
            country: 'Việt Nam',
            gender: 'male/female',
        },
        {
            state : 'Pending',
            position: 'Frontend Engineer (ReactJS) - NAVER FINANCIAL',
            company: 'NAVER VIETNAM',
            image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png',
            salary: '$1500',
            category: 'Banking',
            candidate: 38,
            location: 'Hà Nội',
            createAt: '5',
            endAt: '15',
            worktime: 'part-time',
            country: 'Việt Nam',
            gender: 'male',
        },
        {
            state : 'Rejected',
            position: 'ReactJS Developer (All level)',
            company: 'Sài Gòn Technology',
            image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png',
            salary: '2000 USD',
            category: 'Software engineer',
            candidate: 30,
            location: 'Đà Nẵng',
            createAt: '10',
            endAt: '19',
            worktime: 'part-time',
            country: 'Việt Nam',
            gender: 'male/female',
        },
        {
            state : 'Pending',
            position: 'Middle Frontend Engineer (ReactJS/ Typescript)',
            company: 'MONEY FORWARD VIETNAM CO.,LTD',
            image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png',
            salary: '10 - 20 triệu VND',
            category: 'Hardware',
            candidate: 19,
            location: 'Hồ Chí Minh',
            createAt: '9',
            endAt: '21',
            worktime: 'part-time',
            country: 'Việt Nam',
            gender: 'male',
        },
        {
            state : 'Accepted',
            position: 'Frontend Engineer (ReactJS) - NAVER FINANCIAL',
            company: 'NAVER VIETNAM',
            image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png',
            salary: '$1500',
            category: 'Banking',
            candidate: 38,
            location: 'Hà Nội',
            createAt: '5',
            endAt: '15',
            worktime: 'fulltime',
            country: 'Việt Nam',
            gender: 'male',
        },
    ]
    const Job = JobItem.SearchPage;

    const navigate = useNavigate();
    const jobDetailRef = useRef();
    const [currentPost, setCurrentPost] = useState(0)

    const handleClick = (e) => {
        const index = e.currentTarget.getAttribute('order');
        setCurrentPost(parseInt(index));
        if (window.innerWidth < 1200) {
            navigate('/job-detail', {state: items[index]}); 
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles['list-column']}>
                <div className={styles['jobs-list']}>
                    {items.map((item, index) => {
                        return (
                            <div key={index} onClick={(e) => handleClick(e)} order={index}>
                                <Job props={item} selected={index===currentPost}></Job>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles['detail-column']}>
                <div ref={jobDetailRef} className={`${styles['job-detail']} ${styles.sticky}`} id='job-detail'>
                    <JobDetail props={items[currentPost]} isSearch></JobDetail>
                </div>
            </div>
        </div>
    );
}

export default Search;