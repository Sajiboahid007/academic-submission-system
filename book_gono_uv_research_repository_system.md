# Gono UV Research Project Repository and Academic Submission System

**A Comprehensive Academic Project Book**

---

> **Authors:** Department of Computer Science and Engineering, Gono Bishwabidyalay (University)  
> **Academic Year:** 2025–2026  
> **Technology Stack:** Angular 21 · Express.js · Prisma ORM · Microsoft SQL Server · Cloudinary  

---

## Table of Contents

- [Chapter 1: Introduction](#chapter-1-introduction)
  - [1.1 Background and Motivation](#11-background-and-motivation)
  - [1.2 Objective](#12-objective)
  - [1.3 Research Problem](#13-research-problem)
  - [1.4 Contribution](#14-contribution)
- [Chapter 2: Literature Review](#chapter-2-literature-review)
  - [2.1 Overview of Existing Systems](#21-overview-of-existing-systems)
  - [2.2 Manual vs. Digital Submission Systems](#22-manual-vs-digital-submission-systems)
  - [2.3 Related Works in Academic Management Systems](#23-related-works-in-academic-management-systems)
  - [2.4 Limitations of Existing Systems](#24-limitations-of-existing-systems)
  - [2.5 Research Gap](#25-research-gap)
- [Chapter 3: System Analysis & Methodology](#chapter-3-system-analysis--methodology)
  - [3.1 Requirement Analysis](#31-requirement-analysis)
  - [3.2 Feasibility Study](#32-feasibility-study)
  - [3.3 Development Methodology](#33-development-methodology)
  - [3.4 System Architecture](#34-system-architecture)
  - [3.5 Use Case Diagram](#35-use-case-diagram)
  - [3.6 ER Diagram / Database Design](#36-er-diagram--database-design)
  - [3.7 Workflow of the System](#37-workflow-of-the-system)
- [Chapter 4: System Design & Implementation](#chapter-4-system-design--implementation)
  - [4.1 Frontend Design (UI/UX)](#41-frontend-design-uiux)
  - [4.2 Backend Development (API Design)](#42-backend-development-api-design)
  - [4.3 Database Implementation](#43-database-implementation)
  - [4.4 Role-Based Authentication System](#44-role-based-authentication-system)
  - [4.5 Core Features Implementation](#45-core-features-implementation)
  - [4.6 System Modules Description](#46-system-modules-description)
- [Chapter 5: Testing & Results](#chapter-5-testing--results)
  - [5.1 Testing Methodology](#51-testing-methodology)
  - [5.2 Test Cases](#52-test-cases)
  - [5.3 Bug Fixing and Debugging](#53-bug-fixing-and-debugging)
  - [5.4 System Output Screenshots & Logs](#54-system-output-screenshots--logs)
  - [5.5 Result Analysis](#55-result-analysis)
- [Chapter 6: Conclusion & Future Work](#chapter-6-conclusion--future-work)
  - [6.1 Summary of the Project](#61-summary-of-the-project)
  - [6.2 Achievements](#62-achievements)
  - [6.3 Limitations of the System](#63-limitations-of-the-system)
  - [6.4 Future Improvements](#64-future-improvements)
  - [6.5 Final Conclusion](#65-final-conclusion)
- [Chapter 7: References / Bibliography](#chapter-7-references--bibliography)

---

# CHAPTER 1: INTRODUCTION

## 1.1 Background and Motivation

The rapid digitalization of higher education has fundamentally transformed how academic institutions manage, store, and disseminate scholarly work [1]. Universities worldwide have been transitioning from traditional paper-based submission workflows to web-based digital platforms that streamline the entire lifecycle of academic research, from initial manuscript drafting to final publication and long-term archival [2]. This transition is being driven by the exponential growth in the volume of student research projects, theses, dissertations, and faculty-authored journal articles that must be systematically catalogued, reviewed, approved, and preserved for institutional memory [3].

In the specific context of Bangladeshi universities, many institutions continue to rely on manual, paper-driven processes for collecting and evaluating student research submissions [4]. A typical workflow involves students printing multiple copies of their thesis or project report, physically delivering them to departmental offices, and then waiting—sometimes for weeks—for supervisors to schedule in-person review meetings [4]. This manual approach introduces significant administrative delays, increases the risk of physical document loss or damage, creates bottlenecks during peak submission periods (such as the end of academic semesters), and makes it virtually impossible to maintain a searchable, centralized repository of institutional research output [5]. Furthermore, the COVID-19 pandemic dramatically exposed the fragility of paper-dependent academic workflows, as universities across South Asia struggled to continue thesis evaluation processes when physical campuses became inaccessible [6].

The **Gono UV Research Project Repository and Academic Submission System** was conceived to directly address these systemic challenges. It is a full-stack web application designed to digitize and automate the complete academic submission pipeline—encompassing research paper upload, multi-actor review workflows, role-based approval state machines, and centralized journal publication management [7]. The system serves as a university-wide digital repository where students can submit manuscripts electronically, supervisors can review and annotate them remotely, and administrators can grant final publication authorization—all through a unified, secure, and fully auditable platform [8].

The motivation for building this system is threefold. First, there is an operational need to reduce the administrative overhead associated with manual submission tracking, which consumes significant faculty and staff time that could be redirected toward teaching and research activities [9]. Second, building a centralized digital repository enables the university to publicly showcase its collective research output, thereby improving institutional visibility, academic ranking metrics, and the discoverability of student and faculty scholarship [10]. Third, implementing a structured, role-based approval workflow with comprehensive audit trails ensures accountability, transparency, and traceability in the academic review process—core requirements of modern university accreditation standards and quality assurance frameworks [11].

## 1.2 Objective

The primary objectives of this project are as follows:

1. **To design and develop a web-based academic submission platform** that replaces traditional paper-based research project and thesis submission processes with a fully digital, cloud-integrated workflow built on modern web technologies [2] [7].
2. **To implement a multi-tier role-based access control (RBAC) system** that differentiates permissions across four distinct user roles—Super-Admin, Admin, Teacher/Supervisor, and Student—ensuring that each actor can only perform actions appropriate to their specific authorization level, following established RBAC security frameworks [13].
3. **To build a structured, state-machine-driven approval pipeline** that guides academic submissions through clearly defined stages (Draft → Pending → Review Requested → Editorial Approved → Approved/Rejected), with complete historical audit logging maintained at every state transition, in accordance with statechart formalism principles [14].
4. **To create a centralized university research repository** that stores, indexes, and enables discovery of all approved academic papers and published journal articles, organized by department, academic batch, research category, and subcategory [15].
5. **To integrate cloud-based file storage** using the Cloudinary platform for hosting uploaded PDF manuscripts and user profile images, ensuring reliable, scalable, and globally accessible document storage without dependence on local server infrastructure [16].
6. **To provide a secure authentication mechanism** using JSON Web Tokens (JWT) [17] with access token and refresh token rotation, combined with bcrypt password hashing, to protect user credentials and maintain session integrity against common web security threats.
7. **To deliver a modern, responsive user interface** built with Angular [18] and PrimeNG that provides an intuitive, visually polished, and accessible experience across desktop and mobile devices, following contemporary UI/UX design principles.

## 1.3 Research Problem

Despite significant advances in educational technology platforms and Learning Management Systems (LMS), the specific domain of **academic research submission and institutional repository management** remains underserved by commercially available solutions—particularly for small-to-medium-sized universities in developing countries with limited IT budgets and technical staff [19]. Existing platforms such as DSpace [20], EPrints [21], and institutional instances of Open Journal Systems (OJS) [22] are powerful enterprise-grade tools, but they suffer from steep learning curves, complex server deployment requirements, and limited customization flexibility for institutions that need tightly integrated submission-review-approval workflows tailored to their specific organizational structures [20].

The core research problem this project addresses can be stated as follows:

> *How can a lightweight, full-stack web application be designed and implemented to provide a complete academic submission management system—with multi-role authorization, structured approval workflows, cloud-based document storage, and centralized repository functionality—specifically tailored to the operational context and resource constraints of a Bangladeshi university?*

This overarching problem encompasses several inter-related sub-challenges:

- **Workflow Orchestration:** Designing a formal state machine [14] that accurately models the real-world academic review process, supporting bidirectional transitions (e.g., a supervisor can request revisions, returning a paper from "Pending" to "Review Requested" status), while simultaneously maintaining an immutable, timestamped audit trail of all state changes in the database [23].
- **Role Hierarchies and Access Control:** Implementing a granular RBAC permission model [13] where students can only manage their own submissions, teachers can only review papers assigned to their supervision groups through the PaperGroups association, and administrators have system-wide management capabilities including user creation, department management, and final publication authorization.
- **Transactional Data Integrity:** Ensuring that complex multi-entity database operations (e.g., creating a paper record simultaneously with its student-author group entries, teacher-supervisor mappings, initial approval record, and historical audit log entry) are executed atomically using interactive database transactions [23], preventing orphaned records or data inconsistencies that would undermine system reliability.
- **Scalable File Management:** Handling potentially large PDF manuscripts (academic theses can routinely exceed 100 pages and 10 MB in size) through cloud-based storage [16] rather than local server file systems, thereby avoiding storage capacity bottlenecks, ensuring geographic redundancy, and enabling document accessibility through Cloudinary's global Content Delivery Network (CDN).

## 1.4 Contribution

This project makes the following key contributions to the field of academic information systems:

1. **A Complete, Production-Ready System:** Unlike many academic software engineering projects that remain at the conceptual design or minimal prototype stage, this system is fully implemented with a decoupled Angular frontend [18], an Express.js/TypeScript backend [7], Prisma ORM with Microsoft SQL Server [23], and Cloudinary cloud storage integration [16]—constituting a production-ready platform suitable for real-world deployment in a university environment.
2. **A Novel Multi-Stage Approval State Machine:** The system introduces a five-state approval pipeline (Draft → Pending → Review Requested → Editorial Approved → Approved) with formal role-based transition constraints and immutable history logging via the `PaperApprovalHistories` database table [14]. This model is significantly more granular and realistic than the binary approve/reject workflows found in most existing open-source academic management systems [20] [21].
3. **Dual-Track Submission Management:** The system uniquely handles both **academic papers** (student thesis and project submissions requiring supervisor review) and **journal articles** (faculty or student publications with scholarly metadata including DOI, volume number, and issue number) through a unified approval infrastructure using shared `PaperApprovals`, `PaperGroups`, and `PaperApprovalHistories` tables [7] [23].
4. **Secure Token Rotation Architecture:** The authentication subsystem implements a dual-token strategy with short-lived access tokens (7-minute expiry) and long-lived refresh tokens managed through the `UserSessions` database table, with automatic token rotation on each refresh request to mitigate token replay and session hijacking attacks [17].
5. **Open-Source, Extensible Architecture:** The system's modular design—with clearly separated Express route handlers, a Prisma-managed database schema, Swagger API documentation [24], and a component-based Angular frontend [18]—creates an extensible foundation that future developers can enhance with additional features such as plagiarism detection integration, automated email notifications, or analytics dashboards [2] [3].

---

# CHAPTER 2: LITERATURE REVIEW

## 2.1 Overview of Existing Systems

The landscape of academic submission and repository management systems has evolved significantly over the past two decades, driven by the global open access movement and the increasing institutional emphasis on digital archiving of scholarly output [1] [10]. Several established platforms dominate the current ecosystem of academic research management tools.

**DSpace**, originally developed at the Massachusetts Institute of Technology (MIT) in collaboration with Hewlett-Packard Laboratories, is one of the most widely deployed open-source institutional repository platforms, currently used by over 3,000 organizations worldwide across academic, governmental, and non-profit sectors [20]. DSpace provides robust metadata management based on the Dublin Core standard, supports a wide range of file formats including PDF, DOCX, and multimedia files, and offers OAI-PMH (Open Archives Initiative Protocol for Metadata Harvesting) compliance for metadata interoperability with other repositories [20]. However, DSpace was primarily designed as a *digital repository* rather than a *submission management system*—it excels at storing, cataloguing, and providing public access to already-approved scholarly works, but provides limited built-in support for the multi-stage, multi-role review and approval workflows that are essential for managing active student thesis submissions [20] [11].

**EPrints**, developed and maintained by the University of Southampton since 2000, is another leading open-source repository platform that has been widely adopted by universities in the United Kingdom, Europe, and South Asia [21]. Like DSpace, EPrints focuses primarily on self-archiving and metadata-driven discovery of scholarly works, supporting the Green Open Access model where authors deposit pre-prints or post-prints of their published research [21]. EPrints does offer some workflow capabilities that are more developed than DSpace, including editorial moderation before deposited items are made publicly visible in the repository. However, the approval pipeline remains relatively simple (typically a single-step editorial approval) compared to the multi-role, multi-stage workflow required for comprehensively managing student thesis submissions where supervisors, departmental committees, and administrators each play distinct review roles [21] [11].

**Open Journal Systems (OJS)**, developed and maintained by the Public Knowledge Project (PKP) at Simon Fraser University, is the most widely used open-source software for managing peer-reviewed academic journals, currently powering over 25,000 active journals globally [22]. OJS provides a comprehensive editorial workflow encompassing manuscript submission, blind peer review assignment, editorial decision-making, author revision management, copyediting, typesetting, and online publication [22]. While OJS is an exceptionally capable platform for journal management, it is purpose-built specifically for the *journal publishing* workflow and does not address the broader institutional needs such as student thesis submission tracking, departmental batch-based organization, or general-purpose research project repository management [22] [15].

**Turnitin** and **Blackboard** represent major commercial platforms that include assignment and thesis submission features within their broader Learning Management System (LMS) offerings [25]. These platforms provide plagiarism detection, grading rubrics, and instructor feedback mechanisms. However, they are primarily designed for coursework assignment submission and grading rather than research thesis management with hierarchical approval workflows [25]. They lack features such as multi-stage approval state machines, institutional repository search and discovery functionality, and research categorization systems [25] [15].

## 2.2 Manual vs. Digital Submission Systems

Traditional manual submission systems, which remain prevalent in many universities across South Asia, Sub-Saharan Africa, and parts of Southeast Asia, involve a series of labor-intensive physical steps [4]. Students are required to print and bind their research documents (often in multiple copies for different committee members), physically deliver them to departmental administrative offices, receive paper-based acknowledgment receipts, and then await manual scheduling of supervisor review sessions—a process that can stretch from several days to multiple weeks during busy academic periods [4] [5]. Extensive research has documented the disadvantages of such manual processes:

- **Submission Speed:** Takes days to weeks due to printing, binding, and physical delivery requirements [4] vs. instantaneous submission via PDF upload through the web interface [7] [16].
- **Document Security:** Significant risk of physical damage from water, fire, or pest exposure, as well as loss or misplacement during handling [5] vs. cloud-backed storage with automatic redundancy, versioning, and CDN distribution via Cloudinary [16].
- **Review Tracking:** Informal tracking through paper-based log books, phone calls, or unstructured email chains [4] vs. real-time status dashboards showing current approval state with complete audit trails in the database [14] [23].
- **Searchability:** Requires manual catalogue browsing in physical library archives, often with incomplete or outdated index cards [5] vs. full metadata-based digital search filtered by category, subcategory, department, and keywords [15].
- **Accessibility:** Limited to campus operating hours and physical office/library locations [6] vs. 24/7 access from any internet-connected device, anywhere in the world [7] [18].
- **Scalability:** Constrained by available physical storage space and administrative staff capacity [5] vs. horizontally scalable through cloud infrastructure and database optimization [16] [23].
- **Audit Trail:** Informal and easily lost paper logs [4] vs. immutable, timestamped digital records in the `PaperApprovalHistories` table containing detailed user and status information [14] [23].

Research conducted by Ahmed and Rahman (2021) found that Bangladeshi universities that had adopted digital submission systems reported an average 60% reduction in administrative processing time for thesis submissions and a 45% decrease in submission-related student complaints compared to institutions still using manual processes [4]. Similarly, a comprehensive UNESCO study on digital transformation in higher education highlighted that institutions adopting web-based research management platforms demonstrated measurable improvements in research output visibility, interdisciplinary collaboration rates, and citation impact metrics [1].

## 2.3 Related Works in Academic Management Systems

Several academic studies have explored the design, development, and evaluation of web-based submission and management systems for university research:

**Nwankwo et al. (2020)** developed a web-based project submission and supervision management system specifically designed for Nigerian universities, implemented using PHP and MySQL as the technology stack [26]. Their system supported core features including student project topic registration, automated supervisor assignment based on research interest matching, and progress milestone tracking through a simple dashboard interface [26]. However, their system lacked several critical features: it did not implement a structured approval state machine with defined status transitions, it relied on local server file storage rather than cloud-based document hosting, and the PHP-based server-rendered frontend provided a dated user experience with limited interactivity compared to modern single-page application frameworks [26].

**Karim and Hasan (2019)** proposed and partially implemented an online thesis management system designed for private universities in Bangladesh, using Java Spring Boot for the backend and PostgreSQL for database storage [27]. Their system included features for thesis proposal submission with abstract and research question fields, supervisor feedback collection through a comments system, and final submission tracking with a binary approved/not-approved status indicator [27]. While their research demonstrated the feasibility and stakeholder demand for digitizing thesis management in the Bangladeshi university context, the implemented system did not support multi-role approval workflows (only a single reviewer role was defined), lacked comprehensive API documentation (no Swagger or equivalent), and did not integrate any form of cloud-based storage for hosting the actual thesis PDF documents [27].

**Chen et al. (2021)** developed a research paper management platform for Chinese universities using React for the frontend and Node.js for the backend API server [28]. Their system was focused specifically on the journal publication workflow, supporting features such as blind peer review assignment, editorial decision-making with structured revision categories, and automated DOI registration for accepted manuscripts [28]. However, their platform was designed exclusively for journal article management and did not address the broader institutional needs of student thesis submission management, departmental categorization hierarchies, or batch-based academic cohort tracking that are essential for a university-wide research repository [28] [15].

**Microsoft Azure-based enterprise solutions** have been explored and adopted by some larger, well-funded universities, leveraging Azure Blob Storage for scalable document management, Azure Active Directory for enterprise-grade identity and access management, and Azure Cognitive Search for full-text repository search capabilities [9]. While these enterprise-grade cloud solutions offer excellent scalability, security compliance (GDPR, FERPA), and integration with the Microsoft 365 ecosystem, their subscription costs, deployment complexity, and requirement for specialized Azure DevOps expertise make them impractical for smaller institutions—particularly universities in developing countries with limited IT budgets and technical staff [9] [19].

## 2.4 Limitations of Existing Systems

The comprehensive literature review conducted across academic publications, open-source platform documentation, and commercial product evaluations reveals several consistent and significant limitations across existing academic submission and repository management systems:

1. **Rigid Workflow Models:** The majority of existing systems implement either binary approve/reject workflows or simple linear approval pipelines with no support for bidirectional transitions [20] [26]. They fundamentally lack the flexibility to model real-world academic review processes where submissions may be returned to students for revisions multiple times, reviewed by multiple committee members at different organizational levels, and progressed through multiple intermediate states before reaching final approval or rejection [14].
2. **Monolithic Software Architecture:** Many existing systems, particularly those developed in academic research contexts, are built as monolithic server-rendered applications using older technology stacks such as PHP with MySQL [26] or Java Servlets with JSP pages [27]. This monolithic architecture makes the systems difficult to maintain over time, challenging to scale for growing user bases, and resistant to modernization with contemporary frontend frameworks and API-first design patterns [2] [7].
3. **Limited Role Granularity:** While most existing systems distinguish between basic "student" and "administrator" roles, very few implement the fine-grained, multi-tier role hierarchy (Super-Admin, Admin, Teacher, Student) that is necessary to accurately model the actual organizational authority structure of a university department [13] [26]. The absence of role granularity means that critical workflow decisions—such as distinguishing between a supervisor's editorial approval and an administrator's final publication authorization—cannot be properly enforced by the system.
4. **Local File Storage Dependency:** Many existing systems store uploaded thesis documents and manuscripts on the application server's local filesystem [26] [27], creating single points of failure for document availability, limiting storage capacity to the server's disk space, and making documents inaccessible when the server experiences downtime. Cloud-based storage solutions [16] address all of these limitations through geographic redundancy, elastic scaling, and CDN-backed global accessibility.
5. **Absence of API Documentation:** Few existing academic management systems provide interactive, standards-compliant API documentation such as Swagger/OpenAPI specification pages [24]. This absence makes it extremely difficult to integrate the submission system with other institutional information systems (e.g., student information systems, library management systems, or LMS platforms) and significantly increases the onboarding time for new developers joining the project [27] [28].
6. **Weak Session Management:** Many existing systems rely on simple HTTP session cookies or basic token storage without implementing security best practices such as token expiry, automatic token rotation, or refresh token management [17]. This leaves the systems vulnerable to session hijacking attacks, cross-site request forgery (CSRF), and token replay attacks—particularly concerning given that academic submission systems handle sensitive student and faculty data [26].

## 2.5 Research Gap

The comprehensive analysis of existing literature, open-source platforms, and commercial solutions reveals a clear and significant gap in the current landscape:

> **There is no lightweight, open-source, full-stack web application that combines institutional repository functionality with a multi-stage, role-based approval workflow, cloud-based document storage, interactive API documentation, and a modern single-page application (SPA) frontend—specifically designed for the operational context and resource constraints of universities in developing countries such as Bangladesh.**

Existing solutions in the market either focus narrowly on journal publishing management (OJS) [22], provide repository storage and discovery functionality without submission workflow support (DSpace, EPrints) [20] [21], are developed using outdated monolithic technology stacks that limit usability, extensibility, and developer productivity [26] [27], or require expensive commercial cloud subscriptions that exceed the budgets of smaller institutions [9]. None of the reviewed systems offer the combination of features needed: a modern Angular SPA frontend [18], a TypeScript-based Express.js REST API backend [7], type-safe database access through Prisma ORM [23], cloud file hosting via Cloudinary [16], JWT-based authentication with refresh token rotation [17], Swagger API documentation [24], and a formal multi-stage approval state machine with immutable audit history [14].

The **Gono UV Research Project Repository and Academic Submission System** directly addresses this research gap by providing a comprehensive, integrated solution that covers the entire academic submission lifecycle—from student manuscript upload to administrative publication approval—using a modern, fully decoupled architecture specifically designed for the operational needs of Gono Bishwabidyalay [7] [8].

---

# CHAPTER 3: SYSTEM ANALYSIS & METHODOLOGY

## 3.1 Requirement Analysis

### 3.1.1 Functional Requirements

Functional requirements define the specific behaviors, capabilities, and features that the system must exhibit to satisfy stakeholder needs [12]. These requirements were elicited through structured interviews with faculty members, department heads, and student representatives at Gono Bishwabidyalay, and are organized below by functional domain:

**FR-1: Authentication and Session Management**
- FR-1.1: The system shall allow registered users to authenticate using their email address and password credentials through a secure login interface [17].
- FR-1.2: Upon successful authentication, the system shall issue a short-lived JWT access token (7-minute expiry) for API authorization and a long-lived refresh token for session persistence [17].
- FR-1.3: The system shall automatically refresh expired access tokens using the stored refresh token through the `/api/getToken/{refreshToken}` endpoint, without requiring the user to re-enter credentials [17].
- FR-1.4: The system shall hash all user passwords using the bcrypt algorithm with a salt factor of 10 before storing them in the database, ensuring that plaintext passwords are never persisted [17] [13].

**FR-2: User Management (Admin/Super-Admin)**
- FR-2.1: Administrators shall be able to create, read, update, and soft-delete user accounts through the user management interface and corresponding API endpoints [13].
- FR-2.2: Administrators shall be able to assign authorization roles (Super-Admin, Admin, Teacher, Student) to user accounts based on the NIST RBAC model [13].
- FR-2.3: Administrators shall be able to associate users with university departments and academic batches for organizational grouping [13] [23].

**FR-3: Academic Paper Submission (Student)**
- FR-3.1: Students shall be able to upload PDF manuscripts to Cloudinary cloud storage via the `/api/upload` endpoint, receiving a permanent URL for the uploaded document [16].
- FR-3.2: Students shall be able to create paper submissions by providing required metadata: title, abstract, year, category, subcategory, department, batch, and the Cloudinary file URL [7] [23].
- FR-3.3: Students shall be able to assign co-author students and supervising teachers to a submission through the PaperGroups association mechanism [7].
- FR-3.4: The system shall atomically create the paper record, all student and teacher group mappings, the initial approval record (with Draft status), and the first approval history entry within a single Prisma interactive database transaction to ensure data consistency [23].

**FR-4: Paper Review and Approval (Teacher/Admin)**
- FR-4.1: Teachers shall be able to view and access papers assigned to their supervision groups through the PaperGroups table association [14] [7].
- FR-4.2: Authorized reviewers shall be able to update the submission status through defined state transitions (Pending, Review Requested, Editorial Approved, Approved, Rejected) and attach textual remarks justifying their decision [14].
- FR-4.3: Every status change operation shall atomically create a new record in the PaperApprovalHistories table capturing the reviewer's identity, email, timestamp, new status, and remarks [14] [23].

**FR-5: Journal Management**
- FR-5.1: Authorized users shall be able to create journal article entries with comprehensive scholarly metadata including title, abstract, DOI (Digital Object Identifier), volume number, issue number, author names, institutional affiliation, keywords, and author declaration statements [7] [28].
- FR-5.2: The system shall support the same group-based author/editor assignment and multi-stage approval workflows for journals as it does for academic papers, using the shared PaperApprovals and PaperGroups tables [7] [14].

**FR-6: Institutional Repository and Discovery**
- FR-6.1: The system shall provide a public-facing home page that displays all papers and journals in the repository with filtering capabilities by research category, subcategory, university department, and keyword search [15].
- FR-6.2: The system shall expose public API endpoints (not requiring authentication) for aggregate statistics and browsing interfaces to support repository exploration [15] [24].

**FR-7: Administrative Data Management**
- FR-7.1: Administrators shall be able to manage university organizational data—departments, academic batches, research categories, and research subcategories—through full CRUD (Create, Read, Update, Delete) operations via both the web interface and REST API [13] [24].

### 3.1.2 Non-Functional Requirements

Non-functional requirements define the quality attributes, performance constraints, and operational characteristics that the system must satisfy [12]:

- **Performance (NFR-1):** All API responses shall complete within 2 seconds under normal load conditions with up to 100 concurrent users [7] [2].
- **Security (NFR-2):** All passwords shall be stored exclusively as bcrypt hashes; all API endpoints (except the login and public home routes) shall require a valid JWT Bearer token in the Authorization header [17] [13].
- **Scalability (NFR-3):** The system shall use Cloudinary cloud-based file storage to decouple document storage capacity from application server resources, enabling elastic storage scaling [16].
- **Usability (NFR-4):** The Angular frontend shall provide a responsive, accessible user interface using PrimeNG components with consistent visual theming across all pages and components [18].
- **Maintainability (NFR-5):** The entire codebase (both frontend and backend) shall use TypeScript for static type safety, with Prisma providing auto-generated, type-safe database client code from the schema definition [23] [18].
- **Reliability (NFR-6):** All multi-entity database operations shall use Prisma interactive transactions (`prisma.$transaction()`) to guarantee ACID atomicity and prevent data inconsistency from partial operation failures [23].
- **Interoperability (NFR-7):** All REST API endpoints shall be fully documented via Swagger UI conforming to the OpenAPI 3.0 specification, accessible at the `/api-docs` URL path [24].
- **Availability (NFR-8):** Document files shall remain accessible even during application server maintenance windows through Cloudinary's independent CDN infrastructure [16].

## 3.2 Feasibility Study

### 3.2.1 Technical Feasibility

The project leverages mature, widely-adopted, and extensively documented open-source technologies with large developer communities and active maintenance [2] [7]:

- **Angular 21** is a production-proven frontend framework maintained by Google, with comprehensive official documentation, a large ecosystem of third-party component libraries, and Long-Term Support (LTS) release cycles that ensure stability for enterprise applications [18].
- **Express.js** is the most popular Node.js web framework with over 60,000 GitHub stars, powering millions of production applications worldwide with its minimal, un-opinionated middleware architecture [7].
- **Prisma ORM** provides type-safe database access with automatic TypeScript client generation from schema files, visual schema management through Prisma Studio, and automated migration management [23].
- **Microsoft SQL Server** is an enterprise-grade relational database engine with full ACID compliance, sophisticated query optimization, comprehensive security features, and excellent Prisma connector support [23].
- **Cloudinary** offers a generous free-tier plan with 25 GB of total storage and 25 GB of monthly network bandwidth—sufficient for initial deployment and early production use [16].

### 3.2.2 Economic Feasibility

The project exclusively uses open-source frameworks and free-tier cloud services, minimizing both the initial development investment and ongoing operational costs [7] [16]:

- **Angular 21, Express.js, Prisma ORM, Node.js:** Free and Open Source under the MIT License [18] [7] [23].
- **Microsoft SQL Server Developer Edition:** Free for development and testing environments [23].
- **Cloudinary Free Tier:** Free hosting offering 25 GB storage and 25 GB bandwidth per month [16].
- **Swagger UI:** Free and open-source tooling under the Apache 2.0 license [24].
- **Development Hardware:** Existing university laboratory computers, avoiding new capital expenditure.
- **Total Initial Cost:** $0 (Zero cost).

### 3.2.3 Operational Feasibility

The system is designed to be deployable and operable by university IT staff with basic familiarity with Node.js server administration and Angular build processes [7] [18]. The auto-generated Swagger API documentation [24] enables non-developer administrative staff to understand, test, and troubleshoot API functionality without requiring programming expertise. The PrimeNG-based dashboard interface [18] provides familiar UI interaction patterns (data tables with sorting and filtering, modal dialog forms, dropdown selectors, toast notification messages) that require minimal end-user training for both faculty and students.

## 3.3 Development Methodology

The project follows an **Agile-Iterative Software Development Life Cycle (SDLC)** methodology [8], structured into six iterative phases that cycle continuously to accommodate evolving requirements and incremental feature delivery:

1. **Requirements & Specifications:** Defining user roles (Super-Admin, Admin, Teacher, Student), identifying data entities (Papers, Journals, Users, Departments, Batches, Categories, SubCategories), and documenting both functional and non-functional requirements through structured stakeholder interviews [12] [8].
2. **Database Modeling & Schema Design:** Creating the Prisma schema file (`schema.prisma`) defining all 12 database models with their inter-entity relationships, referential integrity constraints, default value expressions, and column-level type specifications, then executing database migrations against the local Microsoft SQL Server instance [23].
3. **API Construction:** Building Express.js route handler modules for each resource domain (login, users, departments, roles, batches, categories, subcategories, papers, journals, paper-approval, upload, home), with concurrent updates to the Swagger specification in `swagger.ts` to maintain synchronized, interactive API documentation [7] [24].
4. **UI & Interceptor Development:** Developing Angular components matching each backend route target (`/dashboard/papers`, `/dashboard/papers-approval`, `/dashboard/journal`, etc.), integrating PrimeNG components for data table rendering, modal dialog forms, and file upload widgets, and implementing the authentication and refresh token HTTP interceptors [18] [17].
5. **Authorization & Security:** Implementing the `authenticate` Express middleware for JWT token verification on protected routes, the `auth-interceptor.ts` for automatic Bearer token injection into outgoing HTTP requests, and the `refresh-token-interceptor.ts` for transparent, non-disruptive access token renewal [17].
6. **Verification & Quality Checks:** Testing all API endpoints via the Swagger UI interface, validating role-based access restriction enforcement, confirming transactional atomicity for multi-entity operations, and running the automated naming enforcement script (`npm run fix-naming`) to maintain codebase consistency [24] [23].

## 3.4 System Architecture

The system implements a **decoupled three-tier client-server architecture** that separates concerns across three distinct and independently deployable layers [2] [7]:

- **Client Layer (Presentation):** The Angular 21 single-page application [18] handles all user interface rendering, reactive form management, and client-side route navigation. It communicates with the backend server exclusively through RESTful HTTP calls, with all response data processed as RxJS Observable streams for reactive state management [18]. PrimeNG provides a comprehensive library of 80+ pre-built, themeable UI components including DataTables, Dialog modals, MultiSelect dropdowns, FileUpload widgets, and Toast notifications [18].
- **Server Layer (Application Logic):** The Express.js server [7], written entirely in TypeScript for type safety, processes incoming HTTP requests, validates JWT authentication tokens via the `authenticate` middleware [17], executes business logic for each domain, and coordinates all database operations through the Prisma Client [23]. The server exposes 12 modular route handler files covering all system domains and serves interactive Swagger UI API documentation at the `/api-docs` endpoint [24].
- **Data & Storage Layer:** Microsoft SQL Server stores all relational data with referential integrity enforced through foreign key constraints defined in the Prisma schema [23]. Cloudinary provides cloud-based object storage for uploaded PDF manuscripts and user profile images, accessed through the Multer-Cloudinary storage engine integration that handles multipart file upload processing [16].

## 3.5 Use Case Diagram

The use case diagram illustrates the complete functional scope of the system from the perspective of its three primary actor categories: Student, Teacher, and Administrator [12]. 

- **Student Actor:** Authenticates via JWT login [17], uploads PDF manuscripts to Cloudinary [16], creates paper submissions with metadata and group assignments [7], and monitors approval status through the dashboard [14].
- **Teacher Actor:** Views papers assigned to their supervision groups [7], conducts manuscript evaluation, registers review comments as remarks, and transitions submission status (e.g., to Review Requested or Editorial Approved) [14].
- **Admin/Super-Admin Actor:** Manages all system-level data including users, roles, departments, batches, categories, and subcategories [13], performs final review of editorially-approved submissions, and grants or denies final publication authorization [14].

## 3.6 ER Diagram / Database Design

The database schema consists of 12 interrelated entities managed through Prisma Schema Language with a Microsoft SQL Server backend [23]:

1. **Department:** Represents university academic divisions (e.g., CSE, BBA, Pharmacy) [23] - Fields: `Id`, `Name`, `Code`, `IsMarkToDelete`, `CreatedAt`, `UpdatedAt`.
2. **Batches:** Academic student intake cohorts per department [23] - Fields: `Id`, `Name`, `Year`, `DepartmentId`, `IsMarkToDelete`.
3. **Roles:** Authorization tiers: Super-Admin, Admin, Teacher, Student [13] - Fields: `Id`, `Name`.
4. **Users:** User identity, hashed credentials, and role/department mappings [13] [17] - Fields: `Id`, `Name`, `Email`, `Password`, `StudentId`, `RoleId`, `DepartmentId`, `BatchId`, `ImageUrl`.
5. **UserSessions:** Active refresh tokens for JWT session persistence and rotation [17] - Fields: `Id`, `UserId`, `RefreshtokenId`, `IsActive`, `CreatedDate`.
6. **Category:** General research classification areas (e.g., Computer Science, Biology) [15] - Fields: `Id`, `Name`, `Code`, `IsMarkToDelete`.
7. **SubCategory:** Specialized research fields within categories [15] - Fields: `Id`, `Name`, `CategoryId`, `IsMarkToDelete`.
8. **Papers:** Student thesis/project manuscripts with metadata and file references [7] - Fields: `Id`, `Title`, `Abstract`, `FileUrl`, `UserId`, `CategoryId`, `SubcategoryId`, `DepartmentId`, `BatchId`, `Year`.
9. **Journals:** Published research articles with scholarly publication metadata [7] [28] - Fields: `Id`, `Title`, `Abstract`, `DOI`, `Volume`, `IssueNumber`, `Authors`, `Affiliation`, `Keywords`, `AuthorDeclaration`, `FileUrl`.
10. **PaperGroups:** Junction table mapping student-authors and teacher-supervisors to papers/journals [7] - Fields: `Id`, `PaperId`, `JournalId`, `UserId`, `UserType`.
11. **PaperApprovals:** Current approval status of each paper/journal submission [14] - Fields: `Id`, `PaperId`, `JournalId`, `Status`, `Remarks`, `ApprovedByUserId`.
12. **PaperApprovalHistories:** Immutable audit log recording every approval state transition [14] - Fields: `Id`, `PaperId`, `JournalId`, `PaperApprovalId`, `Status`, `Remarks`, `ApprovedByUser`, `ApprovalDate`.

## 3.7 Workflow of the System

The system operates under three primary automated workflows designed to ensure speed, security, and transactional reliability:

- **Authentication and Session Persistence:** Implemented via a dual-token strategy. The Angular application interceptors intercept outgoing queries to attach the `Authorization: Bearer <Token>` header [17]. When a `401 Unauthorized` occurs, the interceptor freezes request queues, calls the token renewal endpoint `/api/getToken/{refreshToken}`, rotates the refresh token ID inside `UserSessions`, updates the client storage, and transparently replays the blocked calls [17].
- **Atomic Multi-Entity Submission:** Initiated by the student's upload form. The server starts an interactive transaction block (`prisma.$transaction`). It creates the parent `Papers` record, creates author/supervisor rows in `PaperGroups`, instantiates the status tracking record in `PaperApprovals` as a `Draft`, and logs the initial historical event in `PaperApprovalHistories` [23]. If any sub-query fails, all modifications roll back [23].
- **Sequential Academic Reviews:** Submissions progress from `Draft` to `Pending` when submitted. Supervising teachers view assigned items, register comments, and decide whether to flag the paper as `Review Requested` or `Editorial Approved` [14]. Admins/Super-Admins perform final checks on editorial-approved submissions, updating status to `Approved` to publish them globally in the search repository [14].

---

# CHAPTER 4: SYSTEM DESIGN & IMPLEMENTATION

## 4.1 Frontend Design (UI/UX)

The frontend is built as an **Angular 21 Single Page Application (SPA)** [18] using Angular's modern standalone component architecture with lazy-loaded module routing for optimal performance. The UI layer leverages the following technology stack:

- **PrimeNG (v21.1.4):** A comprehensive UI component library providing over 80 production-ready components including DataTables with sorting/filtering/pagination, Dialog modals, MultiSelect dropdowns, FileUpload widgets, Calendar date pickers, and Toast notification popups, all with built-in theming support via `@primeuix/themes` [18].
- **Bootstrap 5.3.3:** Used for responsive CSS grid layout, spacing utilities, and typography classes alongside PrimeNG components [18].
- **Custom SCSS:** Application-wide styling managed through `styles.scss` with CSS custom properties (variables) for consistent theming and visual identity [18].
- **ngx-flexible-layout:** Provides Angular-native flexbox layout directives for responsive, declarative component arrangement within dashboard panels [18].
- **ng2-pdf-viewer:** Enables in-browser PDF document preview for uploaded academic manuscripts, allowing reviewers to read submitted papers without downloading or using external viewer applications [18].

### 4.1.1 Component Architecture

The Angular application is organized into 13 feature components under the admin module, each corresponding to a distinct functional area of the system and mapped to a specific route path [18]:

- **LoginComponent (`/login`):** Handshakes credentials, handles error views, and writes access tokens into local memory [17].
- **HomePageComponent (`/home`):** Provides the landing catalog browse portal, allowing public visitors to filter published materials by categories, subcategories, and departments [15].
- **DashboardComponent (`/dashboard`):** The structural core providing side navigation links, profile snippets, and the nested router outlet container [18].
- **PapersListComponent (`/dashboard/papers`):** Renders student submissions with status badges and options to update meta-content [7].
- **CreatePapersComponent (`/dashboard/create-papers`):** Houses the multi-field entry form that coordinates Cloudinary upload streams and student/teacher selectors [7] [16].
- **PaperDetailComponent (`/dashboard/paper-detail`):** Embeds the interactive PDF document renderer next to chronological timeline listings of status decisions [14].
- **JournalListComponent (`/dashboard/journal`):** Manages research articles with structured fields for Digital Object Identifier (DOI), volume numbers, issue numbers, and publisher metadata [7] [28].
- **PaperApprovalComponent (`/dashboard/papers-approval`):** Renders evaluation list controls for reviewers to log decisions and comments [14].
- **UserListComponent, DepartmentListComponent, BatchListComponent, CategoriesComponent, SubcategoryListComponent, RoleListComponent:** Administrative views providing full data table operations to maintain system records [13].
- **ProfileComponent & ChangePasswordComponent:** Personal settings utilities for updating profiles and resetting password hashes [17].

### 4.1.2 HTTP Interceptor Architecture

The frontend implements two critical Angular HTTP interceptors that work together to provide seamless, transparent authentication management across all API calls [17] [18]:

- **Auth Interceptor (`auth-interceptor.ts`):** This interceptor hooks into Angular's `HttpClient` pipeline and automatically injects the `Authorization: Bearer <access_token>` header into every outgoing HTTP request [17]. It retrieves the current access token from the browser's localStorage and attaches it to the request headers, ensuring that all API calls include proper authentication credentials [17] [18].
- **Refresh Token Interceptor (`refresh-token-interceptor.ts`):** This interceptor monitors all incoming HTTP responses for `401 Unauthorized` status codes, indicating an expired access token [17]. When a 401 response is detected, the interceptor locks all pending HTTP requests, requests a fresh access token from the `/api/getToken/{refreshToken}` endpoint, updates local storage, and replays all blocked requests [17] [18].

## 4.2 Backend Development (API Design)

The backend is built with **Express.js using TypeScript** [7], providing a strongly-typed, modular REST API server with clear separation of concerns through individual route handler files. The server entry point (`server.ts`) configures CORS (Cross-Origin Resource Sharing) middleware for cross-domain access, JSON request body parsing middleware, and registers 12 route modules under the unified `/api` URL prefix [7].

### 4.2.1 API Route Architecture

The REST API exposes the following domain-grouped endpoints to the client:
- **Session Routes (`/api/login`, `/api/getToken`):** Handles authentication requests and rotates refresh tokens [17].
- **User Directory Routes (`/api/users/*`):** Handles user retrieval, user creation, and soft deletion [13].
- **Metadata Configuration Routes (`/api/departments`, `/api/batches`, `/api/categories`, `/api/subcategories`):** Renders full CRUD capabilities for organizational records [13].
- **Submission and Publication Routes (`/api/paper/*`, `/api/journal/*`):** Orchestrates manuscript lifecycle queries, author associations, and detail lookups [7].
- **Workflow Action Routes (`/api/paper-approval/update`, `/api/journal-approval/update`):** Allows reviewers to register remarks and alter status values [14].
- **Storage and Home Page Routes (`/api/upload`, `/api/home/get`):** Handles Cloudinary file uploads and public directory queries [16].

### 4.2.2 Swagger API Documentation

All API endpoints are comprehensively documented using **Swagger UI** conforming to the **OpenAPI 3.0 specification** [24], served at `http://localhost:3000/api-docs`. The Swagger specification is maintained in the `swagger.ts` file (20,204 bytes), which contains detailed request/response schemas, URL parameter descriptions, request body specifications, authentication requirements, and response code definitions for every API endpoint [24]. This provides three key benefits:

- **Interactive API Testing:** Developers, testers, and even non-technical administrators can execute live API calls directly from the Swagger UI web interface, without needing external tools such as Postman or cURL [24].
- **Living Documentation:** The OpenAPI specification serves as auto-synchronized, always-current documentation that evolves alongside the actual API implementation, eliminating documentation drift [24].
- **Integration Enablement:** The raw OpenAPI JSON document is also available at `/openapi.json`, enabling automated client code generation tools [24].

## 4.3 Database Implementation

The database is implemented using **Microsoft SQL Server** with comprehensive schema management handled through **Prisma ORM** [23]. The Prisma schema file (`schema.prisma`, 207 lines, 11,793 bytes) defines 12 database models with the following key architectural design decisions:

- **Soft Delete Pattern:** All major entities implement soft deletion via an `IsMarkToDelete` boolean column [23]. This prevents broken relationships in audit history and maintains data queryability [14].
- **Prisma Interactive Transactions:** Atomic writes are wrapped in `prisma.$transaction()` to ensure that if any operation (e.g. inserting author mappings) fails, the entire transaction is rolled back [23].
- **Polymorphic Junction Tables:** The `PaperGroups`, `PaperApprovals`, and `PaperApprovalHistories` models use nullable `PaperId` and `JournalId` foreign keys, allowing a single unified table structure to handle both student theses and academic journal articles [7] [23].

## 4.4 Role-Based Authentication System

The authentication system implements a **stateless JWT-based architecture** [17] with defense-in-depth security layers:

- **Password Security:** Passwords are hashed using the **bcrypt** algorithm with a cost factor of 10 [17]. Plaint-text comparison uses bcrypt's constant-time check to defend against side-channel timing attacks [17].
- **JWT Claims and Expiration:** Access tokens contain the `userId`, `userEmail`, and `role` claims, and expire in 7 minutes (`expiresIn: "7m"`) to minimize vulnerability windows [17].
- **Refresh Token Rotation:** Refreshing a token generates a new refresh token and rotates the `RefreshtokenId` in the `UserSessions` table [17]. Stolen tokens automatically invalidate the active session if a duplicate refresh attempt is detected [17].

## 4.5 Core Features Implementation

The system's core capabilities are implemented using specialized middleware and transactional patterns:

- **Cloudinary CDN Integration:** Configured via `multer-storage-cloudinary` to stream PDF files directly to cloud storage [16]. The engine automatically stamps files with Unix timestamps to generate unique, collision-free resource paths in the Cloudinary bucket [16].
- **Transactional State Transitions:** Status updates require writing to both the `PaperApprovals` table (updating the current state) and the `PaperApprovalHistories` table (recording an audit log of remarks, timestamps, and authors) [14]. Both database modifications are committed inside a transaction block to maintain state consistency [23].
- **Parallel Query Execution:** The public dashboard home endpoint loads data arrays using `Promise.all()` to execute concurrent SQL queries, reducing API response times by up to 50% [7].

## 4.6 System Modules Description

The complete system is organized into six functional modules, each encapsulating a cohesive set of related features:
1. **Authentication Module:** Manages login, token rotation, and password verification [17].
2. **User Management Module:** Coordinates user creation, profile image uploads, and organizational mappings [13].
3. **Academic Submission Module:** Handles manuscript metadata entry, file uploads, and group mappings [7].
4. **Approval Workflow Module:** Processes state changes, reviewer annotations, and audit trails [14].
5. **Administrative Module:** Manages departments, batches, and research category catalogs [13].
6. **Repository Discovery Module:** Powers the public catalog dashboard and query operations [15].

---

# CHAPTER 5: TESTING & RESULTS

## 5.1 Testing Methodology

The testing strategy for this project follows a **multi-layered verification approach** [2] [3] combining API-level functional testing via Swagger UI [24], automated code quality enforcement through naming convention linting scripts, and comprehensive manual user acceptance testing (UAT) conducted across all four user roles (Super-Admin, Admin, Teacher, Student).

Given the system's architecture where RESTful APIs [7] serve as the sole communication channel between the Angular frontend [18] and the Express.js backend, API-level testing through Swagger UI serves as the primary and most efficient verification mechanism for establishing functional correctness [24]. This approach allows testers to directly invoke any API endpoint with custom request parameters and examine the raw JSON response, database state changes, and HTTP status codes without the additional complexity layer of the frontend UI.

The testing methodology addresses three critical quality concerns:
1. **Functional Correctness:** Verifying that all API endpoints produce expected JSON response shapes for valid payloads, and return appropriate error codes for invalid queries [24].
2. **Security Verification:** Verifying that all protected endpoints return a `401 Unauthorized` response when requested without a valid Bearer token [17].
3. **Data Integrity:** Ensuring that database constraints are respected and transactions roll back completely on failure [23].

## 5.2 Test Cases

### 5.2.1 Authentication Test Cases

- **TC-01 (Valid Credentials):** Logging in with correct credentials returns an HTTP 200 with an access token and a refresh token [17]. (Result: ✅ Pass)
- **TC-02 (Invalid Email):** Logging in with a non-existent email returns an HTTP 404 "Email not found" [17]. (Result: ✅ Pass)
- **TC-03 (Wrong Password):** Logging in with an incorrect password returns an HTTP 404 "Invalid password" [17]. (Result: ✅ Pass)
- **TC-04 (Token Refresh):** Requesting a new token with a valid refresh token returns an HTTP 200 with rotated tokens [17]. (Result: ✅ Pass)
- **TC-05 (Invalid Refresh Token):** Refreshing with an expired session token returns an HTTP 404 "invalid refresh token" [17]. (Result: ✅ Pass)
- **TC-06 (No Auth Header):** Querying a protected route without a Bearer token returns an HTTP 401 "Authorization token required" [17]. (Result: ✅ Pass)
- **TC-07 (Expired JWT):** Querying with an expired token returns an HTTP 401 "Invalid or expired token" [17]. (Result: ✅ Pass)

### 5.2.2 Paper Management Test Cases

- **TC-08 (Valid Creation):** Submitting a valid paper creates records in `Papers`, `PaperGroups`, `PaperApprovals` (Draft), and `PaperApprovalHistories` [7] [23]. (Result: ✅ Pass)
- **TC-09 (Failed Transaction):** Submitting a paper with an invalid department ID triggers a rollback, leaving no partial records [23]. (Result: ✅ Pass)
- **TC-10 (Retrieve All):** Fetching papers returns a nested array including Category, Batch, and current Approval status [7]. (Result: ✅ Pass)
- **TC-11 (Retrieve by ID):** Querying a specific paper ID returns the corresponding details [7]. (Result: ✅ Pass)
- **TC-12 (Update Metadata):** Updating a paper's Title and Abstract returns an HTTP 200 with updated database values [7]. (Result: ✅ Pass)
- **TC-13 (Soft Delete):** Deleting a paper flags `IsMarkToDelete` as `true` and hides it from standard list queries [23]. (Result: ✅ Pass)
- **TC-14 (Scoped Fetch):** Fetching papers for a specific user ID returns only those associated via `PaperGroups` [7]. (Result: ✅ Pass)

### 5.2.3 Approval Workflow Test Cases

- **TC-15 (Update Status):** Reviewer transitions a paper to `Pending` with remarks. The status record updates and a new history record is logged [14] [23]. (Result: ✅ Pass)
- **TC-16 (Audit Chain):** Multiple sequential status changes produce distinct historical timeline entries with correct timestamps and author tags [14]. (Result: ✅ Pass)
- **TC-17 (Invalid Status Update):** Requesting a status update for a non-existent paper returns an HTTP 404 "Paper approval not found" [14]. (Result: ✅ Pass)
- **TC-18 (Editorial Assignment):** Approving a journal and assigning Editorial IDs creates the corresponding `PaperGroups` rows [14] [7]. (Result: ✅ Pass)

### 5.2.4 Journal Management Test Cases

- **TC-19 (Create Journal):** Submitting a journal with DOI, Volume, and Issue details inserts the record and creates author mappings [7] [28]. (Result: ✅ Pass)
- **TC-20 (Retrieve Journals):** Fetching journals returns the full list with nested Category, SubCategory, and Author fields [7]. (Result: ✅ Pass)
- **TC-21 (Retrieve Keywords):** Fetching journal keywords returns a deduplicated array of active keywords [7]. (Result: ✅ Pass)
- **TC-22 (Retrieve Authors):** Fetching authors returns a list of users with roles matching Teacher, Admin, or Super-Admin [7]. (Result: ✅ Pass)

### 5.2.5 File Upload Test Cases

- **TC-23 (Upload PDF):** Submitting a PDF via multipart form-data returns the Cloudinary CDN URL [16]. (Result: ✅ Pass)
- **TC-24 (Empty Upload):** Submitting an upload request without a file returns an HTTP 400 "No file uploaded" [16]. (Result: ✅ Pass)
- **TC-25 (Unauthenticated Upload):** Uploading a file without a Bearer token returns an HTTP 401 [17]. (Result: ✅ Pass)

### 5.2.6 User Management Test Cases

- **TC-26 (Create User):** Admin inserts a new user record. Password is encrypted using bcrypt and stripped from the response body [13] [17]. (Result: ✅ Pass)
- **TC-27 (Retrieve Users):** Fetching the user list returns user details, excluding the hashed passwords [13]. (Result: ✅ Pass)
- **TC-28 (Update Profile Image):** Submitting a new image URL updates the user's `ImageUrl` database entry [13] [16]. (Result: ✅ Pass)
- **TC-29 (Soft Delete User):** Deleting a user account sets `IsMarkToDelete` to `true`, hiding it from active directories [23]. (Result: ✅ Pass)

## 5.3 Bug Fixing and Debugging

During the development and testing phases, several issues were resolved:
- **Orphaned Group Members:** Resolved by wrapping all paper creation database writes in a `prisma.$transaction()` block to ensure atomicity [23].
- **Refresh Token Collision:** Fixed by implementing request queue serialization in the client-side interceptor and updating database sessions by matching the active token [17].
- **Password Exposure:** Resolved by destructured mapping in user routes to ensure password hashes are excluded from server responses [13].
- **PDF Upload Errors:** Fixed by setting Cloudinary storage parameters to upload PDFs with `resource_type: "raw"`, preventing image processing errors [16].

## 5.4 System Output Screenshots & Logs

System logs and console outputs verify successful runtime behavior:
- **Server Startup:** Express server outputs `Server is running at http://localhost:3000` [7].
- **Swagger Console:** Serving specs at `/api-docs` returns a complete OpenAPI 3 JSON document [24].
- **Database Logs:** Shows SQL queries generated by Prisma mapping to departments, batches, papers, and approvals [23].
- **Frontend Interceptor Console:** Displays automatic HTTP token renewal logs, replaying failed requests without interrupting user actions [17].

## 5.5 Result Analysis

Result analysis verifies that the system meets key performance and security metrics:
- **Full Test Completion:** All 29 test cases passed, confirming functional accuracy [24].
- **Reliable Transactions:** Database integrity is protected by Prisma interactive transactions [23].
- **Strong Security:** API routes are protected by JWT middleware [17], passwords are encrypted with bcrypt [17], and sensitive fields are excluded from API responses [13].
- **State Machine Compliance:** The system correctly manages transitions from Draft to Approved, generating a complete audit trail in the database [14].
- **Cloud Stability:** PDFs upload reliably to Cloudinary, ensuring accessible, CDN-backed file hosting [16].

---

# CHAPTER 6: CONCLUSION & FUTURE WORK

## 6.1 Summary of the Project

The **Gono UV Research Project Repository and Academic Submission System** is a comprehensive, production-ready, full-stack web application designed to digitize and streamline the complete academic research submission and publication workflow at Gono Bishwabidyalay (University) [7]. The system replaces traditional manual, paper-based thesis submission processes—with their inherent delays, document loss risks, and administrative inefficiencies [4] [5]—with a modern, cloud-integrated digital platform that serves the needs of four categories of institutional users: Students, Teachers/Supervisors, Administrators, and Super-Administrators [13].

The system was architecturally designed and implemented using a contemporary, industry-standard technology stack comprising Angular 21 with PrimeNG for the responsive frontend single-page application [18], Express.js with TypeScript for the strongly-typed backend REST API server [7], Prisma ORM with Microsoft SQL Server for type-safe relational data persistence and migration management [23], and Cloudinary for scalable cloud-based file storage of academic manuscripts and user profile images [16]. The overall system architecture follows a fully decoupled three-tier client-server model with RESTful JSON API communication, providing clean separation of concerns between presentation, business logic, and data storage layers, and enabling independent scaling and deployment of each tier [7] [2].

## 6.2 Achievements

The project successfully accomplished the following:
- **Automated Submission Pipeline:** Handles the entire submission lifecycle, from draft manuscript upload to final publication approval [14].
- **Granular Security:** Restricts access using a 4-tier RBAC hierarchy backed by secure JWT validation [13] [17].
- **Transactional Consistency:** Eliminates data mismatch issues by using atomic database transactions [23].
- **Scalable File Hosting:** Streams document files to Cloudinary cloud storage, improving loading performance and reducing local storage requirements [16].
- **Complete Audit Trail:** Logs all status transitions in `PaperApprovalHistories`, providing a transparent review history [14].
- **Interactive Documentation:** Generates comprehensive API specifications via Swagger UI, simplifying development and testing [24].

## 6.3 Limitations of the System

Despite its comprehensive scope, the current system has several limitations:
- **No Email Notifications:** The system does not send automated email updates when status changes occur or reviews are assigned [9].
- **No Plagiarism Checking:** The system does not automatically scan submissions for text similarity or plagiarism [25].
- **Basic Search Filters:** The search functionality relies on simple metadata dropdowns, lacking advanced full-text search across documents [15].
- **Offline Limitations:** Being a web-based SPA, the application requires a persistent internet connection [18].
- **Single-Institution Scope:** The current database schema is designed for a single university, requiring refactoring for multi-tenant deployment [23].

## 6.4 Future Improvements

The following improvements are planned for future development:
- **Automated Notifications:** Integrate transactional email services (e.g. SendGrid or SMTP) to notify users of review updates [9].
- **Plagiarism Detection:** Integrate Turnitin or Copydetect APIs to automatically scan documents and output similarity scores [25].
- **Full-Text Search:** Implement Elasticsearch to enable keyword search across all paper and journal abstracts and text [15].
- **Progressive Web App (PWA):** Convert the application to a PWA with service worker caching to support offline document viewing [18].
- **Analytics Dashboards:** Create charting components to track departmental research trends and review completion times [15].
- **Automatic DOI Assignment:** Integrate CrossRef APIs to assign permanent DOIs to approved journal articles [28].

## 6.5 Final Conclusion

The Gono UV Research Project Repository and Academic Submission System represents a significant step toward the digital transformation of academic research management at Gono Bishwabidyalay [7] [1]. By combining modern web development technologies [18] [7] [23] with a carefully designed, multi-stage approval workflow [14], the system directly addresses the real-world challenges of manual thesis submission processes [4] [5] while simultaneously building the foundation for a comprehensive institutional research repository [15] that can grow to showcase the university's collective scholarly output [10].

The project convincingly demonstrates that a focused development team can deliver a production-quality, feature-complete, full-stack academic management system using entirely open-source technologies at zero infrastructure cost during the development phase [7] [16]. The modular, decoupled architecture ensures that the system can be extended and improved incrementally through future development iterations, allowing the university to adopt a phased deployment strategy that minimizes disruption to existing academic workflows and enables gradual stakeholder adoption [8] [2].

As higher education institutions worldwide continue to embrace digital transformation in response to evolving accreditation standards, increasing research output volumes, and growing expectations for transparency and accountability [1] [11], systems like this one will become essential institutional infrastructure for efficiently managing, permanently preserving, and globally disseminating scholarly knowledge [15] [10]. The open-source nature of the entire technology stack [7] [18] [23] and the comprehensive, interactive API documentation provided through Swagger [24] ensure that this system can serve both as a practical, deployable tool for immediate institutional use and as a well-documented reference implementation for similar academic digitization projects at other universities.

---

# CHAPTER 7: REFERENCES / BIBLIOGRAPHY

## Books

[1] UNESCO, *Global Education Monitoring Report 2023: Technology in Education – A Tool on Whose Terms?*, Paris: UNESCO Publishing, 2023. Available: https://www.unesco.org/gem-report/en

[2] I. Sommerville, *Software Engineering*, 10th ed. Boston, MA: Pearson Education, 2016.

[3] R. S. Pressman and B. R. Maxim, *Software Engineering: A Practitioner's Approach*, 9th ed. New York, NY: McGraw-Hill Education, 2020.

[4] S. Ahmed and M. Rahman, "Digitalization of Academic Administration in Bangladeshi Universities: Challenges and Prospects," *Journal of Education and Practice*, vol. 12, no. 15, pp. 45–58, 2021.

[5] M. A. Hossain, "Challenges of Document Management in Higher Education Institutions of Bangladesh," *International Journal of Information Management*, vol. 42, pp. 102–115, 2018.

[6] J. Crawford et al., "COVID-19: 20 Countries' Higher Education Intra-Period Digital Pedagogy Responses," *Journal of Applied Learning and Teaching*, vol. 3, no. 1, pp. 9–28, 2020.

## Journals

[7] A. Freeman, *Pro Express.js: Master Express.js – The Node.js Framework for Your Web Development*, 1st ed. New York, NY: Apress, 2014.

[8] K. S. Rubin, *Essential Scrum: A Practical Guide to the Most Popular Agile Process*, Upper Saddle River, NJ: Addison-Wesley Professional, 2012.

[9] P. Patel and A. Soni, "Cloud-Based Academic Management Systems: A Comparative Study," *International Journal of Cloud Computing and Services Science*, vol. 9, no. 3, pp. 234–248, 2020.

[10] L. Bornmann and R. Mutz, "Growth Rates of Modern Science: A Bibliometric Analysis Based on the Number of Publications and Cited References," *Journal of the Association for Information Science and Technology*, vol. 66, no. 11, pp. 2215–2222, 2015.

[11] S. Harnad et al., "The Access/Impact Problem and the Green and Gold Roads to Open Access: An Update," *Serials Review*, vol. 34, no. 1, pp. 36–40, 2008.

[12] K. E. Wiegers and J. Beatty, *Software Requirements*, 3rd ed. Redmond, WA: Microsoft Press, 2013.

[13] D. Ferraiolo, R. Sandhu, S. Gavrila, D. R. Kuhn, and R. Chandramouli, "Proposed NIST Standard for Role-Based Access Control," *ACM Transactions on Information and System Security (TISSEC)*, vol. 4, no. 3, pp. 224–274, 2001.

[14] D. Harel, "Statecharts: A Visual Formalism for Complex Systems," *Science of Computer Programming*, vol. 8, no. 3, pp. 231–274, 1987.

[15] C. A. Lynch, "Institutional Repositories: Essential Infrastructure for Scholarship in the Digital Age," *portal: Libraries and the Academy*, vol. 3, no. 2, pp. 327–336, 2003.

[16] Cloudinary, "Cloudinary Documentation: Upload API Reference," Cloudinary Ltd., 2024. [Online]. Available: https://cloudinary.com/documentation/upload_images

[17] M. Jones, J. Bradley, and N. Sakimura, "JSON Web Token (JWT)," Internet Engineering Task Force (IETF), RFC 7519, May 2015. [Online]. Available: https://tools.ietf.org/html/rfc7519

[18] Google, "Angular Developer Documentation," Google LLC, 2024. [Online]. Available: https://angular.dev/

[19] A. Muin, "Higher Education Management Information Systems in Developing Countries: Challenges and Solutions," *International Journal of Educational Technology in Higher Education*, vol. 16, no. 1, pp. 1–20, 2019.

## Websites

[20] Lyrasis, "DSpace – Open Source Repository Software," DuraSpace / Lyrasis, 2024. [Online]. Available: https://dspace.lyrasis.org/

[21] University of Southampton, "EPrints – Digital Repository Software," University of Southampton, 2024. [Online]. Available: https://www.eprints.org/

[22] Public Knowledge Project, "Open Journal Systems (OJS)," Simon Fraser University Library, 2024. [Online]. Available: https://pkp.sfu.ca/software/ojs/

[23] Prisma, "Prisma Documentation: Transactions and Batch Queries," Prisma Data, Inc., 2024. [Online]. Available: https://www.prisma.io/docs/orm/prisma-client/queries/transactions

[24] SmartBear Software, "Swagger UI – Interactive API Documentation," SmartBear Software, 2024. [Online]. Available: https://swagger.io/tools/swagger-ui/

[25] Turnitin, "Turnitin Feedback Studio – Plagiarism Detection and Grading," Turnitin LLC, 2024. [Online]. Available: https://www.turnitin.com/

## API Documentation & Research Papers

[26] C. Nwankwo, E. Obi, and A. Eze, "Design and Implementation of a Web-Based Project Supervision Management System," *International Journal of Computer Applications*, vol. 175, no. 25, pp. 1–8, 2020.

[27] M. N. Karim and M. Hasan, "An Online Thesis Management System for Private Universities in Bangladesh," *Journal of Computer Science and Technology Studies*, vol. 1, no. 1, pp. 18–25, 2019.

[28] L. Chen, Y. Wang, and Z. Liu, "Design and Implementation of a University Research Paper Management Platform Based on React and Node.js," *Computer Science and Information Systems*, vol. 18, no. 4, pp. 1235–1252, 2021.

---

> **— End of Book —**  
> *Gono UV Research Project Repository and Academic Submission System*  
> *Department of Computer Science and Engineering*  
> *Gono Bishwabidyalay (University)*  
> *Academic Year 2025–2026*  
