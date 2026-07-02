# System Development Methodology
## Gono UV Research Project Repository and Academic Submission System

This document outlines the system development methodology, architecture, database schemas, and workflows implemented for the **Gono UV Research Project Repository and Academic Submission System**. It serves as a comprehensive technical guide detailing how the system is structured, built, secured, and validated.

---

## 1. System Architecture Overview

The system follows a classic **decoupled client-server architecture** (Tier-3 architecture) that separates the presentation layer, the application logic layer, and the data storage layer.

```mermaid
graph TD
    subgraph Client Layer (Presentation)
        Angular[Angular SPA Frontend]
        PrimeNG[PrimeNG UI Components]
        Interceptors[HTTP & Auth Interceptors]
    end

    subgraph Server Layer (Application Logic)
        Express[Express.js TS Server]
        Swagger[Swagger Open API Docs]
        Prisma[Prisma Client ORM]
    end

    subgraph Data & Storage Layer
        SQLServer[(MS SQL Server Database)]
        Cloudinary[Cloudinary Cloud Storage]
    end

    Angular <-->|REST API / JSON| Express
    Express <-->|Prisma Queries| SQLServer
    Express -->|Uploads / Streams| Cloudinary
```

### 1.1 Technical Stack Composition
*   **Presentation Layer (Frontend):** 
    *   **Framework:** Angular (v21.1+) utilizing standalone component architecture and modular route configurations (`admin-routing.module.ts`).
    *   **UI Library:** PrimeNG for highly polished dashboard interfaces, modals, data tables, and input forms.
    *   **Styling:** Custom SCSS variables with modular flexbox layout (`ngx-flexible-layout`).
    *   **Reactive State:** RxJS Observables for asynchronous HTTP routing and data streams.
*   **Application Logic Layer (Backend):**
    *   **Framework:** Node.js with Express.js using TypeScript.
    *   **API Documentation:** Swagger UI (`swagger-ui-express`) rendering OpenAPI 3 schemas to specify and test HTTP requests.
    *   **ORM:** Prisma Client (`@prisma/client`) representing type-safe access to the database.
*   **Data & Storage Layer:**
    *   **Database:** Microsoft SQL Server (configured via Prisma connector).
    *   **Asset Storage:** Cloudinary Cloud Service, integrated via Multer storage engine (`multer-storage-cloudinary`), hosting academic manuscripts (PDFs) and user profile photos.

---

## 2. System Use Case Diagram

The use case diagram describes the behavioral requirements of the system by outlining the interactions between key actors and system functionalities.

```mermaid
graph TD
    %% Define Actors with distinct styling
    subgraph Actors
        Student[Student]
        Teacher[Teacher / Supervisor]
        Admin[Administrator / Super-Admin]
    end

    %% Define Use Cases
    subgraph "System Capabilities"
        UC1(Login & Session Management)
        UC2(Manage Personal Profile)
        UC3(Submit Academic/Research Paper)
        UC4(Select Authors & Supervisor Groups)
        UC5(Track Submission Status & Comments)
        UC6(Review Submission & Leave Remarks)
        UC7(Approve Submission Content)
        UC8(Final Paper/Journal Publication)
        UC9(Manage Users, Roles & Batches)
        UC10(Manage Categories & Subcategories)
    end

    %% Connect Students to Use Cases
    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5

    %% Connect Teachers to Use Cases
    Teacher --> UC1
    Teacher --> UC2
    Teacher --> UC5
    Teacher --> UC6
    Teacher --> UC7

    %% Connect Admins to Use Cases
    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9
    Admin --> UC10
```

### 2.1 Use Case Summary by Actor

*   **Student (Author):**
    *   Authenticates via JWT login credentials.
    *   Initiates draft submissions by uploading PDF manuscripts (handled through Cloudinary).
    *   Assigns co-authors and supervisors (`PaperGroups` association).
    *   Monitors supervisor reviews, feedback comments, and status notifications.
*   **Teacher (Supervisor / Reviewer):**
    *   Views submitted research manuscripts assigned to their group.
    *   Conducts evaluation, registers comments, and updates statuses (e.g., `Review Requested` or `Editorial Approved`).
*   **Administrator (Admin & Super-Admin):**
    *   Manages core directory data including Departments, Batches, Categories, and Subcategories.
    *   Oversees user identity management and role authorization mapping.
    *   Grants the final `Approved` status to publish papers/journals globally in the repository.

---

## 3. Database Design & Entity Relationship Diagram (ERD)

The database schema is managed using **Prisma Schema** with a relational SQL Server database backend. Relationships are designed to represent student/teacher dynamics, departments, academic batches, categories, and hierarchical research papers/journals.

### 3.1 Entity Relationship Diagram

```mermaid
erDiagram
    Department ||--o{ Batches : "contains"
    Department ||--o{ Users : "employs/enrolls"
    Department ||--o{ Papers : "categorizes"
    Roles ||--o{ Users : "defines permissions for"
    
    Users ||--o{ UserSessions : "creates"
    Users ||--o{ Papers : "submits"
    Users ||--o{ Journals : "author"
    Users ||--o{ PaperGroups : "belongs to"
    Users ||--o{ PaperApprovals : "reviews"

    Batches ||--o{ Papers : "groups"
    Batches ||--o{ Users : "associates"

    Category ||--o{ SubCategory : "subdivides"
    Category ||--o{ Papers : "classifies"
    Category ||--o{ Journals : "classifies"

    SubCategory ||--o{ Papers : "refines"
    SubCategory ||--o{ Journals : "refines"

    Papers ||--o{ PaperGroups : "encompasses"
    Papers ||--o{ PaperApprovals : "requires"
    Papers ||--o{ PaperApprovalHistories : "tracks approvals for"

    Journals ||--o{ PaperGroups : "encompasses"
    Journals ||--o{ PaperApprovals : "requires"
    Journals ||--o{ PaperApprovalHistories : "tracks approvals for"

    PaperApprovals ||--o{ PaperApprovalHistories : "snapshots status change in"
```

### 3.2 Table Definitions and Roles

| Table Name | Primary Purpose | Key Fields |
| :--- | :--- | :--- |
| **`Department`** | Represents university academic divisions (e.g., CSE, BBA, Pharmacy). | `Id`, `Name`, `Code`, `IsMarkToDelete` |
| **`Batches`** | Academic student intake groups per department. | `Id`, `Name`, `Year`, `DepartmentId` |
| **`Roles`** | Manages authorization levels (Super-Admin, Admin, Teacher, Student). | `Id`, `Name` |
| **`Users`** | Stores user identity, authentication hashes, and role mappings. | `Id`, `Name`, `Email`, `Password`, `StudentId`, `RoleId` |
| **`UserSessions`** | Stores and tracks active refresh tokens for session prolongation. | `Id`, `UserId`, `RefreshtokenId`, `IsActive` |
| **`Category`** | General scientific research categories. | `Id`, `Name`, `Code` |
| **`SubCategory`** | Highly specialized fields within general research categories. | `Id`, `Name`, `CategoryId` |
| **`Papers`** | Academic thesis and project manuscripts uploaded by students. | `Id`, `Title`, `Abstract`, `FileUrl`, `UserId` |
| **`Journals`** | Published academic research articles. | `Id`, `Title`, `DOI`, `Volume`, `IssueNumber` |
| **`PaperGroups`** | Map of students and guiding teachers associated with a paper/journal. | `Id`, `PaperId`, `UserId`, `UserType` |
| **`PaperApprovals`** | Current verification status (Draft, Pending, Approved, etc.) of a paper. | `Id`, `PaperId`, `Status`, `Remarks` |
| **`PaperApprovalHistories`** | Immutable chronological logs of review notes and approval state changes. | `Id`, `PaperId`, `Status`, `Remarks`, `ApprovedByUser` |

---

## 4. Core Workflow Implementations

### 4.1 Authentication & Request Interception Workflow
The application implements JWT-based stateless authorization secured on the backend via password hashing using `bcrypt` and signature verification using `jsonwebtoken`.

```mermaid
sequenceDiagram
    autonumber
    actor User as Angular Client
    participant API as Express Gateway
    participant DB as SQL Server

    User->>API: POST /api/login (Credentials)
    API->>DB: Fetch User & Verify Bcrypt Hash
    DB-->>API: User Record (Role, Active Status)
    API-->>User: Return HTTP 200 (Access Token + Refresh Token)
    Note over User: Access Token stored in memory.<br/>Refresh Token stored securely.
    
    User->>API: GET /api/paper/get (Header: Bearer Token)
    Note over API: Token expired? (HTTP 401)
    API-->>User: HTTP 401 Unauthorized
    
    User->>API: GET /api/getToken/{refreshToken}
    API->>DB: Verify active session refresh token
    DB-->>API: Valid Session
    API-->>User: Return New Access Token
    User->>API: Retry GET /api/paper/get (Header: New Bearer Token)
    API-->>User: HTTP 200 (Papers Data)
```

1.  **Auth Interceptor (`auth-interceptor.ts`):** Automatically intercepts outgoing HTTP requests and injects the authorization header `Authorization: Bearer <Token>`.
2.  **Refresh Token Interceptor (`refresh-token-interceptor.ts`):** Listens for `401 Unauthorized` responses. If caught, it locks request queues, calls `/api/getToken/{refreshToken}`, gets a renewed access token, updates local storage, and replays all blocked requests without disrupting the user experience.

### 4.2 Research Paper Creation & Transaction Workflow
When a student creates a paper submission, the backend must atomically insert multiple related entities (the paper, student-author entries, advising teacher mappings, initial approval logs, and historical records). To prevent partial writes or data inconsistencies, the Express server invokes a **Prisma Interactive Transaction** (`prisma.$transaction`).

```mermaid
flowchart TD
    Start[User Submits Form] --> Upload[File uploaded to Cloudinary via Multer]
    Upload --> TxStart[Start Database Transaction]
    TxStart --> CreatePaper[1. Insert Paper Record]
    CreatePaper --> AddStudents[2. Insert Student IDs in PaperGroups]
    AddStudents --> AddTeachers[3. Insert Teacher IDs in PaperGroups]
    AddTeachers --> InitApproval[4. Insert Draft status in PaperApprovals]
    InitApproval --> LogHistory[5. Insert Initialization log in PaperApprovalHistories]
    LogHistory --> TxCommit{All operations successful?}
    TxCommit -->|Yes| Commit[Commit changes to DB] --> Success[Return HTTP 200 Success]
    TxCommit -->|No / Error| Rollback[Rollback transaction] --> Fail[Return HTTP 500 Error]
```

### 4.3 State Machine for Paper Approvals
The system utilizes a structured state transition policy based on the actor's system role:

```mermaid
stateDiagram-v2
    [*] --> Draft : Student / Author Initializes
    Draft --> Pending : Student Submits for Review
    Pending --> ReviewRequested : Reviewer requests adjustments
    ReviewRequested --> Pending : Student updates and resubmits
    Pending --> EditorialApproved : Supervisor approves research content
    EditorialApproved --> Approved : Editorial/Super-Admin publishes
    Pending --> Rejected : Reviewer Rejects Submission
    ReviewRequested --> Rejected : Reviewer Rejects Submission
    Rejected --> [*]
    Approved --> [*]
```

*   **Role-Based Constraints:**
    *   **Student:** Can create papers (Draft) and request approval (Pending).
    *   **Teacher/Supervisor:** Evaluates pending submissions, adds comments (`Remarks`), and updates the status to `Review Requested` or `Editorial Approved`.
    *   **Admin/Super-Admin:** Performs final checks on editorial-approved submissions and grants final publication authorization (`Approved` or `Rejected`).

### 4.4 End-to-End System Process Workflow

The following comprehensive process diagram traces the entire user journey: starting from authentication, proceeding through role-based routing (Student, Teacher, Admin/Super-Admin), and listing every core feature and sub-action accessible by each role.

```mermaid
flowchart TD
    %% Styling definitions
    classDef auth fill:#efe5ff,stroke:#7c4dff,stroke-width:2px;
    classDef student fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef teacher fill:#fff8e1,stroke:#f57f17,stroke-width:2px;
    classDef admin fill:#ffebee,stroke:#c62828,stroke-width:2px;
    classDef common fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;

    subgraph Authentication [Authentication & Initialization]
        Start([Start]) --> Login[User Login Screen]:::auth
        Login --> Verify{Credentials Valid?}:::auth
        Verify -- No --> ShowError[Show Error & Retry]:::auth
        ShowError --> Login

        Verify -- Yes --> GenerateTokens[Generate Access & Refresh Tokens]:::auth
        GenerateTokens --> FetchRole[Fetch User Role]:::auth
        FetchRole --> Redirect[Redirect to Dashboard]:::auth
    end

    Redirect --> RouteRole{User Role?}

    subgraph StudentFlow [Student Portal Features]
        StudentDash[Student Dashboard]:::student
        StudentDash --> StudentMenu{Select Feature}:::student
        
        StudentMenu --> S_Upload[Upload Article]:::student
        S_Upload --> S_Cloudinary[Upload PDF to Cloudinary]:::student
        S_Cloudinary --> S_Form[Fill Metadata, Authors & Supervisors]:::student
        S_Form --> S_Submit[Submit to DB - Status: Pending]:::student
        S_Submit --> StudentDash
        
        StudentMenu --> S_Thesis[Thesis / Research]:::student
        S_Thesis --> S_Track[Track Submission Status & Comments]:::student
        S_Track --> S_Details[View Remarks & PDF Details]:::student
        S_Details --> S_EditCheck{Is Status Draft/ReviewRequested?}:::student
        S_EditCheck -- Yes --> S_Edit[Edit Submission & Resubmit]:::student
        S_Edit --> S_Submit
        S_EditCheck -- No --> StudentDash
        
        StudentMenu --> S_Pub[Publication List]:::student
        S_Pub --> S_Browse[Browse & Download Approved Journals]:::student
        S_Browse --> StudentDash
        
        StudentMenu --> S_Profile[Profile / Change Password]:::student
        S_Profile --> S_Update[Update Personal Info & Password]:::student
        S_Update --> StudentDash
    end

    subgraph TeacherFlow [Teacher / Supervisor Portal Features]
        TeacherDash[Teacher Dashboard]:::teacher
        TeacherDash --> TeacherMenu{Select Feature}:::teacher
        
        TeacherMenu --> T_Approval[Papers Approval]:::teacher
        T_Approval --> T_List[List Assigned Paper Groups]:::teacher
        T_List --> T_Review[Review Manuscript & Add Remarks]:::teacher
        T_Review --> T_Action{Review Decision?}:::teacher
        T_Action -- Request Adjustments --> T_ReqAdj[Status: Review Requested]:::teacher
        T_Action -- Approve Content --> T_ApprContent[Status: Editorial Approved]:::teacher
        T_Action -- Reject --> T_Reject[Status: Rejected]:::teacher
        T_ReqAdj --> T_Notify[Send System Notification]:::teacher
        T_ApprContent --> T_Notify
        T_Reject --> T_Notify
        T_Notify --> TeacherDash
        
        TeacherMenu --> T_Common[Common Tools]:::teacher
        T_Common --> S_Upload
        T_Common --> S_Thesis
        T_Common --> S_Pub
        T_Common --> S_Profile
    end

    subgraph AdminFlow [Admin & Super-Admin Portal Features]
        AdminDash[Admin Dashboard]:::admin
        AdminDash --> AdminMenu{Select Feature}:::admin
        
        AdminMenu --> A_Approval[Papers Approval]:::admin
        A_Approval --> A_List[List Editorial Approved Papers]:::admin
        A_List --> A_Final[Final Review & Verification]:::admin
        A_Final --> A_Action{Final Decision?}:::admin
        A_Action -- Publish --> A_Pub[Status: Approved - Move to Journal]:::admin
        A_Action -- Send Back --> A_Rev[Status: Review Requested]:::admin
        A_Action -- Reject --> A_Rej[Status: Rejected]:::admin
        A_Pub --> A_Notify[Send Notification]:::admin
        A_Rev --> A_Notify
        A_Rej --> A_Notify
        A_Notify --> AdminDash
        
        AdminMenu --> A_Manage[Administration Management]:::admin
        A_Manage --> A_Users[Users: Create/Update/Delete Users]:::admin
        A_Manage --> A_Roles[Roles: Access Roles List]:::admin
        A_Manage --> A_Depts[Departments: Manage Departments]:::admin
        A_Manage --> A_Batches[Batches: Manage Batches]:::admin
        A_Manage --> A_Cats[Categories & Subcategories]:::admin
        A_Manage --> A_Papers[Papers: Global Submissions List]:::admin
        
        A_Users & A_Roles & A_Depts & A_Batches & A_Cats & A_Papers --> AdminDash
        
        AdminMenu --> A_Common[Common Tools]:::admin
        A_Common --> S_Upload
        A_Common --> S_Thesis
        A_Common --> S_Pub
        A_Common --> S_Profile
    end

    RouteRole -- Student --> StudentDash
    RouteRole -- Teacher --> TeacherDash
    RouteRole -- Admin / Super-Admin --> AdminDash
```

1. **Authentication & Initialization:** Captures user login, token-based session management, and redirection based on role mappings.
2. **Student Pathway:** Enables paper draft creation, Cloudinary upload of manuscripts, assignment of co-authors/supervisors, tracking of approval histories, and updating submissions.
3. **Teacher Pathway:** Allows supervisors to review papers in their group, leave evaluation remarks, and transition approval states.
4. **Admin/Super-Admin Pathway:** Provides global management of system catalogs (Users, Roles, Departments, Batches, Categories, Subcategories) and the final paper publication approval workflow.

---

## 5. Software Development Life Cycle (SDLC) Methodology

To execute the project successfully, the development cycle is structured into six iterative stages (Agile Methodology):

```mermaid
graph LR
    Req[1. Requirements & Spec] --> DBDesign[2. DB Modeling & Schema]
    DBDesign --> APIBuild[3. Swagger & API Endpoints]
    APIBuild --> UIBuild[4. Angular UI & State]
    UIBuild --> Security[5. Authorization & Guards]
    Security --> Verify[6. Verification & Swagger Testing]
    Verify --> Req
```

1.  **Requirements & Specifications:** Setting up the roles (Super-Admin, Admin, Teacher, Student) and defining what academic records are required.
2.  **Database Modeling & Schema Design:** Creating the prisma model files and syncing migrations with local Microsoft SQL Server instances.
3.  **API Construction:** Building Express handlers. For every route group, swagger specs are updated inside `swagger.ts` to allow live API testing during integration.
4.  **UI & Interceptor Development:** Developing Angular components matching the route targets (`/dashboard/papers`, `/dashboard/papers-approval`, etc.), integrating PrimeNG components for tabular data rendering.
5.  **Authorization & Security:** Implementing password hashing, JSON Web Tokens validation, route guards, and HTTP interceptors.
6.  **Verification and Quality Checks:** Ensuring validation rules, lint guidelines (using `scripts/enforce-naming.js`), and test validation.

---

## 6. System Verification & Verification Plan

Verification ensures that the application operates reliably and meets security specifications.

### 6.1 Swagger UI Testing
All endpoints are verified using Swagger at `http://localhost:3000/api-docs`. 
*   **Security verification:** Endpoints tagged with authentication restrictions (e.g. `POST /api/subcategories/create`) return a `401 Unauthorized` without a valid Bearer token.
*   **Response validity:** Verifies request payload structures conform to TypeScript models defined in `src/app/fds-config/entity-models/`.

### 6.2 Naming and Architecture Linting
The workspace includes a naming enforcement script (`scripts/enforce-naming.js`) executed using:
```bash
npm run fix-naming
```
This utility scans code resources and ensures naming conventions across folders, selectors, and routes are followed consistently, preventing regressions.

### 6.3 Local Development Verification
To execute and verify the application environment concurrently:
1.  **Backend Startup:** Run the database migrations and start the Node Express server.
    ```bash
    npm run dev
    ```
2.  **Frontend Startup:** Start the Angular development server.
    ```bash
    npm start
    ```
3.  **UI Access:** Navigate to `http://localhost:4200` to execute user acceptance testing (UAT) across Student, Teacher, and Administrator roles.
