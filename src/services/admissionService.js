const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function validateConfiguration() {
  if (
    !supabaseUrl ||
    supabaseUrl.includes('your-project')
  ) {
    throw new Error(
      'The real Supabase project URL is missing from the .env file.',
    );
  }

  if (
    !supabasePublishableKey ||
    supabasePublishableKey.includes('your-key')
  ) {
    throw new Error(
      'The real Supabase publishable key is missing from the .env file.',
    );
  }
}

export async function submitAdmissionApplication(
  application,
) {
  validateConfiguration();

  if (!application?.form) {
    throw new Error(
      'Admission application information is missing.',
    );
  }

  const functionUrl =
    `${supabaseUrl}/functions/v1/Submit-admission`;

  let response;

  try {
    response = await fetch(functionUrl, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        apikey: supabasePublishableKey,
      },

      body: JSON.stringify(application),
    });
  } catch (error) {
    console.error(
      'Supabase connection error:',
      error,
    );

    throw new Error(
      'Unable to connect to the admission server. Please check your internet connection.',
    );
  }

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      'The admission server returned an invalid response.',
    );
  }

  if (!response.ok || !result.success) {
    console.error(
      'Admission submission error:',
      result,
    );

    throw new Error(
      result.message ||
        'The application could not be submitted.',
    );
  }

  return {
    success: true,
    referenceNumber:
      result.referenceNumber,
    submittedAt:
      result.submittedAt,
  };
}