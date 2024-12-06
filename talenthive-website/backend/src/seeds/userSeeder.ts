import CandidateProfile from "../models/candidateProfile";
import EmployerProfile from "../models/employerProfile";
import User from "../models/user";

const userList = [
    {
        email: "admin@example.com",
        password: "Admin@12345",
        role: "admin",
    },
    {
        email: "employer1@techcorp.com",
        password: "Employer@12345",
        role: "employer",
        profile: {
            full_name: "Michael Johnson",
            avatar: "https://robohash.org/michael",
            introduction: "Founder and CEO of TechCorp.",
            address: "456 Silicon Valley, California, USA",
            phone: "+14151234567", // USA (valid phone number)
            sector: "Technology",
        }
    },
    {
        email: "employer2@healthcareplus.com",
        password: "Health@12345",
        role: "employer",
        profile: {
            full_name: "Dr. Sarah Peterson",
            avatar: "https://robohash.org/sarah",
            introduction: "Leading expert in healthcare innovation.",
            address: "789 Medical Lane, New York, USA",
            phone: "+12129876543", // USA (valid phone number)
            sector: "Healthcare",
        }
    },
    {
        email: "candidate1@gmail.com",
        password: "Writer@12345",
        role: "candidate",
        profile: {
            full_name: "Emily Roberts",
            avatar: "https://robohash.org/emily",
            introduction: "Freelance content writer and editor.",
            address: "23 Broadway, New York, USA",
            phone: "+19175556789", // USA (valid phone number)
            sector: "Writing",
        }
    },
    {
        email: "candidate2@hotmail.com",
        password: "Design@12345",
        role: "candidate",
        profile: {
            full_name: "Daniel Lee",
            avatar: "https://robohash.org/daniel",
            introduction: "Creative graphic designer with 5 years of experience.",
            address: "67 Orchard Road, Singapore",
            phone: "+6587654321", // Singapore (valid phone number)
            sector: "Design",
        }
    },
    {
        email: "employer3@greenthumb.com",
        password: "Green@12345",
        role: "employer",
        profile: {
            full_name: "Liam Thompson",
            avatar: "https://robohash.org/liam",
            introduction: "Owner of GreenThumb Landscaping Services.",
            address: "102 Elm Street, Sydney, Australia",
            phone: "+61298765432", // Australia (valid phone number)
            sector: "Agriculture",
        }
    },
    {
        email: "candidate3@gmail.com",
        password: "Tech@12345",
        role: "candidate",
        profile: {
            full_name: "Sophia Brown",
            avatar: "https://robohash.org/sophia",
            introduction: "Junior software developer passionate about AI.",
            address: "12 Maple Street, Toronto, Canada",
            phone: "+16471234567", // Canada (valid phone number)
            sector: "Technology",
        }
    },
    {
        email: "employer4@foodielife.com",
        password: "Foodie@12345",
        role: "employer",
        profile: {
            full_name: "Olivia Harris",
            avatar: "https://robohash.org/olivia",
            introduction: "Owner of FoodieLife, a chain of healthy restaurants.",
            address: "56 Queen Street, London, UK",
            phone: "+442076543210", // UK (valid phone number)
            sector: "Hospitality",
        }
    },
    {
        email: "candidate4@yahoo.com",
        password: "Chef@12345",
        role: "candidate",
        profile: {
            full_name: "James Cook",
            avatar: "https://robohash.org/james",
            introduction: "Experienced chef specializing in Italian cuisine.",
            address: "32 Pasta Lane, Rome, Italy",
            phone: "+390698765432", // Italy (valid phone number)
            sector: "Hospitality",
        }
    },
    {
        email: "candidate5@gmail.com",
        password: "Teacher@12345",
        role: "candidate",
        profile: {
            full_name: "Ava Carter",
            avatar: "https://robohash.org/ava",
            introduction: "High school teacher passionate about education.",
            address: "99 Education Avenue, Johannesburg, South Africa",
            phone: "+27112345678", // South Africa (valid phone number)
            sector: "Education",
        }
    },
    {
        email: "employer5@financemax.com",
        password: "Finance@12345",
        role: "employer",
        profile: {
            full_name: "William Edwards",
            avatar: "https://robohash.org/william",
            introduction: "Director of FinanceMax Investment Group.",
            address: "55 Wall Street, New York, USA",
            phone: "+12127654321", // USA (valid phone number)
            sector: "Finance",
        }
    },
    {
        email: "candidate6@outlook.com",
        password: "Engineer@12345",
        role: "candidate",
        profile: {
            full_name: "Ethan White",
            avatar: "https://robohash.org/ethan",
            introduction: "Mechanical engineer specializing in renewable energy.",
            address: "10 Windmill Lane, Berlin, Germany",
            phone: "+493012345678", // Germany (valid phone number)
            sector: "Engineering",
        }
    },
];



export const userSeeder = async () => {
    console.log("------ Seeding Users -----");
    
    try {
        for (let index = 0; index < userList.length; index++) {
            const user = userList[index];
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                console.log(`User with email ${user.email} already exists`);
                continue;
            }
            if (user.role === "admin") {
                const admin = await User.create({
                    email: user.email,
                    password: user.password,
                    role: user.role,
                })
                console.log("Admin created with email: ", admin.email);
                
            } else if (user.role === "employer") {
                const employer = await User.create({
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
                const employerProfile = await EmployerProfile.create({
                    user_id: employer._id,
                    full_name: user?.profile?.full_name,
                    avatar: user?.profile?.avatar,
                    introduction: user?.profile?.introduction,
                    address: user?.profile?.address,
                    email: user.email,
                    phone: user?.profile?.phone,
                    sector: user?.profile?.sector,
                })
                console.log("Employer created with email: ", employer.email);
            } else if (user.role === "candidate") {
                const candidate = await User.create({
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
                const candidateProfile = await CandidateProfile.create({
                    user_id: candidate._id,
                    full_name: user?.profile?.full_name,
                    avatar: user?.profile?.avatar,
                    introduction: user?.profile?.introduction,
                    address: user?.profile?.address,
                    email: user.email,
                    phone: user?.profile?.phone,
                    sector: user?.profile?.sector,
                })
                console.log("Candidate created with email: ", candidate.email);
            }
            
        }
        console.log("User seed completed");
    } catch (error) {
        console.error("User seed failed with error: ", error);
    }
}