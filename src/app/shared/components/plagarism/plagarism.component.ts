import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlagarismService } from '../../../admin/services/plagarism-service';
import { JournalService } from '../../../admin/services/journal-service';
import { UserInfoService } from '../../../admin/services/user-info-service';
import { ToastService } from '../../services/toast.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-plagarism',
  standalone: false,
  templateUrl: './plagarism.component.html',
  styleUrl: './plagarism.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlagarismComponent implements OnInit {
  plagarsimFrom!: FormGroup;
  loading: boolean = false;
  sending: boolean = false;
  pdfBase64: string = '';

  constructor(
    private readonly dialogRef: MatDialogRef<PlagarismComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { JournalId?: number } | null,
    private readonly plagiarismService: PlagarismService,
    private readonly journalService: JournalService,
    private readonly userService: UserInfoService,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.plagarsimFrom = new FormGroup({
      from: new FormControl({ value: 'gono.no.response@gmail.com', disabled: true }),
      to: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      attachments: new FormControl(null),
    });

    this.runPlagarismCheck();
  }

  /** Pre-fills the email form with an error notification so the admin can
   *  inform the author even when the plagiarism check could not complete. */
  private prefillErrorEmail(title: string, authorEmail: string, errorDetail: string): void {
    const subjectText = `Plagiarism Check Failed – Action Required: ${title || 'Your Submission'}`;
    const messageText = `Dear Author,

We attempted to run the plagiarism and AI-content review check for your submission${title ? ': "' + title + '"' : ''}, but encountered an issue that prevented the process from completing.

Error Details:
${errorDetail}

Please take note of the above and contact our support team or re-submit your paper if required.

We apologise for any inconvenience caused.

Best regards,
Academic Submission System`;

    this.plagarsimFrom.patchValue({
      to: authorEmail,
      subject: subjectText,
      message: messageText,
    });
    this.cdr.markForCheck();
  }

  onCancel() {
    this.dialogRef.close();
  }

  runPlagarismCheck() {
    if (!this.data) {
      this.toastService.error('No journal metadata provided.');
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    const journalId = this.data.JournalId;

    if (journalId) {
      this.journalService.getById(journalId).subscribe({
        next: (res) => {
          if (res?.data) {
            const journal = res.data;
            this.processReview(journal.Title, journal.FileUrl, journal.UserId);
          } else {
            this.toastService.error('Failed to fetch journal details.');
            this.prefillErrorEmail(
              '',
              '',
              'We were unable to retrieve the journal details from the system. The record may be missing or inaccessible.'
            );
            this.loading = false;
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastService.error('Error fetching journal details.');
          this.prefillErrorEmail(
            '',
            '',
            `A network or server error occurred while fetching the journal details. Error: ${err?.message || err?.statusText || 'Unknown error'}`
          );
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.toastService.error('Invalid journal metadata.');
      this.prefillErrorEmail(
        '',
        '',
        'The journal identifier provided was invalid or missing. The plagiarism check could not be started.'
      );
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  processReview(title: string, fileUrl: string, userId?: number) {
    if (!fileUrl) {
      this.toastService.error('Document file URL is missing.');
      // Fetch author email first (if we have userId), then prefill error email
      if (userId) {
        this.userService.getUsersById(userId).subscribe({
          next: (userRes) => {
            const email = userRes?.data?.Email || '';
            this.prefillErrorEmail(
              title,
              email,
              'The submission document file could not be located. The file URL is missing or has not been uploaded correctly. Please re-upload your paper and try again.'
            );
          },
          error: () => {
            this.prefillErrorEmail(
              title,
              '',
              'The submission document file could not be located. The file URL is missing or has not been uploaded correctly. Please re-upload your paper and try again.'
            );
          }
        });
      } else {
        this.prefillErrorEmail(
          title,
          '',
          'The submission document file could not be located. The file URL is missing or has not been uploaded correctly. Please re-upload your paper and try again.'
        );
      }
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }

    if (userId) {
      this.userService.getUsersById(userId).subscribe({
        next: (userRes) => {
          if (userRes?.data?.Email) {
            this.plagarsimFrom.patchValue({ to: userRes.data.Email });
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          console.error('Error fetching author user info:', err);
        }
      });
    }

    this.plagiarismService.reviewPaper(fileUrl).subscribe({
      next: (res: any) => {
        const review = res?.data;
        if (review) {
          const subjectText = `Plagiarism & AI Content Review Report: ${title}`;

          let issuesText = '';
          if (review.issues && review.issues.length > 0) {
            issuesText = review.issues.map((i: string) => `- ${i}`).join('\n');
          } else {
            issuesText = 'No critical plagiarism, AI-generation or formatting issues identified.';
          }

          const messageText = `Dear Author,

We have completed the plagiarism and AI-generated content review check for your submission: "${title}".

Here is a summary of the analysis:
- Similarity / Plagiarism Likelihood: ${review.plagiarism}%
- Quality Score: ${review.score}/100
- Recommended Action: ${review.approved ? 'Approve' : 'Revision Required'}

Summary:
${review.summary || 'No summary details provided.'}

Issues Identified:
${issuesText}

Please find the detailed review PDF report attached.

Best regards,
Academic Submission System`;

          this.plagarsimFrom.patchValue({
            subject: subjectText,
            message: messageText
          });

          try {
            this.generatePdfReport(title, review);
          } catch (pdfErr) {
            console.error('Error generating PDF report:', pdfErr);
            this.toastService.error('Analysis completed, but failed to generate PDF report.');
          }

        } else {
          this.toastService.error('Failed to parse plagiarism review response.');
        }

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error checking plagiarism:', err);
        this.toastService.error('Error occurred during plagiarism review.');
        this.prefillErrorEmail(
          title,
          this.plagarsimFrom.getRawValue().to || '',
          `An error occurred while running the automated plagiarism and AI-content analysis on your submission. This may be due to a temporary service outage or an unsupported file format.\n\nTechnical detail: ${err?.message || err?.statusText || 'Unknown error'}\n\nPlease contact support or re-submit your paper for re-evaluation.`
        );
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  generatePdfReport(title: string, review: any) {
    const doc = new jsPDF();

    const primaryColor = [30, 58, 138]; // RGB for deep blue #1e3a8a
    const textColor = '#1f2937';

    // Header Title Banner
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Academic Submission System', 15, 18);
    doc.setFontSize(14);
    doc.setFont('Helvetica', 'normal');
    doc.text('Plagiarism & Content Quality Analysis Report', 15, 28);

    // Document Metadata Panel
    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Document Title:', 15, 52);
    doc.setFont('Helvetica', 'normal');
    const splitTitle = doc.splitTextToSize(title, 140);
    doc.text(splitTitle, 50, 52);

    let yOffset = 52 + (splitTitle.length * 6);

    doc.setFont('Helvetica', 'bold');
    doc.text('Generated Date:', 15, yOffset);
    doc.setFont('Helvetica', 'normal');
    doc.text(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), 50, yOffset);

    yOffset += 12;

    // Metrics Box background
    doc.setFillColor(243, 244, 246);
    doc.rect(14, yOffset, 182, 35, 'F');

    // Metrics inside box
    doc.setTextColor(textColor);
    doc.setFontSize(11);

    doc.setFont('Helvetica', 'bold');
    doc.text('Plagiarism Likelihood:', 20, yOffset + 12);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${review.plagiarism}%`, 65, yOffset + 12);

    doc.setFont('Helvetica', 'bold');
    doc.text('Quality Score:', 20, yOffset + 22);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${review.score}/100`, 65, yOffset + 22);

    doc.setFont('Helvetica', 'bold');
    doc.text('Review Status:', 110, yOffset + 12);
    const approvedText = review.approved ? 'APPROVED' : 'REVISION REQUIRED';
    doc.setTextColor(review.approved ? 34 : 220, review.approved ? 139 : 38, review.approved ? 34 : 38);
    doc.text(approvedText, 145, yOffset + 12);

    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'bold');
    doc.text('AI Content:', 110, yOffset + 22);
    doc.setFont('Helvetica', 'normal');
    doc.text('Checked', 145, yOffset + 22);

    yOffset += 45;

    // Summary Section
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Executive Summary', 15, yOffset);

    doc.setDrawColor(209, 213, 219);
    doc.line(15, yOffset + 2, 195, yOffset + 2);

    yOffset += 8;
    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10.5);
    const splitSummary = doc.splitTextToSize(review.summary || 'No detailed analysis summary available.', 180);
    doc.text(splitSummary, 15, yOffset);

    yOffset += (splitSummary.length * 5.5) + 10;

    // Issues Identified Section
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Key Findings & Recommendations', 15, yOffset);

    doc.setDrawColor(209, 213, 219);
    doc.line(15, yOffset + 2, 195, yOffset + 2);

    yOffset += 8;
    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10.5);

    if (review.issues && review.issues.length > 0) {
      review.issues.forEach((issue: string) => {
        const splitIssue = doc.splitTextToSize(`• ${issue}`, 175);
        if (yOffset + (splitIssue.length * 6) > 280) {
          doc.addPage();
          yOffset = 20;
        }
        doc.text(splitIssue, 15, yOffset);
        yOffset += (splitIssue.length * 6);
      });
    } else {
      doc.text('No significant plagiarism, grammar, or formatting issues found.', 15, yOffset);
    }

    const pdfDataUri = doc.output('datauristring');
    this.pdfBase64 = pdfDataUri.split(',')[1];
  }

  sendMail() {
    if (this.plagarsimFrom.invalid || this.sending) {
      return;
    }

    this.sending = true;
    this.cdr.markForCheck();

    const formValues = this.plagarsimFrom.getRawValue();

    const mailData: any = {
      email: formValues.to,
      subject: formValues.subject,
      text: formValues.message,
      attachments: []
    };

    if (this.pdfBase64) {
      mailData.attachments.push({
        filename: 'Plagiarism_and_AI_Review_Report.pdf',
        content: this.pdfBase64,
        encoding: 'base64'
      });
    }

    this.plagiarismService.sendEmail(mailData).subscribe({
      next: (res: any) => {
        this.toastService.success(res?.message || 'Email sent successfully.');
        this.sending = false;
        this.cdr.markForCheck();
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error sending email:', err);
        this.toastService.error('Failed to send email. Please check configuration.');
        this.sending = false;
        this.cdr.markForCheck();
      }
    });
  }
}
