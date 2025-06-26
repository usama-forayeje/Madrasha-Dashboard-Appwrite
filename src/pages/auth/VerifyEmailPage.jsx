import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useVerifyEmail } from '@/hooks/useAuth';


function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const { mutate: verifyEmail, isPending, isSuccess, isError, error } = useVerifyEmail();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    if (userId && secret) {
      verifyEmail({ userId, secret });
    }
  }, [searchParams, verifyEmail]);

  return (
    <Card className="mx-auto w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Email Verification</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 min-h-[150px]">
        {isPending && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying your email, please wait...</p>
          </>
        )}
        {isSuccess && (
          <>
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Email Verified Successfully!</p>
            <p className="text-muted-foreground">Your account is now active. You can now log in.</p>
            <Button asChild className="mt-4">
              <Link to="/login">Proceed to Login</Link>
            </Button>
          </>
        )}
        {isError && (
          <>
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <p className="text-lg font-medium">Verification Failed</p>
            <p className="text-muted-foreground">
              {error?.message || "The verification link is invalid or has expired."}
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/login">Back to Login</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default VerifyEmailPage;