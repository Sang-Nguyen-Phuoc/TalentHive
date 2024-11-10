import { useNavigate } from 'react-router';
import styleSearch from '../../styles/components/JobItemSearch.module.css'
import styleHome from '../../styles/components/JobItemHome.module.css'
import styleDetail from '../../styles/components/JobItemDetail.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faFilter, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const JobItem = {
    ////// HOME PAGE //////
    HomePage: ({props, state}) => {
        const navigate = useNavigate()
        return ( 
            <div className={state ? `${styleHome.wrapper} ${styleHome['jobs-applied']}` : styleHome.wrapper} onClick={() => navigate('/job-detail')}>
                <div className={styleHome.header}>
                    <div className={styleHome['left-header']}>
                        <img src={props.image} alt='logo'></img>
                    </div>
                    <div className={styleHome['right-header']}>
                        <p className={styleHome.position}>{props.position}</p>
                        <p className={styleHome['company-name']}>{props.company}</p>
                    </div>
                    {state &&  <p className={`${styleHome[state]} ${styleHome.toggle}`}>{state}</p>}
                </div>
                <div className={styleHome.description}>
                    <div className={styleHome.salary}>
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleHome.icon}/>
                        <p>{props.salary}</p>
                    </div>
                    <div className={styleHome.location}>
                        <FontAwesomeIcon icon={faLocationDot} className={styleHome.icon}/>
                        <p>{props.location}</p>
                    </div>
                    <div className={styleHome.sector}>
                        <FontAwesomeIcon icon={faFilter} className={styleHome.icon}/>
                        <p>{props.sector}</p>
                    </div>
                </div>
                <div className={styleHome.timeline}>
                        <p>Post {props.createAt} hours ago</p>
                        <p>{props.endAt} days left</p>
                </div>
            </div>
        );
    },

    ////// SEARCH PAGE //////
    SearchPage: ({props, state}) => {
        const navigate = useNavigate()
        return ( 
            <div className={styleSearch.wrapper} onClick={() => navigate('/job-detail')}>
                <div className={styleSearch.header}>
                    <p className={styleSearch.position}>{props.position}</p>
                    {state && <p className={styleSearch[state]}>{state}</p>}
                </div>
                <div className={styleSearch['company-container']}>
                    <img className={styleSearch['company-img']} src={props.image} alt='logo'></img>
                    <p className={styleSearch['company-name']}>{props.company}</p>
                </div>
                <div className={styleSearch['salary-container']}>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleSearch.icon}/>
                    <p>{props.salary}</p>
                </div>
                <div className={styleSearch.description}>
                    <div className={styleSearch.location}>
                        <FontAwesomeIcon icon={faLocationDot} className={styleSearch.icon}/>
                        <p>{props.location}</p>
                    </div>
                    <div className={styleSearch.sector}>
                        <FontAwesomeIcon icon={faFilter} className={styleSearch.icon}/>
                        <p>{props.sector}</p>
                    </div>
                </div>
                <div className={styleSearch.timeline}>
                    <p className={styleSearch.createAt}>Post {props.createAt} hours ago</p>
                    <p>{props.endAt} days left</p>
                </div>
            </div>
        );
    },

    ////// HIRE TALENT PAGE //////
    Detail: ({props, isEmployer}) => {
        const navigate = useNavigate()
        return ( 
            <div className={styleDetail.wrapper} onClick={() => navigate('/job-detail')}>
                <div className={styleDetail.header}>
                    <p className={styleDetail.position}>{props.position}</p>
                    {isEmployer && <p className={styleDetail[props.state]}>{props.state}</p>}
                </div>
                
                <div className={styleDetail.description}>
                    <div className={styleDetail.salary}>
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleDetail.icon}/>
                        <p>{props.salary}</p>
                    </div>
                    <div className={styleDetail.location}>
                        <FontAwesomeIcon icon={faLocationDot} className={styleDetail.icon}/>
                        <p>{props.location}</p>
                    </div>
                    <div className={styleDetail.sector}>
                        <FontAwesomeIcon icon={faFilter} className={styleDetail.icon}/>
                        <p>{props.sector}</p>
                    </div>
                </div>
                <div className={styleDetail.timeline}>
                    <p className={styleDetail.createAt}>Post {props.createAt} hours ago</p>
                    <p>{props.endAt} days left</p>
                </div>
                <div className={styleDetail.footer}>
                    {isEmployer && props.state==='Accepted' && <p className={styleDetail.candidate}>{`Candidate list (${props.candidate})`}</p>}
                </div>
                {isEmployer || <button className={styleDetail.apply}>Apply now</button>}
            </div>
        );
    },
}

 
export default JobItem;