import styles from "../../styles/pages/ProfileDashboard.module.css";
import JobItem from "../../components/JobItem";
import EditFormCandidate from "../../components/Form/EditProfile/Candidate";
import EditFormEmployer from "../../components/Form/EditProfile/Employer";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useContext, useState } from "react";
import Avatar from "../../images/account-logo.png";
import { getUserById } from "../../services/userServices";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { ROLES } from "../../utils/Constants";

export const profileDashboardLoader = async ({ params }) => {
    const { id } = params;
    let userData;

    try {
        userData = await getUserById(id);
    } catch (error) {
        console.error("Error while getting user by id", error?.message || error);
        toast.error("Error while getting user by id");
    }

    return { userData };
};

function ProfileDashboard({ isReused }) {
    const { userData } = useLoaderData();
    const { user } = useUser();
    const userById = userData?.user;
    const isOwner = user?._id === userById?._id;

    console.log({ userData });

    const Job = JobItem.Detail;
    const [statePost, setStatePost] = useState("");
    const [show, setShow] = useState(false);
    const currentUser = {
        role: "employer",
        profile: {
            username: "Chos Lowij",
            image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",

            company: "Chos Lowij",
        },
    };

    const { profile } = currentUser;

    if (userById?.role === ROLES.CANDIDATE)
        return (
            <div className="container py-4">
                <EditFormCandidate show={show} setShow={setShow} />
                <div className="shadow rounded border border-1 border-secondary p-2 d-flex">
                    <img
                        src={profile.image || Avatar}
                        alt="Avatar"
                        className="img-fluid"
                        style={{ aspectRatio: 1, width: 200, objectFit: "cover" }}
                    />
                    <div className="flex-fill position-relative">
                        <h1 className="">{profile.username || "None"}</h1>
                        {isOwner && (
                            <button
                                className="position-absolute btn btn-primary"
                                style={{ bottom: 0, right: 0, boxSizing: "content-box" }}
                                onClick={() => setShow(!show)}
                            >
                                Edit profile
                            </button>
                        )}
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 col-md-8">
                        <div className="card overflow-hidden mb-4">
                            <h2
                                className="text-white fs-5 p-2 m-0 fw-bold"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                                }}
                            >
                                Introduction
                            </h2>
                            <p className="p-2">
                                Trang chủ Hiển thị 3-4 bài viết nổi bật nhất trong tuần qua Hiển thị 10 bài viết được
                                xem nhiều nhất (mọi chuyên mục) Hiển thị 10 bài viết mới nhất (mọi chuyên mục) Hiển thị
                                top 10 chuyên mục, mỗi chuyên mục 1 bài mới nhất Lưu ý: Bài viết hiển thị trên trang chủ
                                gồm các thông tin Tiêu đề Chuyên mục Ngày đăng Ảnh đại diện bài viết
                            </p>
                        </div>
                        <div className="card overflow-hidden mb-4">
                            <h2
                                className="text-white fs-5 p-2 fw-bold m-0"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                                }}
                            >
                                Skills
                            </h2>
                            <p className="p-2">
                                Trang chủ Hiển thị 3-4 bài viết nổi bật nhất trong tuần qua Hiển thị 10 bài viết được
                                xem nhiều nhất (mọi chuyên mục) Hiển thị 10 bài viết mới nhất (mọi chuyên mục) Hiển thị
                                top 10 chuyên mục, mỗi chuyên mục 1 bài mới nhất Lưu ý: Bài viết hiển thị trên trang chủ
                                gồm các thông tin Tiêu đề Chuyên mục Ngày đăng Ảnh đại diện bài viết
                            </p>
                        </div>
                        <div className="card overflow-hidden mb-4">
                            <h2
                                className="text-white fs-5 p-2 fw-bold m-0"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                                }}
                            >
                                Work experience
                            </h2>
                            <p className="p-2">
                                Trang chủ Hiển thị 3-4 bài viết nổi bật nhất trong tuần qua Hiển thị 10 bài viết được
                                xem nhiều nhất (mọi chuyên mục) Hiển thị 10 bài viết mới nhất (mọi chuyên mục) Hiển thị
                                top 10 chuyên mục, mỗi chuyên mục 1 bài mới nhất Lưu ý: Bài viết hiển thị trên trang chủ
                                gồm các thông tin Tiêu đề Chuyên mục Ngày đăng Ảnh đại diện bài viết
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card overflow-hidden mb-4">
                            <h2
                                className="text-white fs-5 p-2 fw-bold m-0"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                                }}
                            >
                                Awards
                            </h2>
                            <p className="p-2">
                                Trang chủ Hiển thị 3-4 bài viết nổi bật nhất trong tuần qua Hiển thị 10 bài viết được
                                xem nhiều nhất (mọi chuyên mục) Hiển thị 10 bài viết mới nhất (mọi chuyên mục) Hiển thị
                                top 10 chuyên mục, mỗi chuyên mục 1 bài mới nhất Lưu ý: Bài viết hiển thị trên trang chủ
                                gồm các thông tin Tiêu đề Chuyên mục Ngày đăng Ảnh đại diện bài viết
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    else if (userById?.role === ROLES.EMPLOYER) {
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
            },
        ];

        return (
            <div className="container py-4">
                <EditFormEmployer show={show} setShow={setShow} />
                <div className="shadow rounded border border-1 border-secondary p-2 d-flex">
                    <img
                        src={profile.image || Avatar}
                        alt="Avatar"
                        className="img-fluid"
                        style={{ aspectRatio: 1, width: 200, objectFit: "cover" }}
                    />
                    <div className="flex-fill position-relative">
                        <h1 className="">{profile.username || "None"}</h1>
                        {isOwner && (
                            <button
                                className="position-absolute btn btn-primary"
                                style={{ bottom: 0, right: 0, boxSizing: "content-box" }}
                                onClick={() => setShow(!show)}
                            >
                                Edit profile
                            </button>
                        )}
                    </div>
                </div>                <div className={styles.profile}>
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
                            <div className={styles.content}>
                                Recruitment{" "}
                                {`(${
                                    statePost === "" ? items.length : items.filter((i) => i.state === statePost).length
                                } jobs)`}
                            </div>
                            <div className={styles["filter-container"]}>
                                <select
                                    value={statePost}
                                    onChange={(e) => setStatePost(e.target.value)}
                                    className={styles.filter}
                                >
                                    <option value="">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className={styles["jobs-list"]}>
                                {items.map((item, index) => {
                                    if (statePost === "") return <Job key={index} props={item} isEmployer></Job>;
                                    else
                                        return (
                                            statePost === item.state && <Job key={index} props={item} isEmployer></Job>
                                        );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDashboard;
