import JobType from "../models/jobType";

const jobTypeList = [
    {
        name: 'Full-time',
        description: 'Full time job',
    },
    {
        name: 'Part-time',
        description: 'Part time job',
    },
    {
        name: 'Contract',
        description: 'Contract job',
    },
    {
        name: 'Internship',
        description: 'Internship job',
    },
    {
        name: 'Temporary',
        description: 'Temporary job',
    },
    {
        name: 'Volunteer',
        description: 'Volunteer job',
    },
    {
        name: 'Freelance',
        description: 'Freelance job',
    },
]

export const jobTypeSeeder = async () => {
    console.log("------ Seeding JobType -----");
    
    try {
        for (let index = 0; index < jobTypeList.length; index++) {
            const jobType = jobTypeList[index];
            const existingJobType = await JobType.findOne({ name: jobType.name });
            if (existingJobType) {
                console.log(`JobType with name ${jobType.name} already exists`);
                continue;
            }
            await JobType.create(jobType);
            console.log(`JobType created with name: ${jobType.name}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred while seeding jobType");
    }
}