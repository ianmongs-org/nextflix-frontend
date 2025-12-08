import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex items-center justify-between font-sans">
      <Link href="/" className="flex items-center gap-2 font-medium text-2xl">
        <div className="w-8 h-8 bg-foreground rounded dark:bg-background flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-8 h-8"
          />
        </div>
        Nextflix
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <FaBell className="size-4" />
        </Button>
        <Link
          href="/login"
          className="text-sm font-medium rounded-2xl border border-foreground/50 px-4 py-1.5 min-w-24 text-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
