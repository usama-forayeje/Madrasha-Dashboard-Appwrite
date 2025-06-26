import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Chrome } from 'lucide-react';
import { AuthContext } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signInSchema } from '@/schemas/auth';

function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values) {
        console.log(values);
    }


    const handleGoogleLogin = async () => {
        console.log("Google login");
    };


    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Log In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="you@example.com" {...field} className="pl-10" />
                                        </div>
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.formState.errors.root && (
                            <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
                        )}
                        <Button disabled={isSubmitting} type="submit" className="w-full">
                            {isSubmitting ? "Logging In..." : "Log In"}
                        </Button>
                    </form>
                </Form>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isSubmitting}>
                    <Chrome className="mr-2 h-4 w-4" />
                    Log in with Google
                </Button>
                <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                    No account yet?{' '}
                    <Link to="/register" className="underline">Sign up</Link>
                </p>
            </CardContent>
        </Card>
    );
}

export default LoginPage;