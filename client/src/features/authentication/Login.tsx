import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { Background } from '@/common/components/Background'
import { GoogleLoginButton } from '@/common/components/GoogleLogin';
import { Button } from '@/common/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/common/components/Form';
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
      <div className="
        absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
        w-[80%] max-w-[300px]
        bg-white
        border-[1px] rounded-xl border-orange-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]
        flex flex-col items-center px-8"
      >
        <h1 className="flex text-3xl font-arbutus my-8">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col">
            <FormField
              control={form.control}
              name="username"
            render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder='Username'
                      className='bg-stone-100 border-none text-orange-400 
                        placeholder:text-orange-300 placeholder:italic font-arbutus'
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
                      placeholder='Password'
                      className='bg-stone-100 border-none text-orange-400 
                        placeholder:text-orange-300 placeholder:italic font-arbutus mt-3'
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant="link" className='px-0 font-arbutus text-xs self-end'>
              Forgot password?
            </Button>
            <Button className="mt-5 w-full rounded-none
              bg-orange-400
              hover:bg-white hover:text-orange-400 hover:border-2 hover:border-orange-400" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <hr className='border-[1px] border-black w-full my-3'></hr>
        <GoogleOAuthProvider clientId="454433122172-je51gqttlseec0u50h0mdt0vopjjudhq.apps.googleusercontent.com">
          <GoogleLoginButton />
        </GoogleOAuthProvider>
        <Button asChild variant="link" className="py-8 font-arbutus text-orange-400">
          <Link to="/register">No account? Sign Up!</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
