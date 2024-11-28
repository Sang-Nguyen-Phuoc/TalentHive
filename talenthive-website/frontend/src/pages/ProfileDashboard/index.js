import { useLocation, useNavigate } from 'react-router';
import styles from '../../styles/pages/ProfileDashboard.module.css'
import JobItem from '../../components/JobItem'
import { useState } from 'react';

function ProfileDashboard({props, isReused, role}) {
    const Job = JobItem.Detail;
    const [statePost, setStatePost] = useState('')
    const navigate = useNavigate();
    const {state} = useLocation();

    console.log(state);
    if (!props)
        props = state;
    if (!role)
        if (state.role)
            role = state.role
        else
            role = 'Employer';

    if (role === 'Worker')
        return (
            <div className={`${styles.wrapper} ${isReused===true && styles.reused}`}>
                <div className={styles['cover-page']}>
                    <div className={styles['avatar-container']}>
                        <img src={props.image} alt="Avatar" className={styles.avatar}/>
                        <h1 className={styles.name}>{props.company}</h1>
                    </div>
                    {!isReused && <button className={styles.edit} onClick={() => navigate('/profile-dashboard/edit')}>Edit profile</button>}
                </div>
                <div className={styles.profile}>
                    <div className={styles.column}>
                        <div className={styles.frame}>
                            <div className={styles.content}>Introduction</div>
                            <p></p>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.content}>Contact</div>
                            <p></p>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.frame}>
                            <div className={styles.content}>Skills</div>
                            <p></p>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.content}>Awards</div>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    else if (role === 'Employer'){
        const items = [
            {
                state : 'Pending',
                position: 'ReactJS Developer (All level)',
                company: 'Sài Gòn Technology',
                image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png',
                salary: '2000 USD',
                sector: 'Software engineer',
                candidate: 40,
                location: 'Đà Nẵng',
                createAt: '10',
                endAt: '19'
            },
            {
                state : 'Accepted',
                position: 'Middle Frontend Engineer (ReactJS/ Typescript)',
                company: 'MONEY FORWARD VIETNAM CO.,LTD',
                image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png',
                salary: '10 - 20 triệu VND',
                sector: 'Hardware',
                candidate: 19,
                location: 'Hồ Chí Minh',
                createAt: '9',
                endAt: '21'
            },
            {
                state : 'Pending',
                position: 'Frontend Engineer (ReactJS) - NAVER FINANCIAL',
                company: 'NAVER VIETNAM',
                image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png',
                salary: '$1500',
                sector: 'Banking',
                candidate: 38,
                location: 'Hà Nội',
                createAt: '5',
                endAt: '15'
            },
            {
                state : 'Rejected',
                position: 'ReactJS Developer (All level)',
                company: 'Sài Gòn Technology',
                image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png',
                salary: '2000 USD',
                sector: 'Software engineer',
                candidate: 30,
                location: 'Đà Nẵng',
                createAt: '10',
                endAt: '19'
            },
            {
                state : 'Pending',
                position: 'Middle Frontend Engineer (ReactJS/ Typescript)',
                company: 'MONEY FORWARD VIETNAM CO.,LTD',
                image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png',
                salary: '10 - 20 triệu VND',
                sector: 'Hardware',
                candidate: 19,
                location: 'Hồ Chí Minh',
                createAt: '9',
                endAt: '21'
            },
            {
                state : 'Accepted',
                position: 'Frontend Engineer (ReactJS) - NAVER FINANCIAL',
                company: 'NAVER VIETNAM',
                image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png',
                salary: '$1500',
                sector: 'Banking',
                candidate: 38,
                location: 'Hà Nội',
                createAt: '5',
                endAt: '15'
            },
        ]

        if (props === null)
            props = items[0];
        return (
            <div className={`${styles.wrapper} ${isReused===true && styles.reused}`}>
                <div className={styles['cover-page']}>
                    <div className={styles['avatar-container']}>
                        <img src={props.image} alt="Avatar" className={styles.avatar}/>
                        <h1 className={styles.name}>{props.company}</h1>
                    </div>
                    {!isReused && <button className={styles.edit} onClick={() => navigate('/profile-dashboard/edit')}>Edit profile</button>}
                </div>
                <div className={styles.profile}>
                    <div className={styles.column}>
                        <div className={styles.frame}>
                            <div className={styles.content}>Introduction</div>
                            <p></p>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.content}>Contact</div>
                            <p></p>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={`${styles.frame} ${styles.recruitment}`}>
                            <div className={styles.content}>Recruitment {`(${statePost === '' ? items.filter(i => i.company === props.company).length : items.filter(i => i.company === props.company).filter(i => i.state === statePost).length} jobs)`}</div>
                            <div className={styles['filter-container']}>
                                <select value={statePost}
                                        onChange={(e) => setStatePost(e.target.value)}
                                        className={styles.filter}>
                                    <option value="">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className={styles['jobs-list']}>
                                {items.map((item, index) => {
                                    if (item.company === props.company) {
                                        if (statePost === '')
                                            return <Job key={index} props={item} isEmployer></Job>
                                        else 
                                            return (statePost === item.state) && <Job key={index} props={item} isEmployer></Job>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    else throw(new Error('Invalid User!'))
}

export default ProfileDashboard;