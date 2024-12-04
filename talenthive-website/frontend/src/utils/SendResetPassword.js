import emailjs from 'emailjs-com';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from './Constants.js';

// username, password, and email

export const sendNotification = async (templateParams) => {
    try {
        // Send email through EmailJS
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_USER_ID
        );
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
};
