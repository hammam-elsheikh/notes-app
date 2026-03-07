export const Notification = ({ errorMsg, successMsg }) => {
  return (
    <>
      {successMsg ? <div className="success">{successMsg}</div> : ""}
      {errorMsg ? <div className="error">{errorMsg}</div> : ""}
    </>
  );
};
