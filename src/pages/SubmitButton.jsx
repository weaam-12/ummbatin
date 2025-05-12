// SubmitButton.js
const SubmitButton = ({ text, onClick }) => (
    <button onClick={onClick} className="submit-button">{text}</button>
);

export default SubmitButton;
