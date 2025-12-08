import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { getRandomMovie } from "@/assets";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-medium font-sans text-2xl"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-8 h-8"
            />
            Nextflix
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={getRandomMovie()}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
          width={1000}
          height={1000}
          loading="lazy"
        />
      </div>
    </div>
  );
}
