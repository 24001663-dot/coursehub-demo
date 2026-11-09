
function StatusMessage({ error, message }) {
  if (!error && !message) {
    return null;
  }

  return (
    <div className="status-container">
      {message && (
        <div className="status-message success">
          {message}
        </div>
      )}

      {error && (
        <div className="status-message error">
          {error}
        </div>
      )}
    </div>
  );
}

export default StatusMessage;
