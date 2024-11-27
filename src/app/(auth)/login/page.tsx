"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LoginFormType } from "@/helpers/types";
import { createAuthCookie } from "@/actions/auth.action";
import { Formik } from "formik";
import { LoginSchema } from "@/helpers/schemas";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

const login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user

      console.log(values);

      await createAuthCookie();
      router.replace("/");
    },
    [router],
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="font-bold">
          Register here
        </Link>
      </div>
    </>
  );
};

export default login;
