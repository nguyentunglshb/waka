import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

export default function SignInModal() {
  return (
    // <div className="fixed left-1/2 top-1/2 z-10 w-full max-w-[884px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white-overlay/10 bg-dark-overlay/80">
    //   <div className="container mx-auto flex h-full max-w-lg items-center">
    //     <div className="relative h-fit w-full rounded-xl px-2 py-20">
    //       <div className="absolute right-4 top-4"></div>
    //     </div>
    //   </div>
    // </div>
    <Dialog defaultOpen>
      <DialogContent className="rounded-xl border-white-overlay/10 bg-dark-overlay/80 p-0">
        <p className="text-center text-2xl font-medium text-white">Đăng nhập</p>
        <p className="text-center text-base text-[#f2f2f2]">
          Chọn phương thức đăng nhập
        </p>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <p className="font-medium text-white">Đăng nhập với mã QR</p>
          </div>
          <div className="col-span-1">
            <p className="font-medium text-white">Đăng nhập với mật khẩu</p>
          </div>
        </div>
        <DialogFooter className="gap-4 rounded-b-xl bg-[#1A1A1A] py-4">
          <p className="text-white">Bạn chưa có tài khoản?</p>{" "}
          <Link href="/sign-up" className="font-medium text-green-500">
            Đăng ký ngay
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
