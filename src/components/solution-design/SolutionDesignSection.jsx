"use client";

import { useMemo, useState } from "react";
import { Network } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import RevealSection from "@/components/RevealSection";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import RoleArchitectureMap from "./RoleArchitectureMap";
import WorkflowExecutionPanel from "./WorkflowExecutionPanel";
import { DEFAULT_WORKFLOW_ID, FLOWOPS_ROLES, FLOWOPS_WORKFLOWS } from "./solutionDesignData";
import styles from "./SolutionDesignSection.module.css";

export default function SolutionDesignSection() {
  const { language } = useLanguage();
  const [activeWorkflowId, setActiveWorkflowId] = useState(DEFAULT_WORKFLOW_ID);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const activeWorkflow = useMemo(
    () => FLOWOPS_WORKFLOWS.find((workflow) => workflow.id === activeWorkflowId) ?? FLOWOPS_WORKFLOWS[0],
    [activeWorkflowId],
  );
  const selectedRole = useMemo(
    () => FLOWOPS_ROLES.find((role) => role.id === selectedRoleId) ?? null,
    [selectedRoleId],
  );

  const copy = {
    en: {
      title: "Solution Architecture Engine",
      description: "Detected opportunities are routed to specialist AI agents, matched with skills, and activate across workflows to design and assemble solution systems.",
    },
    th: {
      title: "เอนจินสถาปัตยกรรมโซลูชัน",
      description: "โอกาสที่ตรวจพบจะถูกส่งต่อไปยังเอเจนต์ AI ผู้เชี่ยวชาญ จับคู่กับทักษะที่เหมาะสม และเปิดใช้งานข้ามเวิร์กโฟลว์เพื่อออกแบบและประกอบระบบโซลูชัน",
    },
  }[language];

  return (
    <RevealSection>
      <section id="blueprint" className={styles.section}>
        <SectionAtmosphere />
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Network size={30} />
            </div>
            <h2 className={styles.sectionTitle}>{copy.title}</h2>
            <p className={styles.sectionDescription}>{copy.description}</p>
          </header>

          <div className={styles.sectionBody}>
            <RoleArchitectureMap
              roles={FLOWOPS_ROLES}
              activeRoleIds={activeWorkflow.activeRoleIds}
              activeWorkflowId={activeWorkflowId}
              selectedRole={selectedRole}
              selectedRoleId={selectedRoleId}
              onRoleSelect={setSelectedRoleId}
              onRoleClose={() => setSelectedRoleId(null)}
            />
            <WorkflowExecutionPanel
              workflows={FLOWOPS_WORKFLOWS}
              roles={FLOWOPS_ROLES}
              activeWorkflowId={activeWorkflowId}
              activeWorkflow={activeWorkflow}
              onWorkflowChange={setActiveWorkflowId}
            />
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
