import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosClient } from "#api/axios.js";
import { useNavigate } from "react-router-dom";
import { STUDENT_DASHOARD_ROUTE } from "#router/index.jsx";

// 1. تحديد الـ Schema باستخدام Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(8).max(50),
  password: z.string().min(8, "The password must be at least 8 characters long.").max(30),
});

export default function StudentLogin() {
    const navigate = useNavigate();

    // 2. إعداد useForm مرة وحدة وبشكل صحيح باش form.setError tkhdm
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
      formState: { errors, isSubmitting },
    } = form;

  // 3. معالجة الإرسال (Submit Handler)
  const onSubmit = async (values) => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const response = await axiosClient.post('/login', values);

      if (response.status === 204 || response.status === 200) {
        navigate(STUDENT_DASHOARD_ROUTE);
      }
    } catch (error) {
      console.log("Full error.response.data:", error.response?.data);

      if (error.response && error.response.status === 422) {
        // N-chofo wach l-error kaybayan f message wla f ḥaja okhra
        const responseData = error.response.data;

        if (responseData.message) {
          console.log("Error Message:", responseData.message);
        }

        // Ila kan Laravel kay-sifft l-errors مباشّرة (bhal responseData.email)
        if (responseData.email) {
          form.setError('email', {
            message: Array.isArray(responseData.email) ? responseData.email[0] : responseData.email
          });
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-6 text-center">Login In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* حقل البريد الإلكتروني */}
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

        {/* حقل كلمة المرور */}
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

        {/* زر الإرسال */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Registration in progress..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

