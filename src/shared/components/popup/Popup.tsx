import './index.css';

interface props {
  active: boolean;
  message: string;
}

export default function Popup({ active, message }: props) {
  return (
    <div className={`popup-container ${active ? "active" : ""}`}>
      <div className="popup-content">{message}</div>
    </div>
  );
}
