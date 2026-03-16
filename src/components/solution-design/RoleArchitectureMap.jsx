"use client";

import { useLanguage } from "@/components/LanguageContext";
import styles from "./SolutionDesignSection.module.css";
import { SOLUTION_HUB } from "./solutionDesignData";

const COPY = {
  en: {
    openRole: (name, title) => `Open ${name} ${title}`,
    closeRole: "Close role details",
    close: "Close",
    specialistRole: "Specialist Role",
    dialogLabel: (name) => `${name} profile`,
    hintDesktop: "Click any role to expand",
    hintMobile: "Tap any role to expand",
  },
  th: {
    openRole: (name, title) => `เปิดรายละเอียด ${name} ${title}`,
    closeRole: "ปิดรายละเอียดบทบาท",
    close: "ปิด",
    specialistRole: "บทบาทผู้เชี่ยวชาญ",
    dialogLabel: (name) => `โปรไฟล์ของ ${name}`,
    hintDesktop: "คลิกที่บทบาทใดก็ได้เพื่อขยาย",
    hintMobile: "แตะที่บทบาทใดก็ได้เพื่อขยาย",
  },
};

function getRoleTitle(role, language) {
  return language === "th" ? role.titleTh ?? role.title : role.title;
}

function getRoleSummary(role, language) {
  return language === "th" ? role.summaryTh ?? role.summary : role.summary;
}

function getRoleDetails(role, language) {
  return language === "th" ? role.detailsTh ?? role.details : role.details;
}

function RoleNode({ role, index, isActive, isSelected, onSelect, language, copy }) {
  const roleTitle = getRoleTitle(role, language);

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
        "--role-loop-delay": `${index * 1.55}s`,
        "--role-float-delay": `${index * 0.22}s`,
      }}
      data-role-id={role.id}
      data-expandable="true"
      aria-pressed={isSelected}
      aria-label={copy.openRole(role.name, roleTitle)}
      onClick={() => onSelect(role.id)}
    >
      <div className={styles.roleThumbFrame}>
        <img src={role.avatarThumb} alt={`${role.name} ${roleTitle}`} className={styles.roleThumb} />
      </div>
      <div className={styles.roleMeta}>
        <span className={styles.roleName}>{role.name}</span>
        <span className={styles.roleTitle}>{roleTitle}</span>
      </div>
    </button>
  );
}

function RoleSpotlight({ role, onClose, language, copy }) {
  if (!role) {
    return null;
  }

  const roleTitle = getRoleTitle(role, language);
  const roleSummary = getRoleSummary(role, language);
  const roleDetails = getRoleDetails(role, language);

  return (
    <div className={styles.roleSpotlight} role="dialog" aria-modal="false" aria-label={copy.dialogLabel(role.name)}>
      <button
        type="button"
        className={styles.roleSpotlightBackdrop}
        aria-label={copy.closeRole}
        onClick={onClose}
      />
      <div className={styles.roleSpotlightCard} style={{ "--role-accent": role.accent }}>
        <button type="button" className={styles.roleSpotlightClose} onClick={onClose}>
          {copy.close}
        </button>
        <div className={styles.roleSpotlightImageFrame}>
          <img src={role.avatarFull} alt={`${role.name} ${roleTitle}`} className={styles.roleSpotlightImage} />
        </div>
        <div className={styles.roleSpotlightMeta}>
          <span className={styles.roleSpotlightEyebrow}>{copy.specialistRole}</span>
          <h3 className={styles.roleSpotlightName}>{role.name}</h3>
          <p className={styles.roleSpotlightTitle}>{roleTitle}</p>
          <p className={styles.roleSpotlightText}>{roleSummary}</p>
          <ul className={styles.roleSpotlightList}>
            {roleDetails.map((detail) => (
              <li key={detail} className={styles.roleSpotlightItem}>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function RoleArchitectureMap({
  roles,
  activeRoleIds,
  activeWorkflowId,
  selectedRole,
  selectedRoleId,
  onRoleSelect,
  onRoleClose,
}) {
  const { language } = useLanguage();
  const copy = COPY[language];
  const hubTop = language === "th" ? SOLUTION_HUB.labelTopTh ?? SOLUTION_HUB.labelTop : SOLUTION_HUB.labelTop;
  const hubBottom = language === "th" ? SOLUTION_HUB.labelBottomTh ?? SOLUTION_HUB.labelBottom : SOLUTION_HUB.labelBottom;

  return (
    <div className={styles.roleMapShell}>
      <div className={styles.roleExpandHint} aria-hidden="true">
        <span className={styles.roleExpandHintDot} />
        <span className={styles.roleExpandHintDesktop}>{copy.hintDesktop}</span>
        <span className={styles.roleExpandHintMobile}>{copy.hintMobile}</span>
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
            <span className={styles.hubLabelTop}>{hubTop}</span>
            <span className={styles.hubLabelBottom}>{hubBottom}</span>
          </div>
        </div>

        {roles.map((role, index) => (
          <RoleNode
            key={role.id}
            role={role}
            index={index}
            isActive={activeRoleIds.includes(role.id)}
            isSelected={selectedRoleId === role.id}
            onSelect={onRoleSelect}
            language={language}
            copy={copy}
          />
        ))}

        <RoleSpotlight role={selectedRole} onClose={onRoleClose} language={language} copy={copy} />
      </div>
    </div>
  );
}
