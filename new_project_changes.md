# Documentation of Recent Project Changes & Feature Implementations

This document compiles all the new changes and feature implementations introduced in the **Gono UV Research Project Repository and Academic Submission System** project, expanding upon the baseline documented in `book_gono_uv_research_repository_system.md`.

---

## 1. Multi-Role Email Verification System

To increase account security and verify user registration details, a complete email verification workflow has been implemented for users with roles matching **Student**, **Teacher**, and **Reviewer**.

### 1.1 Database Schema Update
In `prisma/schema.prisma`, a new field has been added to track email verification status:
* **Model**: `Users`
* **Added Property**: `IsEmailVerified Boolean? @default(false)`
* **DB Action**: Performed `npx prisma db push` to synchronize changes with Microsoft SQL Server.

### 1.2 Backend API Implementations (`routes/user.ts`)
Two new authenticated routes were added to handle the OTP verification process:
1. **Send Verification Code (`POST /api/users/send-verification`)**:
   - Validates the logged-in user's session.
   - Generates a random 6-digit OTP code (`Math.floor(100000 + Math.random() * 900000)`).
   - Stores the generated code in an in-memory `otpStore` Map (`Map<number, { otp: string; expiresAt: number }>`) mapped to the User ID with a **10-minute expiry window**.
   - Dispatches a premium HTML email template using `nodemailer` through Google's SMTP servers (`GRPConfig.mailConfig`).
2. **Confirm Verification Code (`POST /api/users/confirm-verification`)**:
   - Validates the provided 6-digit code against the `otpStore`.
   - Checks for expiration.
   - On success, updates the database via Prisma (`IsEmailVerified: true`), clears the OTP code from memory, and returns a success response.

### 1.3 Frontend Service Integration (`user-info-service.ts`)
Added helper methods to interact with the verification endpoints:
- `sendEmailVerification(): Observable<any>`
- `confirmEmailVerification(otp: string): Observable<any>`

### 1.4 Profile UI & Dialog Implementation (`profile.component`)
- **Status Check**: Added `shouldShowVerification()` method returning true only for Student, Teacher, or Reviewer roles.
- **Dynamic Badge/Button**: If the email is unverified, displays a warm orange **Verify** button with a shield icon. Clicking it triggers the verification process and opens an OTP modal. If already verified, displays a premium green **Verified** checkmark badge.
- **OTP Modal Dialog**: Implemented an inline `<ng-template #otpModal>` utilizing standard Angular MatDialog. It includes:
  - Visual prompts showing the target email address.
  - A stylized 6-digit input box with centered text.
  - A resend cooldown timer mechanism (60-second cooldown period).
  - Validation styling disabling submission until exactly 6 digits are input.
- **Styling (`profile.component.scss`)**: Added styling classes (`.email-value-container`, `.verified-badge`, `.verify-email-btn`, `.otp-dialog-*`) which align elements on a single row without wrapping text.

---

## 2. Notification Draft Routing Logic (`notification.component.ts`)

In the baseline implementation, clicking on a notification item navigated Admin, Super-Admin, and Reviewer roles to `/dashboard/papers-approval`. However, papers with `Draft` status do not appear in the approval queue, causing administrators to be routed to an empty approval screen.

### 2.1 Solution implemented
- Modified the routing logic in `onNotificationClick(notification)` in `notification.component.ts`:
  - Extracts the notification's status.
  - Detects if the status is `'draft'` or contains `'draft'`.
  - If a notification's status is draft, the target route changes to `/dashboard/create-papers` (even for Admins/Super-Admins) where they can manage their custom lists.

---

## 3. Notification Message Highlighting & Formatting

To improve readability and help users scan notifications instantly, message body texts are parsed dynamically.

### 3.1 Dynamic Message Formatting (`notification.component.ts`)
Created `getFormattedMessage(message: string): string` which parses messages using regex:
- **Titles**: Matches text enclosed in single or double quotes (e.g. `'paper from th1'`) and wraps them in `.msg-highlight-title`.
- **Statuses**: Matches status terms in quotes or following prefix keywords like `is`, `to`, `status`, `state` (e.g. `is pending approval`, `"Draft"`) and wraps them in `.msg-highlight-status`.
- **Submitters**: Matches names following `submitted by ` and wraps them in `.msg-highlight-user`.
- **Remarks**: Matches text following `Remarks:` and wraps it in `.msg-highlight-remarks`.

### 3.2 HTML Render & Style Rules
- **HTML (`notification.component.html`)**: Replaced string interpolation `{{ n.Message }}` with `[innerHTML]="getFormattedMessage(n.Message)"` to render HTML tags.
- **SCSS (`notification.component.scss`)**: Added style rules wrapped in `::ng-deep` (necessary to override Angular styling encapsulation for innerHTML bindings):
  - `.msg-highlight-title` (Indigo/Blue bold)
  - `.msg-highlight-status` (Amber/Orange bold)
  - `.msg-highlight-user` (Teal bold)
  - `.msg-highlight-remarks` (Crimson bold italic)

---

## 4. PrimeNG Badge Integration in Notifications

The custom-designed indicator span was replaced with PrimeNG's official `<p-badge>` component to align notifications with the rest of the application's premium UI.

### 4.1 Changes Made
- **TypeScript (`notification.component.ts`)**: Added `getSeverity(status: string | undefined)` returning PrimeNG severity states (`info`, `success`, `warn`, `danger`, `secondary`) based on the current status.
- **HTML (`notification.component.html`)**: Swapped out custom classes for `<p-badge [value]="getDisplayStatus(n)" [severity]="getSeverity(getDisplayStatus(n))">`.
