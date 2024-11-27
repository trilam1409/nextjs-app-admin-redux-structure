"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getUserInfo } from "@/app/(app)/accounts/accountSlice";

const DataInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return null;
};

export default DataInitializer;
