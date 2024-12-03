import { useLocation, useNavigate } from 'react-router';
import JobItem from '../../components/JobItem'
import styles from '../../styles/pages/JobDetail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import ApplicationForm from '../../components/Form/ApplicationForn';

function JobDetail({ props, isSearch }) {
    // const items = [
    //     {
    //         state : 'Pending',
    //         position: 'ReactJS Developer (All level)',
    //         company: 'Sài Gòn Technology',
    //         image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png',
    //         salary: '2000 USD',
    //         sector: 'Software engineer',
    //         candidate: 40,
    //         location: 'Đà Nẵng',
    //         createAt: '10',
    //         endAt: '19',
    //         worktime: 'fulltime',
    //         country: 'Việt Nam',
    //         gender: 'male',
    //     },
    //     {
    //         state : 'Accepted',
    //         position: 'Middle Frontend Engineer (ReactJS/ Typescript)',
    //         company: 'MONEY FORWARD VIETNAM CO.,LTD',
    //         image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png',
    //         salary: '10 - 20 triệu VND',
    //         sector: 'Hardware',
    //         candidate: 19,
    //         location: 'Hồ Chí Minh',
    //         createAt: '9',
    //         endAt: '21',
    //         worktime: 'fulltime',
    //         country: 'Việt Nam',
    //         gender: 'male/female',
    //     },
    //     {
    //         state : 'Pending',
    //         position: 'Frontend Engineer (ReactJS) - NAVER FINANCIAL',
    //         company: 'NAVER VIETNAM',
    //         image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png',
    //         salary: '$1500',
    //         sector: 'Banking',
    //         candidate: 38,
    //         location: 'Hà Nội',
    //         createAt: '5',
    //         endAt: '15',
    //         worktime: 'part-time',
    //         country: 'Việt Nam',
    //         gender: 'male',
    //     },
    //     {
    //         state : 'Rejected',
    //         position: 'ReactJS Developer (All level)',
    //         company: 'Sài Gòn Technology',
    //         image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png',
    //         salary: '2000 USD',
    //         sector: 'Software engineer',
    //         candidate: 30,
    //         location: 'Đà Nẵng',
    //         createAt: '10',
    //         endAt: '19',
    //         worktime: 'part-time',
    //         country: 'Việt Nam',
    //         gender: 'male/female',
    //     },
    //     {
    //         state : 'Pending',
    //         position: 'Middle Frontend Engineer (ReactJS/ Typescript)',
    //         company: 'MONEY FORWARD VIETNAM CO.,LTD',
    //         image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png',
    //         salary: '10 - 20 triệu VND',
    //         sector: 'Hardware',
    //         candidate: 19,
    //         location: 'Hồ Chí Minh',
    //         createAt: '9',
    //         endAt: '21',
    //         worktime: 'part-time',
    //         country: 'Việt Nam',
    //         gender: 'male',
    //     },
    //     {
    //         state : 'Accepted',
    //         position: 'Frontend Engineer (ReactJS) - NAVER FINANCIAL',
    //         company: 'NAVER VIETNAM',
    //         image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png',
    //         salary: '$1500',
    //         sector: 'Banking',
    //         candidate: 38,
    //         location: 'Hà Nội',
    //         createAt: '5',
    //         endAt: '15',
    //         worktime: 'fulltime',
    //         country: 'Việt Nam',
    //         gender: 'male',
    //     },
    // ]
    const Job = JobItem.Detail;

    const navigate = useNavigate();

    const role = 'Worker';

    const handleUpdate = (e) => {
        alert('Modal Update post')
    }

    const handleRemove = (e) => {
        alert('Do you want to delete this post?')
    }

    const location = useLocation();
    const currentPost = location.state;
    if (props === undefined)
        props = currentPost;
    return (
        <div className={`${styles.wrapper} ${isSearch && styles['is-search']}`}>
            <div className={styles['job-description']}>
                <Job props={props} isEmployer={role === 'Employer'} ApplicationForm={ApplicationForm}></Job>
                <div className={styles.detail}>
                    <p className={styles.title}>Recruitment Detail</p>
                    <div className={styles['sub-title']}>Job Descriptions</div>
                    <div className={styles['sub-title']}>Skills and Experience</div>
                    <div className={styles['sub-title']}>Benefit</div>
                    {role === 'Employer' && <div className={styles['btn-container']}>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleRemove} className={styles['remove-btn']}>Remove</button>
                    </div>}
                </div>
            </div>
            <div className={styles['general-description']}>
                <div className={styles.company}>
                    <div className={styles.avatar}>
                        <img src={props.image} alt="Avatar" />
                        <p className={styles.name}>{props.company}</p>
                    </div>
                    <div className={styles.information}>
                        Introduction....

                    </div>
                    <div className={styles.link} onClick={() => navigate('/profile/dashboard', { state: {
                        data: props,
                        role: 'Employer'
                    } })}>
                        <span>
                            View company
                            <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        </span>
                    </div>
                    <div></div>
                </div>
                {/* <div className={styles.general}>
                    <p className={styles.title}>General</p>
                </div> */}
            </div>
        </div>
    );
}

export default JobDetail;