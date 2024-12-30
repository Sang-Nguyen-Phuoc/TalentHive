import { useNavigate } from "react-router";
import JobItem from "../../components/JobItem";
import styles from "../../styles/pages/Search.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getJobListSearching } from "../../services/jobsServices";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

function SearchPage() {
    const items = [
        {
            state: "Pending",
            position: "ReactJS Developer (All level)",
            company: "Sài Gòn Technology",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
            salary: "2000 USD",
            category: "Software engineer",
            candidate: 40,
            location: "Đà Nẵng",
            createAt: "10",
            endAt: "19",
            worktime: "fulltime",
            country: "Việt Nam",
            gender: "male",
        },
        {
            state: "Accepted",
            position: "Middle Frontend Engineer (ReactJS/ Typescript)",
            company: "MONEY FORWARD VIETNAM CO.,LTD",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
            salary: "10 - 20 triệu VND",
            category: "Hardware",
            candidate: 19,
            location: "Hồ Chí Minh",
            createAt: "9",
            endAt: "21",
            worktime: "fulltime",
            country: "Việt Nam",
            gender: "male/female",
        },
        {
            state: "Pending",
            position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
            company: "NAVER VIETNAM",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
            salary: "$1500",
            category: "Banking",
            candidate: 38,
            location: "Hà Nội",
            createAt: "5",
            endAt: "15",
            worktime: "part-time",
            country: "Việt Nam",
            gender: "male",
        },
        {
            state: "Rejected",
            position: "ReactJS Developer (All level)",
            company: "Sài Gòn Technology",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
            salary: "2000 USD",
            category: "Software engineer",
            candidate: 30,
            location: "Đà Nẵng",
            createAt: "10",
            endAt: "19",
            worktime: "part-time",
            country: "Việt Nam",
            gender: "male/female",
        },
        {
            state: "Pending",
            position: "Middle Frontend Engineer (ReactJS/ Typescript)",
            company: "MONEY FORWARD VIETNAM CO.,LTD",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
            salary: "10 - 20 triệu VND",
            category: "Hardware",
            candidate: 19,
            location: "Hồ Chí Minh",
            createAt: "9",
            endAt: "21",
            worktime: "part-time",
            country: "Việt Nam",
            gender: "male",
        },
        {
            state: "Accepted",
            position: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
            company: "NAVER VIETNAM",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
            salary: "$1500",
            category: "Banking",
            candidate: 38,
            location: "Hà Nội",
            createAt: "5",
            endAt: "15",
            worktime: "fulltime",
            country: "Việt Nam",
            gender: "male",
        },
    ];
    const navigate = useNavigate();
    const jobDetailRef = useRef();

    const [searchParams, setSearchParams] = useSearchParams();
    const [jobListData, setJobList] = useState([]);

    useEffect(() => {
        console.log(Object.fromEntries(searchParams.entries()));

        const keyword = searchParams.get("keyword") || "";
        const job_type = searchParams.get("job_type") || "";
        const job_category = searchParams.get("job_category") || "";
        const location = searchParams.get("location") || "";
        const fetchJobList = async () => {
            const data = await getJobListSearching(keyword, job_type, job_category, location);
            console.log({ jobListData: data });

            setJobList(data || []);
        };
        fetchJobList();
    }, [searchParams]);

    const displayTotalJobs = () => {
        const displayText = "";
        if (jobListData?.total_jobs === 0 || !jobListData || !jobListData?.total_jobs) {
            return "No jobs found";
        }
        if (jobListData?.total_jobs === 1) {
            return "1 job found";
        }
        return `${jobListData?.total_jobs} jobs found`;
    };

    return (
        <div className="container my-5">
            <div className="h-100">
                <div className="mb-3">
                    <span className="fw-bold fs-4 text-decoration-underline">{displayTotalJobs()}</span>
                </div>
                <div className="d-flex flex-column gap-3">
                    {jobListData?.jobs?.map((job, index) => {
                        return (
                            <MotionLink
                                key={index}
                                className="text-decoration-none text-dark"
                                to={`/jobs/${job._id}`}
                                whileHover={{ scale: 1.05, color: "#007bff" }} // Hiệu ứng khi hover
                                whileTap={{ scale: 0.95 }} // Hiệu ứng khi nhấn
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <JobItem.SearchPage job={job} />
                            </MotionLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
