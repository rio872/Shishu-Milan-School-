import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import Footer from '../components/Footer';
import Header from '../components/Header';

import {
  acceptedDocumentTypes,
  admissionSteps,
  maximumDocumentSize,
} from '../data/admissionData';

import { school } from '../data/schoolData';

import {
  submitAdmissionApplication,
} from '../services/admissionService';

import {
  AcademicInformationStep,
  AdditionalInformationStep,
  AdmissionConfirmationModal,
  AdmissionFAQ,
  AdmissionHelp,
  AdmissionHero,
  AdmissionInfo,
  AdmissionNavigation,
  AdmissionProcess,
  AdmissionProgress,
  AdmissionSuccess,
  ApplicationReviewStep,
  DocumentUploadStep,
  GuardianInformationStep,
  RequiredDocuments,
  StudentInformationStep,
} from '../components/admission/AdmissionComponents';

const STORAGE_KEY =
  'shishu-milan-admission-draft-v1';

const initialForm = {
  studentName: '',
  dateOfBirth: '',
  gender: '',
  applyingGrade: '',
  currentAge: '',
  nationality: 'Nepali',
  studentAddress: '',

  guardianName: '',
  relationship: '',
  guardianPhone: '',
  alternativePhone: '',
  guardianEmail: '',
  occupation: '',
  permanentAddress: '',
  currentAddress: '',
  guardianWhatsapp: '',

  previousSchool: '',
  previousGrade: '',
  lastResult: '',
  reasonForLeaving: '',
  studiedBefore: '',
  academicStrengths: '',
  subjectsNeedingSupport: '',

  transportationRequired: '',
  preferredRoute: '',
  medicalCondition: '',
  specialLearningRequirement: '',
  siblingAtSchool: '',
  siblingName: '',
  siblingClass: '',
  extracurricularInterests: [],
  additionalMessage: '',

  declarationAccepted: false,
  privacyConsent: false,
};

const initialFiles = {
  studentPhoto: null,
  birthCertificate: null,
  reportCard: null,
  transferCertificate: null,
  passportPhoto: null,
  guardianIdentification: null,
};

function calculateAge(dateString) {
  if (!dateString) {
    return '';
  }

  const birthDate = new Date(
    `${dateString}T00:00:00`,
  );

  if (
    Number.isNaN(birthDate.getTime())
  ) {
    return '';
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age -= 1;
  }

  return age >= 0 ? String(age) : '';
}

function loadSavedForm() {
  try {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return initialForm;
    }

    const parsed = JSON.parse(saved);

    return {
      ...initialForm,
      ...parsed,
      extracurricularInterests:
        Array.isArray(
          parsed.extracurricularInterests,
        )
          ? parsed.extracurricularInterests
          : [],
      declarationAccepted: false,
      privacyConsent: false,
    };
  } catch {
    return initialForm;
  }
}

function validatePhone(value) {
  return /^[+\d][\d\s()-]{7,}$/.test(
    value.trim(),
  );
}

function validateEmail(value) {
  return /^\S+@\S+\.\S+$/.test(
    value.trim(),
  );
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] =
    useState(0);

  const [form, setForm] = useState(
    loadSavedForm,
  );

  const [files, setFiles] =
    useState(initialFiles);

  const [errors, setErrors] =
    useState({});

  const [fileErrors, setFileErrors] =
    useState({});

  const [stepError, setStepError] =
    useState('');

  const [confirmationOpen, setConfirmationOpen] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [successResult, setSuccessResult] =
    useState(null);

  const formSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const previousTitle =
      document.title;

    document.title =
      `Apply for Admission | ${school.name}`;

    let description =
      document.querySelector(
        'meta[name="description"]',
      );

    const createdDescription =
      !description;

    const previousDescription =
      description?.getAttribute(
        'content',
      );

    if (!description) {
      description =
        document.createElement('meta');

      description.setAttribute(
        'name',
        'description',
      );

      document.head.appendChild(
        description,
      );
    }

    description.setAttribute(
      'content',
      `Submit an online admission application to ${school.name}. Apply for available classes and provide student and guardian information securely.`,
    );

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        description.remove();
      } else {
        description.setAttribute(
          'content',
          previousDescription || '',
        );
      }
    };
  }, []);

  useEffect(() => {
    if (successResult) {
      return;
    }

    const hasEnteredInformation =
      Object.entries(form).some(
        ([key, value]) => {
          if (
            key ===
              'declarationAccepted' ||
            key === 'privacyConsent'
          ) {
            return false;
          }

          if (Array.isArray(value)) {
            return value.length > 0;
          }

          return Boolean(
            String(value || '').trim(),
          );
        },
      );

    if (!hasEnteredInformation) {
      localStorage.removeItem(
        STORAGE_KEY,
      );

      return;
    }

    const formToSave = {
      ...form,
      declarationAccepted: false,
      privacyConsent: false,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(formToSave),
    );
  }, [form, successResult]);

  const scrollToForm = () => {
    window.setTimeout(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  const updateField = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => {
      const nextValue =
        type === 'checkbox'
          ? checked
          : value;

      const nextForm = {
        ...current,
        [name]: nextValue,
      };

      if (name === 'dateOfBirth') {
        nextForm.currentAge =
          calculateAge(value);
      }

      if (
        name ===
          'transportationRequired' &&
        value === 'No'
      ) {
        nextForm.preferredRoute = '';
      }

      if (
        name === 'siblingAtSchool' &&
        value === 'No'
      ) {
        nextForm.siblingName = '';
        nextForm.siblingClass = '';
      }

      return nextForm;
    });

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: '',
      }));
    }

    setStepError('');
  };

  const toggleInterest = (interest) => {
    setForm((current) => {
      const selected =
        current.extracurricularInterests.includes(
          interest,
        );

      return {
        ...current,
        extracurricularInterests:
          selected
            ? current.extracurricularInterests.filter(
                (item) =>
                  item !== interest,
              )
            : [
                ...current.extracurricularInterests,
                interest,
              ],
      };
    });
  };

  const selectFile = (
    key,
    file,
  ) => {
    let error = '';

    if (
      !acceptedDocumentTypes.includes(
        file.type,
      )
    ) {
      error =
        'Only PDF, JPG, JPEG and PNG files are allowed.';
    } else if (
      file.size > maximumDocumentSize
    ) {
      error =
        'The selected file is larger than 5 MB.';
    }

    setFileErrors((current) => ({
      ...current,
      [key]: error,
    }));

    if (error) {
      setFiles((current) => ({
        ...current,
        [key]: null,
      }));

      return;
    }

    setFiles((current) => ({
      ...current,
      [key]: file,
    }));
  };

  const removeFile = (key) => {
    setFiles((current) => ({
      ...current,
      [key]: null,
    }));

    setFileErrors((current) => ({
      ...current,
      [key]: '',
    }));
  };

  const validateStep = (step) => {
    const nextErrors = {};

    if (step === 0) {
      if (
        form.studentName.trim().length <
        2
      ) {
        nextErrors.studentName =
          'Please enter the student’s full name.';
      }

      if (!form.dateOfBirth) {
        nextErrors.dateOfBirth =
          'Please select the date of birth.';
      }

      if (!form.applyingGrade) {
        nextErrors.applyingGrade =
          'Please select the applying grade.';
      }

      if (
        form.studentAddress.trim().length <
        5
      ) {
        nextErrors.studentAddress =
          'Please enter the student’s address.';
      }
    }

    if (step === 1) {
      if (
        form.guardianName.trim().length <
        2
      ) {
        nextErrors.guardianName =
          'Please enter the parent or guardian name.';
      }

      if (
        !validatePhone(
          form.guardianPhone,
        )
      ) {
        nextErrors.guardianPhone =
          'Please enter a valid phone number.';
      }

      if (
        form.alternativePhone &&
        !validatePhone(
          form.alternativePhone,
        )
      ) {
        nextErrors.alternativePhone =
          'Please enter a valid alternative phone number.';
      }

      if (
        !validateEmail(
          form.guardianEmail,
        )
      ) {
        nextErrors.guardianEmail =
          'Please enter a valid email address.';
      }

      if (
        form.currentAddress.trim().length <
        5
      ) {
        nextErrors.currentAddress =
          'Please enter the current address.';
      }

      if (
        form.guardianWhatsapp &&
        !validatePhone(
          form.guardianWhatsapp,
        )
      ) {
        nextErrors.guardianWhatsapp =
          'Please enter a valid WhatsApp number.';
      }
    }

    if (step === 4) {
      const hasFileError =
        Object.values(
          fileErrors,
        ).some(Boolean);

      if (hasFileError) {
        setStepError(
          'Remove or replace invalid documents before continuing.',
        );
      }
    }

    if (step === 5) {
      if (
        !form.declarationAccepted
      ) {
        nextErrors.declarationAccepted =
          'You must accept the declaration before submitting.';
      }

      if (!form.privacyConsent) {
        nextErrors.privacyConsent =
          'You must provide privacy consent before submitting.';
      }
    }

    return nextErrors;
  };

  const goToNextStep = () => {
    const nextErrors =
      validateStep(currentStep);

    setErrors(nextErrors);

    const hasFileError =
      currentStep === 4 &&
      Object.values(fileErrors).some(
        Boolean,
      );

    if (
      Object.keys(nextErrors).length >
        0 ||
      hasFileError
    ) {
      setStepError(
        hasFileError
          ? 'Please correct the document upload errors.'
          : 'Please complete the required fields before continuing.',
      );

      return;
    }

    setStepError('');
    setCurrentStep(
      (step) =>
        Math.min(
          step + 1,
          admissionSteps.length - 1,
        ),
    );

    scrollToForm();
  };

  const goToPreviousStep = () => {
    setStepError('');
    setErrors({});

    setCurrentStep((step) =>
      Math.max(step - 1, 0),
    );

    scrollToForm();
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      setErrors({});
      setStepError('');
      scrollToForm();
    }
  };

  const requestSubmission = () => {
    const nextErrors =
      validateStep(5);

    setErrors(nextErrors);

    if (
      Object.keys(nextErrors).length >
      0
    ) {
      setStepError(
        'Please accept the declaration and privacy consent.',
      );

      return;
    }

    setStepError('');
    setConfirmationOpen(true);
  };

  const confirmSubmission = async () => {
    if (
      submitting ||
      successResult
    ) {
      return;
    }

    setSubmitting(true);

    try {
      const documentMetadata =
        Object.fromEntries(
          Object.entries(files).map(
            ([key, file]) => [
              key,
              file
                ? {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                  }
                : null,
            ],
          ),
        );

      const response =
        await submitAdmissionApplication({
          form,
          documents: documentMetadata,
        });

      const submissionDate =
        new Intl.DateTimeFormat(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          },
        ).format(
          new Date(
            response.submittedAt,
          ),
        );

      setSuccessResult({
        referenceNumber:
          response.referenceNumber,
        submissionDate,
        studentName: form.studentName,
        applyingGrade:
          form.applyingGrade,
        application: {
          ...form,
          documents: documentMetadata,
        },
      });

      setConfirmationOpen(false);

      localStorage.removeItem(
        STORAGE_KEY,
      );

      window.setTimeout(() => {
        scrollToForm();
      }, 50);
    } catch (error) {
      setStepError(
        error.message ||
          'The application could not be submitted. Please try again.',
      );

      setConfirmationOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const resetApplication = () => {
    const confirmed = window.confirm(
      'Do you want to clear all entered admission information?',
    );

    if (!confirmed) {
      return;
    }

    setForm(initialForm);
    setFiles(initialFiles);
    setErrors({});
    setFileErrors({});
    setStepError('');
    setCurrentStep(0);
    setSuccessResult(null);

    localStorage.removeItem(
      STORAGE_KEY,
    );

    scrollToForm();
  };

  const createSummaryText = () => {
    if (!successResult) {
      return '';
    }

    return `
${school.name}
ONLINE ADMISSION APPLICATION SUMMARY

Application Reference: ${successResult.referenceNumber}
Submission Date: ${successResult.submissionDate}

STUDENT INFORMATION
Student Name: ${form.studentName}
Date of Birth: ${form.dateOfBirth}
Current Age: ${form.currentAge}
Gender: ${form.gender}
Applying Grade: ${form.applyingGrade}
Nationality: ${form.nationality}
Address: ${form.studentAddress}

PARENT OR GUARDIAN
Name: ${form.guardianName}
Relationship: ${form.relationship}
Phone: ${form.guardianPhone}
Alternative Phone: ${form.alternativePhone}
Email: ${form.guardianEmail}
WhatsApp: ${form.guardianWhatsapp}
Occupation: ${form.occupation}
Current Address: ${form.currentAddress}
Permanent Address: ${form.permanentAddress}

ACADEMIC INFORMATION
Previous School: ${form.previousSchool}
Previous Grade: ${form.previousGrade}
Last Result: ${form.lastResult}
Reason for Leaving: ${form.reasonForLeaving}
Previously Studied at School: ${form.studiedBefore}
Academic Strengths: ${form.academicStrengths}
Subjects Needing Support: ${form.subjectsNeedingSupport}

ADDITIONAL INFORMATION
Transportation Required: ${form.transportationRequired}
Preferred Route: ${form.preferredRoute}
Medical Condition or Allergy: ${form.medicalCondition}
Special Learning Requirement: ${form.specialLearningRequirement}
Sibling at School: ${form.siblingAtSchool}
Sibling Name: ${form.siblingName}
Sibling Class: ${form.siblingClass}
Extracurricular Interests: ${form.extracurricularInterests.join(', ')}
Additional Message: ${form.additionalMessage}

Submitting this application does not guarantee admission.
The school will contact the parent or guardian after review.
    `.trim();
  };

  const downloadSummary = () => {
    const summary =
      createSummaryText();

    const blob = new Blob(
      [summary],
      {
        type: 'text/plain;charset=utf-8',
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;

    link.download = `${successResult.referenceNumber}-admission-summary.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const printApplication = () => {
    const summary =
      createSummaryText();

    const printWindow =
      window.open(
        '',
        '_blank',
        'width=900,height=700',
      );

    if (!printWindow) {
      return;
    }

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>
            ${escapeHtml(
              successResult.referenceNumber,
            )}
          </title>

          <style>
            body {
              max-width: 850px;
              margin: 40px auto;
              padding: 0 24px;
              font-family: Arial, sans-serif;
              color: #10234f;
              line-height: 1.7;
            }

            h1 {
              font-size: 30px;
              margin-bottom: 5px;
            }

            pre {
              white-space: pre-wrap;
              font-family: Arial, sans-serif;
              font-size: 14px;
            }
          </style>
        </head>

        <body>
          <h1>
            ${escapeHtml(
              school.name,
            )}
          </h1>

          <pre>${escapeHtml(
            summary,
          )}</pre>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const startNewApplication = () => {
    setSuccessResult(null);
    setForm(initialForm);
    setFiles(initialFiles);
    setErrors({});
    setFileErrors({});
    setCurrentStep(0);

    scrollToForm();
  };

  return (
    <>
      <Header />

      <main>
        <AdmissionHero
          image={
            school.applyHeroImage ||
            '/admission/admission-hero.jpg'
          }
        />

        <AdmissionInfo />

        <section
          id="admission-form"
          ref={formSectionRef}
          className="scroll-mt-28 bg-slate-50 py-20 sm:py-24"
        >
          <div className="section-shell">
            {!successResult ? (
              <div className="rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-xl sm:p-8 lg:p-10">
                <AdmissionProgress
                  currentStep={
                    currentStep
                  }
                  onStepSelect={goToStep}
                />

                <div className="mt-10">
                  <AnimatePresence
                    mode="wait"
                  >
                    {currentStep === 0 && (
                      <StudentInformationStep
                        form={form}
                        errors={errors}
                        onChange={
                          updateField
                        }
                        studentPhoto={
                          files.studentPhoto
                        }
                        studentPhotoError={
                          fileErrors.studentPhoto
                        }
                        onPhotoSelect={(
                          file,
                        ) =>
                          selectFile(
                            'studentPhoto',
                            file,
                          )
                        }
                        onPhotoRemove={() =>
                          removeFile(
                            'studentPhoto',
                          )
                        }
                      />
                    )}

                    {currentStep === 1 && (
                      <GuardianInformationStep
                        form={form}
                        errors={errors}
                        onChange={
                          updateField
                        }
                      />
                    )}

                    {currentStep === 2 && (
                      <AcademicInformationStep
                        form={form}
                        errors={errors}
                        onChange={
                          updateField
                        }
                      />
                    )}

                    {currentStep === 3 && (
                      <AdditionalInformationStep
                        form={form}
                        errors={errors}
                        onChange={
                          updateField
                        }
                        onToggleInterest={
                          toggleInterest
                        }
                      />
                    )}

                    {currentStep === 4 && (
                      <DocumentUploadStep
                        files={files}
                        fileErrors={
                          fileErrors
                        }
                        onSelect={
                          selectFile
                        }
                        onRemove={
                          removeFile
                        }
                      />
                    )}

                    {currentStep === 5 && (
                      <ApplicationReviewStep
                        form={form}
                        files={files}
                        errors={errors}
                        onChange={
                          updateField
                        }
                        onEdit={goToStep}
                        onSubmitRequest={
                          requestSubmission
                        }
                      />
                    )}
                  </AnimatePresence>

                  {stepError && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      role="alert"
                      className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700"
                    >
                      {stepError}
                    </motion.p>
                  )}

                  <AdmissionNavigation
                    currentStep={
                      currentStep
                    }
                    onPrevious={
                      goToPreviousStep
                    }
                    onNext={
                      goToNextStep
                    }
                    onReset={
                      resetApplication
                    }
                    loading={
                      submitting
                    }
                  />
                </div>
              </div>
            ) : (
              <AdmissionSuccess
                result={successResult}
                onPrint={
                  printApplication
                }
                onDownload={
                  downloadSummary
                }
                onNewApplication={
                  startNewApplication
                }
              />
            )}
          </div>
        </section>

        <AdmissionProcess />

        <RequiredDocuments />

        <AdmissionHelp />

        <AdmissionFAQ />
      </main>

      <Footer />

      <AdmissionConfirmationModal
        open={confirmationOpen}
        studentName={
          form.studentName
        }
        applyingGrade={
          form.applyingGrade
        }
        loading={submitting}
        onClose={() =>
          setConfirmationOpen(false)
        }
        onConfirm={
          confirmSubmission
        }
      />
    </>
  );
}