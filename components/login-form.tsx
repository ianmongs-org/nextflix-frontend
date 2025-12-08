import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold font-sans">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance font-sans">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="font-sans">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="font-sans"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className="font-sans">
              Password
            </FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              <span className="font-sans">Forgot your password?</span>
            </a>
          </div>
          <Input id="password" type="password" required className="font-sans" />
        </Field>
        <Field>
          <Button type="submit" className="font-sans">
            Login
          </Button>
        </Field>
        <FieldSeparator className="font-sans">Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" className="font-sans">
            <FaGoogle className="size-4" />
            Login with Google
          </Button>
          <FieldDescription className="text-center font-sans">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
