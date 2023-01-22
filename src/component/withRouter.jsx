import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  return (
    <WrappedComponent
      {...props}
      params={params}
      success={success}
      setSuccess={setSuccess}
      error={error}
      setError={setError}
    />
  );
};

export default withRouter;
