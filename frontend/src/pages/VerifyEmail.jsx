import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { verify } from "./../features/auth/authSlice";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(verify(token));
    }
  }, []);
  return (
    <>
      <h3>Verifying email please wait a while...</h3>
    </>
  );
};

export default VerifyEmail;
