export const EMAILJS_SERVICE_ID = 'service_x4bx9sv';
export const EMAILJS_TEMPLATE_ID = 'template_d6169qw';
export const EMAILJS_USER_ID = '5Ia-SOg2wqdAZG5gl';
export const BASE_URL = 'http://localhost:3002/api/v1';


export const ROLES = {
    EMPLOYER: "employer",
    CANDIDATE: "candidate",
    ADMIN: "admin",
    GUEST: "guest",
}

export const USER_STATUSES = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
    SUSPENDED: 'suspended',
    LOCKED: 'locked'
}

export const JOB_STATUSES = {
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING: 'pending'
}

export const LOG_ACTIONS = {
    LOGIN: "LOGIN",
    // LOGOUT: "LOGOUT",
    POST_JOB: "POST_JOB",
    UPDATE_JOB: "UPDATE_JOB",
    DELETE_JOB: "DELETE_JOB",
    CREATE_COMPANY: "CREATE_COMPANY",
    UPDATE_COMPANY: "UPDATE_COMPANY",
    // DELETE_COMPANY: "DELETE_COMPANY",
    JOIN_COMPANY: "JOIN_COMPANY",
    // LEAVE_COMPANY: "LEAVE_COMPANY",
    APPLY_JOB: "APPLY_JOB",
    ACCEPT_APPLICATION: "ACCEPT_APPLICATION",
    REJECT_APPLICATION: "REJECT_APPLICATION",
    // FOLLOW_COMPANY: "FOLLOW_COMPANY",
    // UNFOLLOW_COMPANY: "UNFOLLOW_COMPANY",
    CREATE_ADMIN: "CREATE_ADMIN",
    LOCK_USER: "LOCK_USER",
    UNLOCK_USER: "UNLOCK_USER",
    // DELETE_USER: "DELETE_USER",
};