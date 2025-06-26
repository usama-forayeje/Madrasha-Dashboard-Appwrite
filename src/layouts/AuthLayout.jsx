import { Outlet, Link } from "react-router";
import { Command } from "lucide-react";

function AuthLayout() {
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">

            <div className="hidden bg-muted lg:flex lg:flex-col lg:items-center lg:justify-center p-10 text-center">

                <div className="mb-4">
                    <Command className="h-16 w-16 text-primary mx-auto" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    মাদ্রাসা ম্যানেজমেন্ট সিস্টেমে স্বাগতম
                </h1>
                <p className="mt-4 text-muted-foreground">
                    শিক্ষা ব্যবস্থাপনাকে সহজ ও আধুনিক করতে আপনার নির্ভরযোগ্য সমাধান।
                </p>
            </div>


            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">


                <Outlet />

            </div>
        </div>
    );
}

export default AuthLayout;