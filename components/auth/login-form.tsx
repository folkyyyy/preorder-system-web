"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/validation/auth-schema";
import { useAuthStore } from "@/store/use-auth-store";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";

const setCookie = (name: string, value: string, maxAge: number) => {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
};

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUserName: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      const response = await authService.login(data);
      // สมมติว่า response มี token และข้อมูล user
      const token = response?.token;
      const user = response?.payload?.Username || "";

      if (token) {
        const role = response?.payload?.Role;
        setAuth(token, user);

        // บันทึกลง Cookie สำหรับ Middleware
        setCookie("token", token, 86400);
        if (role) setCookie("role", role, 86400);

        toast.success(response?.message || "เข้าสู่ระบบสำเร็จ", {
          description:
            role === "admin"
              ? "กำลังพาคุณไปยังหน้าแอดมิน..."
              : "กำลังพาคุณไปยังหน้าหลัก...",
        });

        // แยก Redirect ตาม Role
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        throw new Error("ไม่พบ Token ยืนยันตัวตน");
      }
    } catch (err) {
      let errorMessage = "เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง";
      
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      toast.error("เข้าสู่ระบบไม่สำเร็จ", {
        description: error,
      });
    }
  };

  return (
    <Card className="border-0 shadow-2xl shadow-indigo-100/50 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800">
      <CardHeader className="space-y-1 pb-6 pt-6 px-6">
        <CardTitle className="text-xl font-semibold text-center hidden">
          เข้าสู่ระบบ
        </CardTitle>
        <CardDescription className="text-center hidden">
          กรอกอีเมลและรหัสผ่านของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2.5">
            <Label
              htmlFor="emailOrUserName"
              className={`font-medium ${errors.emailOrUserName ? "text-red-500 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}
            >
              อีเมลหรือชื่อผู้ใช้
            </Label>
            <div className="relative group">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${errors.emailOrUserName ? "text-red-400" : "text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400"}`}
              />
              <Input
                id="emailOrUserName"
                type="text"
                placeholder="Email or UserName"
                className={`pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 transition-colors ${
                  errors.emailOrUserName
                    ? "border-red-500/50 focus-visible:ring-red-500/20"
                    : "border-slate-200 focus-visible:ring-indigo-500/20 dark:border-slate-800"
                }`}
                {...register("emailOrUserName")}
              />
            </div>
            {errors.emailOrUserName && (
              <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                {errors.emailOrUserName.message}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className={`font-medium ${errors.password ? "text-red-500 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}
              >
                รหัสผ่าน
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <div className="relative group">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${errors.password ? "text-red-400" : "text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400"}`}
              />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 transition-colors ${
                  errors.password
                    ? "border-red-500/50 focus-visible:ring-red-500/20"
                    : "border-slate-200 focus-visible:ring-indigo-500/20 dark:border-slate-800"
                }`}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium shadow-sm hover:shadow-md transition-all active:scale-[0.98] bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                กำลังเข้าสู่ระบบ...
              </>
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 bg-transparent border-t-0 flex justify-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          ยังไม่มีบัญชีผู้ใช้งาน?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
