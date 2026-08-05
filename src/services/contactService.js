import emailjs from '@emailjs/browser';
import { school } from '../data/schoolData';

const serviceId =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const templateId =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const publicKey =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function emailJsIsConfigured() {
  return (
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes('your_id') &&
    !templateId.includes('your_id') &&
    !publicKey.includes('your_public_key')
  );
}

export async function sendContactEnquiry(enquiry) {
  if (!emailJsIsConfigured()) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    return {
      success: true,
      demoMode: true,
      enquiry,
    };
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
      new Date().toISOString(),
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
    console.error(
      'EmailJS contact form error:',
      error,
    );

    throw new Error(
      'The enquiry could not be sent. Please try again or contact the school directly.',
    );
  }
}