# FlowOps Studio OS v2 — Master Architecture

This document contains the Master System Architecture diagram for FlowOps Studio OS v2.
It represents the complete operating system, including the control layer, workflows, roles, integrations, and the Notion data layer.

```mermaid
graph TB
    %% STYLES
    classDef system fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#f8fafc;
    classDef workflow fill:#1e1b4b,stroke:#8b5cf6,stroke-width:2px,color:#f8fafc;
    classDef role fill:#172554,stroke:#3b82f6,stroke-width:2px,color:#93c5fd;
    classDef roleDana fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#6ee7b7;
    classDef database fill:#451a03,stroke:#f59e0b,stroke-width:2px,color:#fde68a;
    classDef integration fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
    classDef gate fill:#7f1d1d,stroke:#ef4444,stroke-width:2px,color:#fca5a5;

    %% ROLES SUBGRAPH
    subgraph Roles["👥 Core Team / Roles"]
        Alex["Alex<br>(Strategist)"]
    class Alex role
        Blake["Blake<br>(Systems Architect)"]
    class Blake role
        Chris["Chris<br>(Full Stack Engineer)"]
    class Chris role
        Dana["Dana<br>(Operator & Write Authority)"]
    class Dana roleDana
    end

    %% CONTROL LAYER
    subgraph Control["🧠 Execution Control System"]
        Triggers["Command Triggers"]
    class Triggers system
        StateMachine["State Machine"]
    class StateMachine system
        Context["Context Control<br>(Project Memory)"]
    class Context system
        Radar["Opportunity Radar<br>(Discovery Engine)"]
    class Radar system
    end

    %% EXTERNAL SOURCES
    subgraph Sources["🌍 External Sources"]
        Reddit["Reddit"]
        ProductHunt["Product Hunt"]
        HackerNews["Hacker News"]
        IndieHackers["Indie Hackers"]
        AITools["AI Tool Directories"]
    end

    %% INTEGRATIONS
    subgraph Integrations["🔌 Integrations"]
        NotebookLM["NotebookLM MCP<br>(Research)"]
    class NotebookLM integration
        GitHub["GitHub<br>(Version Control)"]
    class GitHub integration
        Vercel["Vercel<br>(Deployment)"]
    class Vercel integration
    end

    %% WORKFLOWS
    subgraph Workflows["🔄 Core Workflows"]
        Ideas["IDEA WORKFLOW<br>(Capture & Score)"]
    class Ideas workflow
        Scan["OPPORTUNITY SCAN<br>(Identify & Classify)"]
    class Scan workflow
        Research["RESEARCH WORKFLOW<br>(Deep Dives)"]
    class Research workflow
        Evaluate["EVALUATE WORKFLOW<br>(Alex → Blake → Chris → Dana)"]
    class Evaluate workflow
        Prototype["PROTOTYPE WORKFLOW<br>(Design → Build → Deploy)"]
    class Prototype workflow
        Website["CREATE WEBSITE WORKFLOW<br>(Strategy → Design → Build)"]
    class Website workflow
    end

    %% NOTION DATA LAYER
    subgraph NotionData["🗄️ Notion Data Layer (Dana Only)"]
        DB1[("💡 Idea Vault")]
    class DB1 database
        DB2[("🔬 Research Library")]
    class DB2 database
        DB3[("📊 Product Evaluations")]
    class DB3 database
        DB4[("⚙️ Automation Specs")]
    class DB4 database
        DB5[("🧪 Prototype Projects")]
    class DB5 database
        DB6[("🌐 Website Projects")]
    class DB6 database
        DB7[("📖 SOP Library")]
    class DB7 database
        
        %% Relations
        DB1 -.-> |Related| DB3
        DB1 -.-> |Related| DB4
        DB3 -.-> |Related| DB4
        DB3 -.-> |Related| DB5
        DB4 -.-> |Linked| DB5
        DB5 -.-> |Linked| DB6
    end

    %% HUMAN GATE
    Gate{"Human Approval Gate<br>(Required to Proceed/Write)"}
    class Gate gate

    %% FLOWS
    Sources -->|Pain/Signal| Radar
    Radar -->|Trigger| Scan
    Scan -->|Extract/Classify| Ideas
    Triggers -->|User Commands| StateMachine
    StateMachine <--> Context
    StateMachine --> Workflows
    
    Workflows --> Gate
    Gate -->|1. Approve| Dana
    Gate -->|2. Revise| Workflows
    Gate -->|3. Stop| StateMachine

    Dana -->|Creates/Updates| NotionData
    
    Research <--> NotebookLM
    Prototype --> Vercel
    Website --> GitHub
    Website --> Vercel
    
    Alex -.-> |Strategy/Score| Evaluate
    Alex -.-> |Strategy| Website
    Blake -.-> |Architecture| Evaluate
    Blake -.-> |Interaction| Prototype
    Blake -.-> |Design System| Website
    Chris -.-> |Feasibility| Evaluate
    Chris -.-> |Build| Prototype
    Chris -.-> |Build| Website
    Dana -.-> |Specs/Records| Workflows

    %% FLEXIBILITY NOTE
    classDef note fill:#1f2937,stroke:#9ca3af,stroke-width:1px,color:#e5e7eb;
    Note["💡 Project Flexibility:<br>Linear paths not required.<br>Ex: Idea → Evaluate → Prototype<br>OR just Website → Build"]
    class Note note
    Note -.-> NotionData
```
