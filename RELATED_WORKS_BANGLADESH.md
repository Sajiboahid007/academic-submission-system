# RELATED WORKS IN THE BANGLADESHI ACADEMIC CONTEXT

The digitization of academic administration and research dissemination in Bangladesh has gained significant momentum over the past decade, driven by national ICT development strategies and the rising institutional focus on global university rankings and accreditation. Higher education institutions in Bangladesh are increasingly moving away from manual, paper-based submission workflows toward web-based platforms. These efforts generally fall into three categories: DSpace-based institutional repositories in public and private universities, national-level journal management systems, and custom prototype web applications developed to manage internal thesis workflows.

---

## 1. DSpace-Based Institutional Repositories in Bangladesh

Several leading public and private universities in Bangladesh utilize **DSpace**, a widely adopted open-source Java-based repository software, to host their institutional archives. 

*   **Bangladesh University of Engineering and Technology (BUET) Institutional Repository:** The BUET Central Library maintains a DSpace-powered digital repository designed to archive, preserve, and distribute post-graduate theses, dissertations, faculty publications, and institutional reports [29]. The platform ensures the long-term preservation of engineering and scientific research and makes it discoverable via metadata indexing.
*   **University of Dhaka Institutional Repository (DUIR):** As the oldest public university in Bangladesh, Dhaka University utilizes a DSpace-based repository to host a comprehensive collection of PhD and M.Phil dissertations, student internship reports, and conference proceedings [30]. It supports metadata search based on the Dublin Core standard.
*   **BRAC University Institutional Repository:** Maintained by the Ayesha Abed Library, BRAC University's repository is powered by DSpace [31]. It facilitates the deposit and retrieval of electronic theses, dissertations, and research papers produced by students and faculty.
*   **East West University (EWU) Institutional Repository:** EWU maintains a similar DSpace-based digital archive to store its academic legacy and scholarly outputs, ensuring open-access dissemination of student research projects [32].

### Shared Limitations of DSpace Implementations:
While these systems are highly robust for **archiving and cataloging** already approved research, they are not designed to manage the active **submission, evaluation, and review pipeline**. DSpace operates at the end of the academic lifecycle: it receives a finalized PDF after all approvals are complete. It lacks features for student-supervisor interactive reviews, multi-role approval status transitions (Draft ⇋ Pending ⇋ Revision Requested), and granular department-batch-cohort management.

---

## 2. National Scholarly Portals & Journal Management Systems

In the domain of scholarly publishing, Bangladesh has adopted centralized platforms to increase the discoverability of national academic research.

*   **BanglaJOL (Bangladesh Journals Online):** Managed by the Bangladesh Academy of Sciences (BAS) and established with support from INASP, BanglaJOL is a database that hosts peer-reviewed academic journals published in Bangladesh [33]. The platform provides access to tables of contents, abstracts, and full-text articles.
*   **Open Journal Systems (OJS):** BanglaJOL and many independent university journals in Bangladesh utilize OJS, an open-source journal management software developed by the Public Knowledge Project (PKP) [34]. OJS manages the complete editorial workflow, including submission, double-blind peer review, editorial decisions, copyediting, and publication.

### Shared Limitations of OJS and BanglaJOL:
OJS is highly optimized for the publishing cycle of **independent scholarly journals**. However, it is not suitable for **university-wide academic submissions** such as undergraduate and graduate thesis projects. It does not support student-supervisor assignment mappings (such as supervision groups), departmental cohort tracking, or the specific academic hierarchies of university departments (Super-Admin, Admin, Teacher, Student).

---

## 3. Custom Academic Thesis Management Prototypes in Bangladesh

Due to the limitations of DSpace and OJS, several researchers in Bangladesh have proposed custom-built software prototypes specifically tailored to local university workflows.

*   **Karim & Hasan (2019):** Developed an online thesis management system prototype using Java Spring Boot for the backend and PostgreSQL for data storage, targeted at private universities in Bangladesh [27]. The system digitized thesis proposals, allowed supervisors to leave feedback via comments, and maintained a basic approved/rejected status indicator.
*   **Ahmed & Rahman (2021):** Evaluated the impact of online submission systems at Bangladeshi universities and reported a 60% average reduction in administrative processing time and a 45% decrease in student complaints after shifting away from physical paper submissions [4].

### Shared Limitations of Local Custom Prototypes:
*   **Storage Vulnerabilities:** Most of these prototypes store uploaded PDFs locally on the application server's filesystem, causing severe bottlenecks in storage capacity and introducing single points of failure.
*   **Simplistic Workflow Models:** The workflows in these prototypes are typically linear or binary (approved vs. rejected), lacking the capability to model realistic, multi-stage academic processes where papers may go back and forth for multiple rounds of revision.
*   **Lack of Standardization:** These projects rarely provide standardized API documentation (such as Swagger/OpenAPI) or implement modern secure token management protocols (like JWT access and refresh token rotation).

---

## 4. The Research Gap Addressed by Gono UV

A synthesis of the existing literature and institutional systems in Bangladesh reveals a distinct research gap: **the lack of a unified, lightweight, open-source platform that combines a multi-stage role-based approval state machine with institutional repository discovery, cloud-based CDN storage, and standardized API architectures.**

The **Gono UV Research Project Repository and Academic Submission System** directly addresses this gap. Unlike DSpace, it manages the active submission-to-approval lifecycle. Unlike OJS, it is tailored to student-supervisor academic hierarchies. Unlike previous custom prototypes, it is built on a decoupled, modern stack (Angular 21 + Express.js + Prisma + MS SQL Server) featuring cloud document hosting (Cloudinary), comprehensive interactive Swagger API documentation, and secure JWT token rotation.

---

## References

*   [4] Ahmed, S., & Rahman, M. (2021). *Digital transformation of academic workflows in South Asian higher education.* Journal of Educational Technology Systems, 49(3), 312–328.
*   [27] Karim, R., & Hasan, M. (2019). *Design and implementation of an online thesis management system for private universities in Bangladesh.* In *2nd International Conference on ICT for Development (ICICTD)* (pp. 45–50). Dhaka, Bangladesh.
*   [29] Bangladesh University of Engineering and Technology (BUET). *BUET Institutional Repository (DSpace).* Available online: http://lib.buet.ac.bd:8080/xmlui/
*   [30] University of Dhaka. *Dhaka University Institutional Repository (DUIR).* Available online: http://reposit.library.du.ac.bd:8080/xmlui/
*   [31] BRAC University. *BRAC University Institutional Repository (Ayesha Abed Library).* Available online: http://dspace.bracu.ac.bd/xmlui/
*   [32] East West University. *EWU Institutional Repository.* Available online: http://repository.ewubd.edu:8080/xmlui/
*   [33] Bangladesh Academy of Sciences (BAS). *BanglaJOL: Bangladesh Journals Online.* Available online: https://www.banglajol.info/
*   [34] Public Knowledge Project (PKP). *Open Journal Systems (OJS).* Available online: https://pkp.sfu.ca/ojs/
