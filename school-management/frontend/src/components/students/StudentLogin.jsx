import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { STUDENT_DASHOARD_ROUTE } from "@/router/routes.js";
import { useUserContext } from "#context/UserContext.jsx";

// 1. Zod Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(8).max(50),
  password: z.string().min(8, "The password must be at least 8 characters long.").max(30),
});

export default function StudentLogin() {
    const { login } = useUserContext(); // Ghi login mn context kafi
    const navigate = useNavigate();

    const form = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "amine@seaghi.com",
        password: "123456789",
      },
    });

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = form;

  // 2. Submit Handler S-sahih (Bla doublon)
  const onSubmit = async (values) => {
    console.log("Values mssifta:", values)
    try {
        const response = await login(values.email, values.password);

        if (response && (response.status === 204 || response.status === 200)) {
            navigate(STUDENT_DASHOARD_ROUTE);
        }
    } catch (error) {
        console.log("Full error response:", error.response);
        console.log("Error config:", error.config);

        if (error.response && error.response.status === 422) {
            const responseData = error.response.data;

            // 7mi rasek ila kanat errors.email wla email direct
            const emailError = responseData.errors?.email || responseData.email;

            if (emailError) {
                setError('email', {
                    message: Array.isArray(emailError) ? emailError[0] : emailError
                });
            } else if (responseData.message) {
                // Ila kan error 3am (bhal Invalid credentials)
                setError('password', {
                    message: responseData.message
                });
            }
        }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-6 text-center">Login In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@school.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
