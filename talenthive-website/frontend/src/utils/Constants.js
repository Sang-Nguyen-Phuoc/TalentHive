export const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID 
export const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
export const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID
export const BASE_URL = process.env.REACT_APP_API_URL

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