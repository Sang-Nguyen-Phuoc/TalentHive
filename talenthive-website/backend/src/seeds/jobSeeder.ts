import Company from "../models/company";
import Job from "../models/job";
import JobCategory from "../models/jobCategory";
import JobType from "../models/jobType";
import User from "../models/user";

const jobList = [
    {
        title: "Software Engineer",
        company_name: "Tech Solutions",
        employer_email: "employer2@healthcareplus.com",
        salary_range: {
            min: 60000,
            max: 90000
        },
        location: "London, UK",
        description: "We are seeking a talented Software Engineer to develop and maintain high-quality software solutions.",
        skills: ["JavaScript", "React", "Node.js"],
        requirements: ["BSc in Computer Science or equivalent", "2+ years of experience in software development"],
        benefits: ["Flexible working hours", "Remote working", "Health insurance"],
        expires_at: "2024-12-31",
        job_category_name: "Software Development",
        job_type_name: "Full-time",
    },
    {
        title: "Graphic Designer",
        company_name: "Creative Minds Agency",
        employer_email: "employer1@techcorp.com",
        salary_range: {
            min: 40000,
            max: 60000
        },
        location: "New York, USA",
        description: "We are hiring a Graphic Designer to create visual content for our marketing campaigns.",
        skills: ["Adobe Photoshop", "Illustrator", "Figma"],
        requirements: ["Degree in Graphic Design", "1+ year of experience in design"],
        benefits: ["Collaborative work environment", "Annual bonuses"],
        expires_at: "2025-01-15",
        job_category_name: "Design",
        job_type_name: "Part-time",
    },
    {
        title: "Digital Marketing Specialist",
        company_name: "MarketPros Ltd",
        employer_email: "employer1@techcorp.com",
        salary_range: {
            min: 45000,
            max: 65000
        },
        location: "Toronto, Canada",
        description: "Join our team as a Digital Marketing Specialist to manage online campaigns and increase engagement.",
        skills: ["SEO", "Google Ads", "Social Media Marketing"],
        requirements: ["Experience with digital marketing tools", "Strong analytical skills"],
        benefits: ["Free training programs", "Career growth opportunities"],
        expires_at: "2025-02-28",
        job_category_name: "Marketing",
        job_type_name: "Full-time",
    },
    {
        title: "Data Scientist",
        company_name: "Insight Analytics",
        employer_email: "employer3@greenthumb.com",
        salary_range: {
            min: 80000,
            max: 120000
        },
        location: "Berlin, Germany",
        description: "Looking for a Data Scientist to analyze large datasets and build predictive models.",
        skills: ["Python", "Machine Learning", "SQL"],
        requirements: ["MSc in Data Science or equivalent", "3+ years of experience in analytics"],
        benefits: ["Competitive salary", "Work-from-home options"],
        expires_at: "2024-11-15",
        job_category_name: "Data Science",
        job_type_name: "Full-time",
    },
    {
        title: "Human Resources Manager",
        company_name: "PeopleFirst HR",
        employer_email: "employer4@foodielife.com",
        salary_range: {
            min: 50000,
            max: 75000
        },
        location: "Sydney, Australia",
        description: "We are hiring an HR Manager to lead our HR operations and recruitment strategies.",
        skills: ["HR Management", "Conflict Resolution", "Recruitment"],
        requirements: ["Degree in Human Resources", "5+ years of experience in HR"],
        benefits: ["Company-paid health insurance", "On-site gym access"],
        expires_at: "2025-03-10",
        job_category_name: "Human Resources",
        job_type_name: "Full-time",
    },
    {
        title: "Content Writer",
        company_name: "WordWorks Media",
        employer_email: "employer5@financemax.com",
        salary_range: {
            min: 35000,
            max: 50000
        },
        location: "Lagos, Nigeria",
        description: "Join our team as a Content Writer to produce engaging and high-quality articles.",
        skills: ["Creative Writing", "SEO", "Research"],
        requirements: ["Excellent writing skills", "Bachelor's degree in Journalism or related field"],
        benefits: ["Flexible schedule", "Frequent writing workshops"],
        expires_at: "2025-04-01",
        job_category_name: "Content Creation",
        job_type_name: "Part-time",
    },
    {
        title: "Full-Stack Developer",
        company_name: "CodeBase Inc.",
        employer_email: "employer5@financemax.com",
        salary_range: {
            min: 70000,
            max: 100000
        },
        location: "Mumbai, India",
        description: "We are seeking a Full-Stack Developer to build and maintain scalable web applications.",
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        requirements: ["Experience in web development", "Knowledge of modern frameworks"],
        benefits: ["Stock options", "Flexible working environment"],
        expires_at: "2025-05-20",
        job_category_name: "Software Development",
        job_type_name: "Full-time",
    },
    {
        title: "Customer Support Specialist",
        company_name: "HelpHub Solutions",
        employer_email: "employer5@financemax.com",
        salary_range: {
            min: 30000,
            max: 40000
        },
        location: "Cape Town, South Africa",
        description: "We are looking for a Customer Support Specialist to assist our clients with inquiries and issues.",
        skills: ["Communication", "Problem Solving", "CRM Tools"],
        requirements: ["Customer service experience", "Good interpersonal skills"],
        benefits: ["Monthly bonuses", "Team-building activities"],
        expires_at: "2025-06-30",
        job_category_name: "Customer Service",
        job_type_name: "Full-time",
    },
];


export const jobSeeder = async () => {
    try {
        console.log("------ Seeding Jobs -----");
                
        for (let index = 0; index < jobList.length; index++) {
            const job = jobList[index];
            const existingJob = await Job.findOne({ title: job.title});
            if (existingJob) {
                console.log(`Job with title ${job.title} already exists`);
                continue;
            }
            const company = await Company.findOne({name: job.company_name});
            if (!company) {
                console.log(`Company with name ${job.company_name} not found`);
                continue;
            }
            const employer = await User.findOne({email: job.employer_email});
            if (!employer) {
                console.log(`Employer with email ${job.employer_email} not found`);
                continue;
            }
            const jobCategory = await JobCategory.findOne({name: job.job_category_name});
            if (!jobCategory) {
                console.log(`JobCategory with name ${job.job_category_name} not found`);
                continue;
            }
            const jobType = await JobType.findOne({name: job.job_type_name});
            if (!jobType) {
                console.log(`JobType with name ${job.job_type_name} not found`);
                continue;
            }
            await Job.create({
                title: job.title,
                company_id: company._id,
                employer_id: employer._id,
                salary_range: job.salary_range,
                location: job.location,
                description: job.description,
                skills: job.skills,
                requirements: job.requirements,
                benefits: job.benefits,
                job_category: jobCategory._id,
                job_type: jobType._id,
            })     
            console.log(`Job created with title: ${job.title}`);   
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred while seeding jobs");
    }
}