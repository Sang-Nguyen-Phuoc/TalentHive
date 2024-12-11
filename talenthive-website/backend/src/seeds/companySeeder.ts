import Company from "../models/company";
import EmployerProfile from "../models/employerProfile";
import User from "../models/user";

const companyList = [
    {
        name: "Tech Solutions",
        avatar: "https://robohash.org/tech?set=set4",
        locations: ["Berlin", "Munich"],
        industry: "Technology",
        address: "10 Tech Street, Berlin, Germany",
        website: "https://techsolutions.com",
        employers: ["employer2@healthcareplus.com"],
        company_manager_email: "nguyennam002004@gmail.com"
    },
    {
        name: "Creative Minds Agency",
        avatar: "https://robohash.org/creative?set=set4",
        locations: ["New York", "Los Angeles"],
        industry: "Design",
        address: "20 Design Avenue, New York, USA",
        website: "https://creativeminds.com",
        employers: ["nguyennam002004@gmail.com", "employer2@healthcareplus.com"],
        company_manager_email: "employer3@greenthumb.com"
    },
    {
        name: "MarketPros Ltd",
        avatar: "https://robohash.org/marketpros?set=set4",
        locations: ["London", "Manchester"],
        industry: "Marketing",
        address: "50 Business Road, London, UK",
        website: "https://marketpros.com",
        employers: [],
        company_manager_email: "employer2@healthcareplus.com"
    },
    {
        name: "Insight Analytics",
        avatar: "https://robohash.org/insight?set=set4",
        locations: ["San Francisco", "Seattle"],
        industry: "Data Science",
        address: "120 Analytics Lane, San Francisco, USA",
        website: "https://insightanalytics.com",
        employers: [],
        company_manager_email: "candidate3@gmail.com"
    },
    {
        name: "PeopleFirst HR",
        avatar: "https://robohash.org/peoplefirst?set=set4",
        locations: ["Toronto", "Vancouver"],
        industry: "Human Resources",
        address: "200 HR Drive, Toronto, Canada",
        website: "https://peoplefirsthr.com",
        employers: ["employer5@financemax.com"],
        company_manager_email: "employer4@foodielife.com"
    },
    {
        name: "WordWorks Media",
        avatar: "https://robohash.org/wordworks?set=set4",
        locations: ["Sydney", "Melbourne"],
        industry: "Content Creation",
        address: "300 Media Lane, Sydney, Australia",
        website: "https://wordworksmedia.com",
        employers: [],
        company_manager_email: "employer5@financemax.com"
    },
    {
        name: "CodeBase Inc.",
        avatar: "https://robohash.org/codebase?set=set4",
        locations: ["Austin", "Dallas"],
        industry: "Software Development",
        address: "500 Tech Park, Austin, USA",
        website: "https://codebaseinc.com",
        employers: [],
        company_manager_email: "employer4@foodielife.com"
    },
    {
        name: "HelpHub Solutions",
        avatar: "https://robohash.org/helphub?set=set4",
        locations: ["Chicago", "Denver"],
        industry: "Customer Service",
        address: "600 Support Lane, Chicago, USA",
        website: "https://helphubsolutions.com",
        employers: [],
        company_manager_email: "employer4@foodielife.com"
    }
];

export const companySeeder = async () => {
    console.log("------ Seeding Companies -----");
    
    try {
        for (let index = 0; index < companyList.length; index++) {
            const company = companyList[index];
            const existingCompany = await Company.findOne({ name: company.name });
            if (existingCompany) {
                console.log(`Company with name ${company.name} already exists`);
                continue;
            }
            const companyManager = await User.findOne({ email: company.company_manager_email});
            if (!companyManager) {
                console.log(`Company manager with email ${company.company_manager_email} not found`);
                continue;
            }
            const employers = []; 
            for (let i = 0; i < company.employers.length; i++) {
                const employer = await User.findOne({ email: company.employers[i] });
                if (!employer) {
                    console.log(`Employer with email ${company.employers[i]} not found`);
                    continue;
                }
                employers.push(employer._id);
            }
            const newCompany = await Company.create({
                name: company.name,
                avatar: company.avatar,
                locations: company.locations,
                industry: company.industry,
                address: company.address,
                website: company.website,
                employers: employers,
                company_manager: companyManager._id,
            });
            await EmployerProfile.findOneAndUpdate({ _id: companyManager.profile_id }, { company_role: "company_manager", company_id: newCompany._id }); 
            console.log(`Company created with name: ${company.name}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred while seeding companies");
    }
}