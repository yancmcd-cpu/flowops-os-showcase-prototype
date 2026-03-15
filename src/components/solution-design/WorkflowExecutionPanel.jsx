import styles from "./SolutionDesignSection.module.css";

function WorkflowTabs({ workflows, activeWorkflowId, onWorkflowChange }) {
  return (
    <div className={styles.workflowTabs} role="tablist" aria-label="Solution design workflows">
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
            onClick={() => onWorkflowChange(workflow.id)}
          >
            {workflow.label}
          </button>
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
  selectedRoleId,
  onRoleSelect,
  onWorkflowChange,
}) {
  const activeRoles = roles.filter((role) => activeWorkflow.activeRoleIds.includes(role.id));

  return (
    <div className={styles.workflowPanel} style={{ "--workflow-accent": activeWorkflow.accent }}>
      <div className={styles.workflowPanelHeader}>
        <span className={styles.panelEyebrow}>Workflow Execution</span>
        <p className={styles.panelSupport}>Roles, skills, and solution modules assemble differently depending on the workflow.</p>
      </div>

      <div key={activeWorkflowId} className={styles.workflowPanelBody}>
        <div className={`${styles.workflowSummary} ${styles.workflowSummaryFull}`}>
          <WorkflowTabs workflows={workflows} activeWorkflowId={activeWorkflowId} onWorkflowChange={onWorkflowChange} />
          <div className={styles.workflowSummaryInner}>
            <h3 className={styles.workflowTitle}>{activeWorkflow.label}</h3>
            <p className={styles.workflowSummaryText}>{activeWorkflow.summary}</p>
          </div>
        </div>

        <div className={styles.workflowInfoGrid}>
          <div className={`${styles.workflowBlock} ${styles.workflowRolesBlock}`}>
            <div className={styles.blockHeader}>Active Roles</div>
            <div className={styles.activeRoleChips}>
              {activeRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className={`${styles.activeRoleChip} ${selectedRoleId === role.id ? styles.activeRoleChipSelected : ""}`}
                  style={{ "--role-accent": role.accent }}
                  onClick={() => onRoleSelect(role.id)}
                >
                  <img src={role.avatarThumb} alt={`${role.name} ${role.title}`} className={styles.activeRoleThumb} />
                  <div className={styles.activeRoleText}>
                    <span className={styles.activeRoleName}>{role.name}</span>
                    <span className={styles.activeRoleTitle}>{role.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.workflowBlock} ${styles.workflowSkillsBlock}`}>
            <div className={styles.blockHeader}>Skills Used</div>
            <ul className={styles.skillsList}>
              {activeWorkflow.skills.map((skill) => (
                <li key={skill} className={styles.skillItem}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.workflowBlock} ${styles.workflowModeBlock}`}>
            <div className={styles.blockHeader}>Workflow Mode</div>
            <div className={styles.workflowModeCard}>
              <span className={styles.workflowModeLabel}>Active System</span>
              <span className={styles.workflowModeValue}>{activeWorkflow.label}</span>
              <p className={styles.workflowModeText}>The orchestration layer activates the selected specialist roles and assembles the solution path below.</p>
            </div>
          </div>

          <div className={`${styles.workflowBlock} ${styles.workflowOutputsBlock}`}>
            <div className={styles.blockHeader}>Assembled Outputs</div>
            <div className={styles.outputGrid}>
              {activeWorkflow.outputs.map((output) => (
                <div key={output} className={styles.outputCard}>{output}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
