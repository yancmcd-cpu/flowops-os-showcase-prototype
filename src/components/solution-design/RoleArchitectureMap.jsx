import styles from "./SolutionDesignSection.module.css";
import { SOLUTION_HUB } from "./solutionDesignData";

function RoleNode({ role, isActive, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`${styles.roleNode} ${isActive ? styles.roleNodeActive : ""} ${isSelected ? styles.roleNodeSelected : ""}`}
      style={{
        left: `${role.position.desktop.x}%`,
        top: `${role.position.desktop.y}%`,
        "--role-accent": role.accent,
        "--role-mobile-x": role.position.mobile.x,
        "--role-mobile-y": role.position.mobile.y,
      }}
      data-role-id={role.id}
      data-expandable="true"
      aria-pressed={isSelected}
      aria-label={`Open ${role.name} ${role.title}`}
      onClick={() => onSelect(role.id)}
    >
      <div className={styles.roleThumbFrame}>
        <img src={role.avatarThumb} alt={`${role.name} ${role.title}`} className={styles.roleThumb} />
      </div>
      <div className={styles.roleMeta}>
        <span className={styles.roleName}>{role.name}</span>
        <span className={styles.roleTitle}>{role.title}</span>
      </div>
    </button>
  );
}

function RoleSpotlight({ role, onClose }) {
  if (!role) {
    return null;
  }

  return (
    <div className={styles.roleSpotlight} role="dialog" aria-modal="false" aria-label={`${role.name} profile`}>
      <button type="button" className={styles.roleSpotlightBackdrop} aria-label="Close role details" onClick={onClose} />
      <div className={styles.roleSpotlightCard} style={{ "--role-accent": role.accent }}>
        <button type="button" className={styles.roleSpotlightClose} onClick={onClose}>
          Close
        </button>
        <div className={styles.roleSpotlightImageFrame}>
          <img src={role.avatarFull} alt={`${role.name} ${role.title}`} className={styles.roleSpotlightImage} />
        </div>
        <div className={styles.roleSpotlightMeta}>
          <span className={styles.roleSpotlightEyebrow}>Specialist Role</span>
          <h3 className={styles.roleSpotlightName}>{role.name}</h3>
          <p className={styles.roleSpotlightTitle}>{role.title}</p>
          <p className={styles.roleSpotlightText}>This role can be routed into active workflows as the orchestration engine assembles the solution system.</p>
        </div>
      </div>
    </div>
  );
}

export default function RoleArchitectureMap({ roles, activeRoleIds, activeWorkflowId, selectedRole, selectedRoleId, onRoleSelect, onRoleClose }) {
  return (
    <div className={styles.roleMapShell}>
      <div className={styles.roleMapLabel}>
        <span className={styles.panelEyebrow}>Role Architecture Hub</span>
        <p className={styles.panelSupport}>Specialist roles connect into a central design engine and activate per workflow.</p>
      </div>
      <div className={styles.roleMap}>
        <svg className={styles.roleConnections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {roles.map((role) => {
            const isActive = activeRoleIds.includes(role.id);
            return (
              <g key={role.id}>
                <line
                  x1={SOLUTION_HUB.x}
                  y1={SOLUTION_HUB.y}
                  x2={role.position.desktop.x}
                  y2={role.position.desktop.y}
                  className={styles.connectionLineTrack}
                />
                <line
                  x1={SOLUTION_HUB.x}
                  y1={SOLUTION_HUB.y}
                  x2={role.position.desktop.x}
                  y2={role.position.desktop.y}
                  className={`${styles.connectionLine} ${isActive ? styles.connectionLineActive : ""}`}
                  style={{ "--role-accent": role.accent }}
                />
              </g>
            );
          })}
        </svg>

        <div className={styles.solutionHub} style={{ left: `${SOLUTION_HUB.x}%`, top: `${SOLUTION_HUB.y}%` }}>
          <div key={activeWorkflowId} className={styles.hubPulseRing} />
          <div className={styles.hubCore}>
            <span className={styles.hubLabelTop}>{SOLUTION_HUB.labelTop}</span>
            <span className={styles.hubLabelBottom}>{SOLUTION_HUB.labelBottom}</span>
          </div>
        </div>

        {roles.map((role) => (
          <RoleNode
            key={role.id}
            role={role}
            isActive={activeRoleIds.includes(role.id)}
            isSelected={selectedRoleId === role.id}
            onSelect={onRoleSelect}
          />
        ))}

        <RoleSpotlight role={selectedRole} onClose={onRoleClose} />
      </div>
    </div>
  );
}
