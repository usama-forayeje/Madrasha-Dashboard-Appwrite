import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useForgotPassword } from '@/hooks/useAuth';
import { forgotPasswordSchema } from '@/schemas/auth';

function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values) {
    forgotPassword(values.email);
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          No problem! Enter your email address below and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Sending Link..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        <Link to="/login" className="w-full hover:underline">
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ForgotPasswordPage;