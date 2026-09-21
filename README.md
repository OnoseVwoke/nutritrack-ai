### NutriTrack AI



NutriTrack AI is a containerized nutrition tracking application for recording meals, pantry inventory, weight history, and nutrition dashboard data.



The project is being developed as a full-stack AWS and DevOps portfolio project, with a roadmap toward automated CI/CD, Infrastructure as Code, container orchestration, cloud networking, monitoring, and secure AWS deployment.



### Current Local Architecture

```text
+----------------------+
|       Browser        |
+----------+-----------+
           |
           v
+----------------------+
| React + TypeScript   |
|      Frontend        |
+----------+-----------+
           |
           | HTTP REST API
           v
+----------------------+
| Node.js + Express    |
|       Backend        |
+----------+-----------+
           |
           | SQL
           v
+----------------------+
|     PostgreSQL       |
|      Database        |
+----------------------+
```