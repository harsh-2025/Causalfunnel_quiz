import React from "react";

function SubmitDialog({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="submit-dialog">
      <div className="submit-dialog-content">
        <p>Do you want to submit the quiz?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Submit</button>
      </div>
    </div>
  );
}

export default SubmitDialog;
