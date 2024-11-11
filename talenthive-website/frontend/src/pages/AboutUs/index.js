import Intro from "../../components/Intro";
import An from "../../images/An.png";
import Thanh from "../../images/Thanh.png";
import Loi from "../../images/Loi.png";
import Services from "../../components/Services";
import Works from "../../components/Works";
import Experience from "../../components/Experience";
// import Luong from "../../images/Luong.png";


function AboutUs() {
    const data = [
        // {
        //     index: 0,
        //     name: "Nguyen Phuoc Sang",
        //     mainRole: "Project Manager",
        //     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi repellendus, error quasi animi adipisci labore asperiores, recusandae architecto quae dolorum eius repudiandae. Ex quam ea soluta labore! Aspernatur, in praesentium!",
        //     img: "../../images/An.png",
        //    fb: "https://www.facebook.com/sang.nguuyen.56",
        //   github: "https://github.com/Sang-Nguyen-Phuoc"
        // },
        {
            index: 1,
            name: "Nguyen Ba An",
            mainRole: "Backend Leader",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi repellendus, error quasi animi adipisci labore asperiores, recusandae architecto quae dolorum eius repudiandae. Ex quam ea soluta labore! Aspernatur, in praesentium!",
            img: An,
            fb: "https://www.facebook.com/profile.php?id=100027486292554",
            github: "https://github.com/nban22"
        },
        {
            index: 2,
            name: "Nguyen Xuan Thanh",
            mainRole: "Project Manager",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi repellendus, error quasi animi adipisci labore asperiores, recusandae architecto quae dolorum eius repudiandae. Ex quam ea soluta labore! Aspernatur, in praesentium!",
            img: Thanh,
            fb: "https://www.facebook.com/profile.php?id=100038233366978",
            github: "https://github.com/nxt964"
        },

        {
            index: 3,
            name: "Nguyen Phuc Loi",
            mainRole: "Project Manager",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi repellendus, error quasi animi adipisci labore asperiores, recusandae architecto quae dolorum eius repudiandae. Ex quam ea soluta labore! Aspernatur, in praesentium!",
            img: Loi,
            fb: "https://www.facebook.com/profile.php?id=100040830702269",
            github: "https://github.com/LoiNguyennn"
        },
        {
            index: 4,
            name: "Truong Nguyen Hien Luong",
            mainRole: "Project Manager",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi repellendus, error quasi animi adipisci labore asperiores, recusandae architecto quae dolorum eius repudiandae. Ex quam ea soluta labore! Aspernatur, in praesentium!",
            img: "../../images/Luong.png",
            fb: "https://www.facebook.com/hienluong.truongnguyen.38",
            github: "https://github.com/gnoulh"
        },
    ];

    return (
        <div>
            <h1 style={{
                marginTop: "46px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "50px",
            }}>WHAT WE HAVE</h1>
            <Works />
            <Experience />
            <Services />
            <h1 style={{
                marginTop: "18rem",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "50px",
            }}>WHO WE ARE</h1>
            {/* Map over the data array and render the Intro component for each item */}
            {data.map((item, index) => (
                <Intro
                    index={item.index}
                    key={index}
                    name={item.name}
                    mainRole={item.mainRole}
                    description={item.description}
                    img={item.img}
                    fb={item.fb}
                    github={item.github}
                    ig={item.ig}
                />
            ))}

        </div>
    );
}

export default AboutUs;
