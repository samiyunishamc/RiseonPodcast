const SectionHeader = ({ eyebrow, title, lead, center = false, className = "" }) => (
  <header className={`section-header ${center ? "section-header--center" : ""} ${className}`}>
    {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
    {title && <h2 className="section-title">{title}</h2>}
    {lead && <p className="section-lead">{lead}</p>}
  </header>
);

export default SectionHeader;
