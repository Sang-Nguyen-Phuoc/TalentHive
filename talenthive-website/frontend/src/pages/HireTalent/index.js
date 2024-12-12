import styles from "../../styles/pages/HireTalent.module.css";
import PostForm from "../../components/Form/PostForm";
import JobItem from "../../components/JobItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJobListAsEmployer } from "../../services/jobsServices";
import { getACompany } from "../../services/companyServices";
import { useUser } from "../../context/UserContext";

const items = [
    {
        state: "pending",
        position: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        sector: "Software engineer",
        candidate: 40,
        location: "Đà Nẵng",
        createAt: "10",
        endAt: "19",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        position: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        sector: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        createAt: "9",
        endAt: "21",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        sector: "Banking",
        candidate: 38,
        location: "Hà Nội",
        createAt: "5",
        endAt: "15",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "rejected",
        position: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        sector: "Software engineer",
        candidate: 30,
        location: "Đà Nẵng",
        createAt: "10",
        endAt: "19",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        position: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        sector: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        createAt: "9",
        endAt: "21",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        sector: "Banking",
        candidate: 38,
        location: "Hà Nội",
        createAt: "5",
        endAt: "15",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "pending",
        position: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        sector: "Software engineer",
        candidate: 40,
        location: "Đà Nẵng",
        createAt: "10",
        endAt: "19",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        position: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        sector: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        createAt: "9",
        endAt: "21",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        sector: "Banking",
        candidate: 38,
        location: "Hà Nội",
        createAt: "5",
        endAt: "15",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "rejected",
        position: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        sector: "Software engineer",
        candidate: 30,
        location: "Đà Nẵng",
        createAt: "10",
        endAt: "19",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        position: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        sector: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        createAt: "9",
        endAt: "21",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        sector: "Banking",
        candidate: 38,
        location: "Hà Nội",
        createAt: "5",
        endAt: "15",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "pending",
        position: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        sector: "Software engineer",
        candidate: 40,
        location: "Đà Nẵng",
        createAt: "10",
        endAt: "19",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        position: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        sector: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        createAt: "9",
        endAt: "21",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        sector: "Banking",
        candidate: 38,
        location: "Hà Nội",
        createAt: "5",
        endAt: "15",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "rejected",
        position: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        sector: "Software engineer",
        candidate: 30,
        location: "Đà Nẵng",
        createAt: "10",
        endAt: "19",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        position: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        sector: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        createAt: "9",
        endAt: "21",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        sector: "Banking",
        candidate: 38,
        location: "Hà Nội",
        createAt: "5",
        endAt: "15",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
];

function HireTalent({ props }) {
    const Job = JobItem.Detail;
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [state, setState] = useState("all");
    if (!props) props = items[0];
    const [jobListData, setJobListData] = useState();
    const { user} = useUser();

    const fetchJobsList = async () => {
        try {
            const data = await getJobListAsEmployer(state);
            setJobListData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch jobs list");
        }
    };

    const fetchCompany = async () => {
        try {
            const employerId = user
            console.log({employerId});
            
            // const data = await getACompany()
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch company");
        }
    }

    useEffect(() => {
        fetchJobsList();
    }, [state]);

    useEffect(() => {
        Promise.all([fetchCompany(), fetchJobsList()])
    }, [])
    return (
        <div className={styles.wrapper}>
            <PostForm show={showForm} setShow={setShowForm} />
            <div className={styles["jobs-list-container"]}>
                <button className={styles.btn} onClick={() => setShowForm(!showForm)}>
                    Create new post
                </button>
                <div className={styles.filter}>
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className={styles.quantity}>
                    <span>
                        {jobListData?.total_jobs} {jobListData?.total_jobs > 1 ? "jobs" : "job"}
                    </span>
                </div>
                <div className={styles["jobs-list"]}>
                    {jobListData?.jobs?.map((item, index) => {
                        if (state === "all" || state === item.state)
                            return <Job key={index} props={item} isEmployer={true} />;
                    })}
                </div>
            </div>
            <div className={styles["company-container"]}>
                <div className={styles.company}>
                    <div className={styles.avatar}>
                        <img src={props.image} alt="Avatar" />
                        <p className={styles.name}>{props.company}</p>
                    </div>
                    <div className={styles.information}>Introduction....</div>
                    <div
                        className={styles.link}
                        onClick={() =>
                            navigate("/profile/dashboard", {
                                state: {
                                    data: props,
                                    role: "Employer",
                                },
                            })
                        }
                    >
                        <span>
                            View more detail
                            <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HireTalent;
