const EmptyState = ({ icon, title, description, action }) => (
  <div className="empty-state">
    {icon && <div className="empty-state-icon">{icon}</div>}
    <h3 className="text-2xl mb-2">{title}</h3>
    {description && (
      <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    )}
    {action}
  </div>
);

export default EmptyState;
