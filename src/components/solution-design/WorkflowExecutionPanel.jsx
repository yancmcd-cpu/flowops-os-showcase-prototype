"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import RevealSection from "@/components/RevealSection";
import styles from "./SolutionDesignSection.module.css";

const DESKTOP_ROTATE_MS = 3800;
const DESKTOP_IDLE_RESUME_MS = 12000;

const COPY = {
  en: {
    tabList: "Workflow execution systems",
    title: "Workflow Execution Engine",
    description: "Each workflow activates different specialist roles and skills to assemble the final system.",
    activeRoles: "Active Roles",
    skillsUsed: "Skills Used",
    outputs: "Assembled Outputs",
  },
  th: {
    tabList: "ระบบเวิร์กโฟลว์การดำเนินงาน",
    title: "เอนจินการดำเนินงานเวิร์กโฟลว์",
    description: "แต่ละเวิร์กโฟลว์จะเปิดใช้บทบาทผู้เชี่ยวชาญและทักษะที่แตกต่างกันเพื่อประกอบเป็นระบบสุดท้าย",
    activeRoles: "บทบาทที่ทำงานอยู่",
    skillsUsed: "ทักษะที่ใช้",
    outputs: "ผลลัพธ์ที่ประกอบขึ้น",
  },
};

function getWorkflowLabel(workflow, language) {
  return language === "th" ? workflow.labelTh ?? workflow.label : workflow.label;
}

function getWorkflowSummary(workflow, language) {
  return language === "th" ? workflow.summaryTh ?? workflow.summary : workflow.summary;
}

function getWorkflowSkills(workflow, language) {
  return language === "th" ? workflow.skillsTh ?? workflow.skills : workflow.skills;
}

function getWorkflowOutputs(workflow, language) {
  return language === "th" ? workflow.outputsTh ?? workflow.outputs : workflow.outputs;
}

function getRoleTitle(role, language) {
  return language === "th" ? role.titleTh ?? role.title : role.title;
}

function ActiveRolesGrid({ roles, language }) {
  return (
    <div className={styles.activeRoleChips}>
      {roles.map((role) => {
        const roleTitle = getRoleTitle(role, language);
        return (
          <div key={role.id} className={styles.activeRoleChip} style={{ "--role-accent": role.accent }}>
            <img src={role.avatarThumb} alt={`${role.name} ${roleTitle}`} className={styles.activeRoleThumb} />
            <div className={styles.activeRoleText}>
              <span className={styles.activeRoleName}>{role.name}</span>
              <span className={styles.activeRoleTitle}>{roleTitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SkillsUsedList({ skills }) {
  return (
    <ul className={styles.skillsList}>
      {skills.map((skill) => (
        <li key={skill} className={styles.skillItem}>
          {skill}
        </li>
      ))}
    </ul>
  );
}

function OutputsPanel({ outputs }) {
  return (
    <div className={styles.outputGrid}>
      {outputs.map((output) => (
        <div key={output} className={styles.outputCard}>
          {output}
        </div>
      ))}
    </div>
  );
}

function WorkflowTabs({ workflows, activeWorkflowId, onWorkflowChange, language, copy }) {
  return (
    <div className={styles.workflowTabs} role="tablist" aria-label={copy.tabList}>
      {workflows.map((workflow) => {
        const isActive = workflow.id === activeWorkflowId;
        return (
          <button
            key={workflow.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.workflowTab} ${isActive ? styles.workflowTabActive : ""}`}
            style={{ "--workflow-accent": workflow.accent }}
            onClick={() => onWorkflowChange(workflow.id, true)}
          >
            {getWorkflowLabel(workflow, language)}
          </button>
        );
      })}
    </div>
  );
}

function WorkflowAccordion({ workflows, roles, activeWorkflowId, onWorkflowChange, language, copy }) {
  const itemRefs = useRef({});

  const handleAccordionToggle = (workflowId, isOpen) => {
    onWorkflowChange(workflowId);

    if (isOpen) {
      return;
    }

    window.setTimeout(() => {
      itemRefs.current[workflowId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  return (
    <div className={styles.workflowAccordion}>
      {workflows.map((workflow) => {
        const isOpen = workflow.id === activeWorkflowId;
        const activeRoles = roles.filter((role) => workflow.activeRoleIds.includes(role.id));
        const displayedSkills = getWorkflowSkills(workflow, language).slice(0, 4);
        const outputs = getWorkflowOutputs(workflow, language);

        return (
          <div
            key={workflow.id}
            ref={(node) => {
              itemRefs.current[workflow.id] = node;
            }}
            className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""}`}
            style={{ "--workflow-accent": workflow.accent }}
          >
            <button
              type="button"
              className={styles.accordionTrigger}
              aria-expanded={isOpen}
              onClick={() => handleAccordionToggle(workflow.id, isOpen)}
            >
              <span className={styles.accordionTriggerLabel}>{getWorkflowLabel(workflow, language)}</span>
              <span className={styles.accordionTriggerIcon}>{isOpen ? "-" : "+"}</span>
            </button>

            {isOpen && (
              <div className={styles.accordionBody}>
                <p className={styles.accordionSummary}>{getWorkflowSummary(workflow, language)}</p>

                <div className={`${styles.workflowBlock} ${styles.workflowRolesBlock}`}>
                  <div className={styles.blockHeader}>{copy.activeRoles}</div>
                  <ActiveRolesGrid roles={activeRoles} language={language} />
                </div>

                <div className={`${styles.workflowBlock} ${styles.workflowSkillsBlock}`}>
                  <div className={styles.blockHeader}>{copy.skillsUsed}</div>
                  <SkillsUsedList skills={displayedSkills} />
                </div>

                <div className={`${styles.workflowBlock} ${styles.workflowOutputsBlock} ${styles.accordionOutputsBlock}`}>
                  <div className={styles.blockHeader}>{copy.outputs}</div>
                  <OutputsPanel outputs={outputs} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function WorkflowExecutionPanel({
  workflows,
  roles,
  activeWorkflowId,
  activeWorkflow,
  onWorkflowChange,
}) {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [isMobile, setIsMobile] = useState(false);
  const [autoRotatePaused, setAutoRotatePaused] = useState(false);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const handleMediaChange = (event) => setIsMobile(event.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile || autoRotatePaused) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const currentIndex = workflows.findIndex((workflow) => workflow.id === activeWorkflowId);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % workflows.length;
      onWorkflowChange(workflows[nextIndex].id);
    }, DESKTOP_ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [activeWorkflowId, autoRotatePaused, isMobile, onWorkflowChange, workflows]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const handleDesktopWorkflowChange = (workflowId, fromUser = false) => {
    onWorkflowChange(workflowId);

    if (!fromUser) {
      return;
    }

    setAutoRotatePaused(true);

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setAutoRotatePaused(false);
      resumeTimerRef.current = null;
    }, DESKTOP_IDLE_RESUME_MS);
  };

  const activeRoles = roles.filter((role) => activeWorkflow.activeRoleIds.includes(role.id));
  const displayedSkills = getWorkflowSkills(activeWorkflow, language).slice(0, 4);
  const outputs = getWorkflowOutputs(activeWorkflow, language);

  return (
    <RevealSection amount={0.2}>
      <div className={styles.workflowPanel} style={{ "--workflow-accent": activeWorkflow.accent }}>
        <div className={styles.workflowPanelHeader}>
          <h3 className={styles.workflowPanelTitle}>{copy.title}</h3>
          <p className={styles.panelSupport}>{copy.description}</p>
        </div>

        {!isMobile ? (
          <div key={activeWorkflowId} className={styles.workflowPanelBody}>
            <div className={`${styles.workflowSummary} ${styles.workflowSummaryFull}`}>
              <WorkflowTabs
                workflows={workflows}
                activeWorkflowId={activeWorkflowId}
                onWorkflowChange={handleDesktopWorkflowChange}
                language={language}
                copy={copy}
              />
              <div className={styles.workflowSummaryInner}>
                <h3 className={styles.workflowTitle}>{getWorkflowLabel(activeWorkflow, language)}</h3>
                <p className={styles.workflowSummaryText}>{getWorkflowSummary(activeWorkflow, language)}</p>
              </div>
            </div>

            <div className={styles.workflowInfoGrid}>
              <div className={`${styles.workflowBlock} ${styles.workflowRolesBlock}`}>
                <div className={styles.blockHeader}>{copy.activeRoles}</div>
                <ActiveRolesGrid roles={activeRoles} language={language} />
              </div>

              <div className={`${styles.workflowBlock} ${styles.workflowSkillsBlock}`}>
                <div className={styles.blockHeader}>{copy.skillsUsed}</div>
                <SkillsUsedList skills={displayedSkills} />
              </div>

              <div className={`${styles.workflowBlock} ${styles.workflowOutputsBlock}`}>
                <div className={styles.blockHeader}>{copy.outputs}</div>
                <OutputsPanel outputs={outputs} />
              </div>
            </div>
          </div>
        ) : (
          <WorkflowAccordion
            workflows={workflows}
            roles={roles}
            activeWorkflowId={activeWorkflowId}
            onWorkflowChange={onWorkflowChange}
            language={language}
            copy={copy}
          />
        )}
      </div>
    </RevealSection>
  );
}
