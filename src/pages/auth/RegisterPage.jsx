import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock, Chrome } from 'lucide-react';
import { signUpSchema } from '@/schemas/auth';
import { useGoogleAuth, useSignUp } from '@/hooks/useAuth';


function RegisterPage() {
    const { mutate: signUp, isPending: isSigningUp } = useSignUp();
    const { mutate: googleAuth, isPending: isGoogleSigningIn } = useGoogleAuth();

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { isSubmitting } = form.formState;


    async function onSubmit(values) {
        signUp(values);
    }

    const handleGoogleLogin = async () => {
        googleAuth();
    };

    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="e.g. John Doe" {...field} className="pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            {isSubmitting ? "Creating Account..." : "Create an account"}
                        </Button>
                    </form>
                </Form>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isSubmitting}>
                    <Chrome className="mr-2 h-4 w-4" />
                    Sign up with Google
                </Button>
                <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="underline">Log in</Link>
                </p>
            </CardContent>
        </Card>
    );
}

export default RegisterPage;