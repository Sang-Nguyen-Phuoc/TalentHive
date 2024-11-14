import Banner from "../../components/Banner";
import Jumbotron from "../../components/Jumpotron";
import JobItem from "../../components/JobItem";
import Carousel from 'react-bootstrap/Carousel';
import styles from '../../styles/pages/Home.module.css';
import {items} from './items'
import { useEffect, useRef, useState } from "react";
import IconChevronLeft from "../../components/icons/IconChevronLeft";
import IconChevronRight from "../../components/icons/IconChevronRight";

function Home() {
    const [numJob, setnumJob] = useState(+12);
    console.log(numJob)
    const [activeIndex, setActiveIndex] = useState(0);
    const Job = JobItem.HomePage;
    const numPage = Math.ceil(items.length/numJob); 
    const carouselRef = useRef();

    const handleSelect = (selectedIndex) => {
        const activeIndex = document.getElementsByClassName(styles['current-index'])[0];
        activeIndex.innerHTML = selectedIndex+1;
        setActiveIndex(selectedIndex);
    };

    const handleResize = () => {
        if (window.innerWidth >= 1400 && numJob !== 12){   
            const pageIndex = document.getElementsByClassName(styles['page-index'])[0];
            pageIndex.innerHTML = `/ ${Math.ceil(items.length/12)}`;
            setnumJob(+12);
        } else if (window.innerWidth <= 1399 && numJob !== 8){
            const pageIndex = document.getElementsByClassName(styles['page-index'])[0];
            pageIndex.innerHTML = `/ ${Math.ceil(items.length/8)}`;
            setnumJob(+8);
        }
    }

    useEffect(() => {  
        const slide = carouselRef.current.element;
        const controls = Array.from(slide.getElementsByTagName('a'));
        slide.removeChild(slide.lastChild);
        slide.removeChild(slide.lastChild);

        controls.forEach((control)=> {
            control.classList.add(styles.control)
        })


        const currentIndex = document.createElement('span');
        currentIndex.className = styles['current-index'];
        currentIndex.textContent = activeIndex+1;

        const page = document.createElement('p');
        page.className = styles['page-index'];
        page.textContent = `/ ${numPage}`;

        const div = document.createElement('div');
        div.className = styles.slide;
        div.appendChild(controls[0])
        div.appendChild(currentIndex)
        div.appendChild(page)
        div.appendChild(controls[1])

        slide.appendChild(div)
        handleResize();
    }, [])

    useEffect(()=> {
        window.addEventListener('resize', handleResize)

        return () => {window.removeEventListener('resize', handleResize)}
    }, [])
    return (
        <>
            <Banner />
            <div className={styles.wrapper}>
                <Carousel ref={carouselRef} 
                          indicators={false} 
                          interval={null} 
                          activeIndex={activeIndex}
                          onSelect={handleSelect}
                          prevIcon={<IconChevronLeft color='#3493ff'/>} 
                          nextIcon={<IconChevronRight color='#3493ff'/>}>
                    {(() => {
                        const pages = [];
                        var start = 0;
                        for (var i=0; i<numPage; i++) {
                            const page = items.slice(start, start+numJob);
                            pages.push(
                                <Carousel.Item key={i}>
                                    <div className={styles.page}>
                                        {page.map((item, index) => {
                                            return <Job key={index} props={item}></Job>
                                        })}
                                    </div>
                                </Carousel.Item>
                            );
                            start += numJob;
                        }
                        return pages;
                    })()}
                </Carousel>
            </div>
            <Jumbotron />
        </>

    );
}

export default Home;