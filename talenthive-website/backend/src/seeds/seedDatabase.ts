import connectToDatabase from "../database/config";
import CandidateProfile from "../models/candidateProfile";
import Company from "../models/company";
import EmployerProfile from "../models/employerProfile";
import Job from "../models/job";
import JobCategory from "../models/jobCategory";
import JobType from "../models/jobType";
import User from "../models/user";
import { companySeeder } from "./companySeeder";
import { jobCategorySeeder } from "./jobCategorySeeder";
import { jobSeeder } from "./jobSeeder";
import { jobTypeSeeder } from "./jobTypeSeeder";
import { userSeeder } from "./userSeeder";

connectToDatabase();

const seedDatabase = async () => {
    try {
        await CandidateProfile.deleteMany({});
        await EmployerProfile.deleteMany({});
        await User.deleteMany({});
        await Job.deleteMany({});
        await Company.deleteMany({});
        await JobType.deleteMany({});
        await JobCategory.deleteMany({});

        await userSeeder();
        await jobTypeSeeder();
        await jobCategorySeeder();
        await companySeeder();
        await jobSeeder();

        console.log("------ Database seeded successfully -----");
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred while seeding database");
    }
};

seedDatabase();
