const wait = (milliseconds) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

function generateReferenceNumber() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  const month = String(
    currentDate.getMonth() + 1,
  ).padStart(2, '0');

  const day = String(
    currentDate.getDate(),
  ).padStart(2, '0');

  const randomNumber = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `SMES-${year}${month}${day}-${randomNumber}`;
}

export async function submitAdmissionApplication(
  application,
) {
  /*
   * Temporary frontend simulation.
   *
   * This does not send the application to an actual
   * database, email address, or admin dashboard yet.
   *
   * Replace this function with a backend API request
   * when the admission backend is ready.
   */

  if (!application) {
    throw new Error(
      'No admission application was provided.',
    );
  }

  await wait(1400);

  return {
    success: true,
    referenceNumber: generateReferenceNumber(),
    submittedAt: new Date().toISOString(),
    application,
  };
}