"use client";

import { authClient } from "@/lib/auth-client";
import { Card, Separator, Toast, toast } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  // ==== to redirect user to the page they wanted to access after login ====
  const router = useRouter();
  // ==== to redirect user to the page they wanted to access after login ====
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      // redirect('/')
      router.push('/');
    }

    if (error) {
      toast.danger("Invalid email or password");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Start your adventure with Wanderlust</p>
      </div>
      <Card className="border rounded-none max-w-125 mx-auto">
        <Form onSubmit={onSubmit} className="flex justify-center flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button className={"rounded-none w-full bg-[#c1121f] hover:bg-[#780000]"} type="submit">
              Login
            </Button>
          </div>
        </Form>

        <div className="flex justify-end items-center gap-3">
           <p>Don’t have an account? <Link href="/signup" className="text-[#c1121f] hover:underline">Register</Link></p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;