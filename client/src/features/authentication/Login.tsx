import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Background } from '@/common/components/Background';
import { Button } from '@/common/components/Button';
import { Form, FormControl, FormField, FormItem } from '@/common/components/Form';
import { Input } from '@/common/components/Input';
import { useToast } from '@/common/components/use-toast';

import { useAuthContext } from './AuthContext';

const FormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const success = await login(data.username, data.password);
    if (success) {
      navigate('/');
    } else {
      toast({
        title: 'Invalid Username or Password',
        variant: 'destructive'
      });
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: '', password: '' }
  });

  return (
    <div>
      <Background />
      <div
        className="
        absolute left-[50%] top-[50%] flex w-[80%]
        max-w-[300px] translate-x-[-50%]
        translate-y-[-50%]
        flex-col items-center rounded-xl border-[1px]
        border-primary bg-white px-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
        <h1 className="my-8 flex font-alegreya text-3xl font-semibold">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="border-none bg-stone-100 font-alegreya text-base placeholder:italic"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="mt-4 border-none bg-stone-100 font-alegreya 
                        text-base placeholder:italic "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="text-base mt-4" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <Button asChild variant="link" className="mt-2 mb-8 h-fit font-alegreya text-primary">
          <Link to="/register">No account? Sign up!</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
