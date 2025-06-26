import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { useResetPassword } from '@/hooks/useAuth';
import { resetPasswordSchema } from '@/schemas/auth';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const [userId, setUserId] = useState(null);
  const [secret, setSecret] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const userIdParam = searchParams.get('userId');
    const secretParam = searchParams.get('secret');

    if (userIdParam && secretParam) {
      setUserId(userIdParam);
      setSecret(secretParam);
    } else {
      setError("Invalid password reset link. Please try again.");
    }
  }, [searchParams]);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function onSubmit(values) {
    if (!userId || !secret) return;
    resetPassword({ userId, secret, password: values.password });
  }
  
  if (error) {
    return (
        <Card className="mx-auto w-full max-w-sm"><CardHeader><CardTitle>Error</CardTitle></CardHeader><CardContent><p className="text-destructive">{error}</p></CardContent></Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Set New Password</CardTitle>
        <CardDescription>Please enter your new password below. Make sure it's strong!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
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
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ResetPasswordPage;