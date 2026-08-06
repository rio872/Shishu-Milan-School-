import emailjs from '@emailjs/browser';
import { school } from '../data/schoolData';

const serviceId =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const templateId =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const publicKey =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function isEmailJsConfigured() {
  return Boolean(
    serviceId &&
      templateId &&
      publicKey &&
      !serviceId.includes('your_') &&
      !templateId.includes('your_') &&
      !publicKey.includes('your_') &&
      !publicKey.includes('@'),
  );
}

export async function sendContactEnquiry(enquiry) {
  if (!isEmailJsConfigured()) {
    throw new Error(
      'EmailJS is not configured correctly. Add the real Service ID, Template ID and Public Key to the .env file.',
    );
  }

  const templateParameters = {
    parent_name: enquiry.fullName.trim(),
    parent_email: enquiry.email.trim(),
    parent_phone: enquiry.phone.trim(),
    grade: enquiry.grade || 'Not specified',
    subject: enquiry.subject,
    message: enquiry.message.trim(),
    reply_to: enquiry.email.trim(),
    school_name: school.name,
    submitted_at:
      enquiry.submittedAt ||
      new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParameters,
      {
        publicKey,
      },
    );

    return {
      success: true,
      demoMode: false,
      data: response,
    };
  } catch (error) {
    console.error('EmailJS error:', error);

    throw new Error(
      error?.text ||
        'The enquiry could not be sent. Please try again.',
    );
  }
}