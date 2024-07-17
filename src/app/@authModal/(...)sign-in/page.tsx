"use client";

import LoginForm from "@/components/form/login-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInModal() {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) router.back();
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-[884px] rounded-xl border-white-overlay/10 bg-dark-overlay/80 p-0">
        <DialogTitle className="pt-8 text-center text-2xl font-medium text-white">
          Đăng nhập
        </DialogTitle>
        <DialogDescription className="text-center text-base text-[#f2f2f2]">
          Chọn phương thức đăng nhập
        </DialogDescription>
        <div className="w-full p-8">
          <div className="flex divide-x">
            <div className="flex-1">
              <p className="text-center font-medium text-white">
                Đăng nhập với mã QR
              </p>
            </div>
            <div className="flex-1 px-8">
              <p className="pb-6 text-center font-medium text-white">
                Đăng nhập với mật khẩu
              </p>
              <LoginForm />
            </div>
          </div>
        </div>
        <DialogFooter className="items-center justify-center gap-4 rounded-b-xl border-t border-white-overlay/10 bg-[#1A1A1A] py-4">
          <p className="text-white">Bạn chưa có tài khoản?</p>{" "}
          <Link href="/sign-up" className="block font-medium text-main">
            Đăng ký ngay
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
