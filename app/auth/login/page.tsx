import React from "react";
import { LoginForm } from "@/components/auth/login-form";

// metadata can be added here for SEO since this is now a Server Component
export const metadata = {
  title: "เข้าสู่ระบบ | Preorder System",
  description: "เข้าสู่ระบบเพื่อใช้งานระบบสั่งจองสินค้าล่วงหน้า",
};

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center p-4 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            ยินดีต้อนรับกลับมา
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            เข้าสู่ระบบเพื่อดำเนินการต่อ
          </p>
        </div>

        {/* เรียกใช้ Client Component (LoginForm) */}
        <LoginForm />
      </div>
    </div>
  );
}