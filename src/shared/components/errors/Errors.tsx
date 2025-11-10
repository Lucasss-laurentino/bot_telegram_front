import './index.css';

export default function Errors({ error }: { error?: string }) {
  if (!error) return null;

  return (
    <div className="error-message">
      <i className="bi bi-exclamation-triangle error-icon"></i>
      <span className="error-text">{error}</span>
    </div>
  );
}
