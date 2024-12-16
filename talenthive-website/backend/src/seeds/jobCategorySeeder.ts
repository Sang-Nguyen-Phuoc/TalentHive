import JobCategory from "../models/jobCategory";

const jobCategoryList = [
    {
        name: "Finance and Accounting",
        description: "Careers involving financial management, accounting, auditing, tax consulting, and financial analysis for organizations and individuals."
    },
    {
        name: "Software Development",
        description: "Careers in designing, developing, testing, and maintaining software applications and systems using programming languages and modern frameworks."
    },
    {
        name: "Design",
        description: "Creative roles that involve designing visual content, user interfaces, and branding materials for various industries."
    },
    {
        name: "Marketing",
        description: "Opportunities focused on creating, implementing, and managing marketing strategies to promote products, services, or brands."
    },
    {
        name: "Data Science",
        description: "Careers centered around analyzing complex datasets, building predictive models, and providing actionable insights to drive business decisions."
    },
    {
        name: "Human Resources",
        description: "Roles in managing employee relations, recruitment, training, benefits, and organizational development to foster a productive workplace."
    },
    {
        name: "Content Creation",
        description: "Careers in writing, editing, and producing engaging content for various platforms, including blogs, social media, and digital media."
    },
    {
        name: "Customer Service",
        description: "Jobs involving assisting customers with inquiries, resolving complaints, and providing excellent support to ensure satisfaction."
    },
];

export const jobCategorySeeder = async () => {
    console.log("------ Seeding Job Categories -----");
    
    try {
        for (let index = 0; index < jobCategoryList.length; index++) {
            const jobCategory = jobCategoryList[index];
            const existingJobCategory = await JobCategory.findOne({ name: jobCategory.name });
            if (existingJobCategory) {
                console.log(`JobCategory with name ${jobCategory.name} already exists`);
                continue;
            }
            await JobCategory.create(jobCategory);
            console.log(`JobCategory created with name: ${jobCategory.name}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred while seeding jobCategories");
    }
}