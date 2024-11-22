import { useNavigate } from 'react-router';
import { useState } from 'react';
import ProfileDashboard from '../ProfileDashboard';
import styles from '../../styles/pages/ManageEmployers.module.css'
import {items} from '../Home/items'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

const items_filter = {
    '': items,
    'active': items.filter(item => item.state === 'active'),
    'locked': items.filter(item => item.state === 'locked'),
}

function ManageEmployers() {
    const navigate = useNavigate();
    const [state, setState] = useState('');
    const [selected, setSelected] = useState(0);

    const handleChangeFilter = (e) => {
        setState(e.target.value)
        setSelected(0);
    }

    const handleClick = (e) => {
        const index = e.currentTarget.getAttribute('index');
        if (window.innerWidth >= 1420) {
            setSelected(parseInt(index));
        } else {
            navigate('/profile-dashboard', {state: {
                item: items_filter[state][index],
                role: 'Employer'
            }})
        }

    }
    return (  
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.quantity}>
                    <span>{`${items_filter[state].length}`}</span>
                    users
                    </p>
                <select className={styles.filter} value={state} onChange={handleChangeFilter}>
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                </select>
            </div>
            <div className={styles['employers-container']}>
                <div className={styles['employers-list']}>
                    {items_filter[state].map((item, index) => {
                        return (
                            <div key={index} index={index} className={`${index===selected && styles.selected} ${styles.employer}`} onClick={handleClick}>
                                <div className={styles.avatar}>
                                    <img src={item.image} alt="Avatar"/>
                                    <p className={styles.name}>{item.company}</p>
                                </div>
                                <button className={styles[item.state]} onClick={() => alert('Do you want to make change?')}>
                                    {item.state === 'active' ? 'Lock' : 'Unlock'}
                                    <FontAwesomeIcon icon={item.state === 'active' ? faLock : faUnlock} className={styles.icon}/>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className={styles['employer-detail']}>
                    <div>
                        <ProfileDashboard props={items_filter[state][selected]} isReused={true} role={'Employer'}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ManageEmployers;