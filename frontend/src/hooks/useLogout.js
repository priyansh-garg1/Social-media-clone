import React from "react";
import useShowToast from "./useShowToast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { URL } from "../constants";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const logout = async () => {
    try {
      const res = await fetch(`${URL}/api/users/logout`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return logout;
};

export default useLogout;
