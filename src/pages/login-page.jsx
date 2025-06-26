import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signInSchema } from "@/schemas/auth";
import { useGoogleAuth, useSignIn } from "@/hooks/useAuth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // --- Using our custom mutation hooks from the architecture ---
  const { mutate: signIn, isPending: isSigningIn } = useSignIn();
  const { mutate: googleSignIn, isPending: isGoogleSigningIn } = useGoogleAuth();

  const isLoading = isSigningIn || isGoogleSigningIn;

  const onSubmit = (values) => {
    console.log("Form submitted with:", values);
    signIn(values);
  };

  const handleGoogleSignIn = () => {
    googleSignIn();
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-900 p-4">
      {/* Background decoration */}
      <div className="absolute -top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full bg-gradient-to-tr from-emerald-800 to-slate-900 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 z-10 h-32 w-32 transform-gpu rounded-full bg-gradient-to-tr from-emerald-900 to-slate-900 opacity-30 blur-2xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-700 bg-slate-800/60 text-white shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg">
              <School className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Manzil Institute</CardTitle>
            <CardDescription className="pt-1 text-slate-400">
              আপনার অ্যাকাউন্টে সাইন ইন করুন
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            <Button
              variant="outline"
              className="w-full h-11 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              গুগল দিয়ে চালিয়ে যান
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-500">অথবা</span>
              </div>
            </div>

            {/* --- The Form, powered by React Hook Form & ShadCN Form Component --- */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">ইমেল</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          className="h-11 border-slate-600 bg-slate-900/50 focus:border-emerald-500 focus:ring-emerald-500"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">পাসওয়ার্ড</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 pr-10 border-slate-600 bg-slate-900/50 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <a
                  href="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300 block text-right"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>

                <Button
                  type="submit"
                  className="w-full h-11 bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                  disabled={isLoading}
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> সাইন ইন করা হচ্ছে...
                    </>
                  ) : (
                    "সাইন ইন"
                  )}
                </Button>

                <div className="pt-4 text-center text-sm text-slate-400">
                  অ্যাকাউন্ট নেই?{" "}
                  <a
                    href="/register"
                    className="font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    সাইন আপ করুন
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
