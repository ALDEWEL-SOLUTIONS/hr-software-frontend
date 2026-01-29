import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Users, Shield, Smartphone, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface TwoFactorAuthProps {
  email: string;
  onVerify: () => void;
  onCancel: () => void;
}

export function TwoFactorAuth({ email, onVerify, onCancel }: TwoFactorAuthProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [generatedCode] = useState(Math.floor(100000 + Math.random() * 900000).toString());
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code === generatedCode) {
      onVerify();
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setError("");
    // In production, this would trigger a new code to be sent
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
            <Shield className="h-12 w-12 text-white" />
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Two-Factor Authentication</CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code to complete your login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert className="bg-blue-50 border-blue-200">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  We've sent a verification code to <strong>{email}</strong>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-center block">Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded p-3">
                <strong>Demo Mode:</strong> Your 2FA code is <strong>{generatedCode}</strong>
              </div>

              <div className="text-center text-sm text-gray-600">
                {timeLeft > 0 ? (
                  <p>Code expires in <strong>{timeLeft}s</strong></p>
                ) : (
                  <p className="text-red-600">Code expired!</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={code.length !== 6}
              >
                Verify & Continue
              </Button>

              {timeLeft === 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResend}
                  className="w-full"
                >
                  Resend Code
                </Button>
              )}

              <div className="space-y-2 text-sm text-gray-600 bg-gray-50 rounded p-3">
                <p className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Your account is protected with 2FA</span>
                </p>
                <p className="text-xs">
                  Can't access your email? Contact your administrator.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <button
              onClick={onCancel}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 HR Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
