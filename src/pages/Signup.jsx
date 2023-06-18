import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignup } from '../hooks/useSignup.js';
import styles from '../styles/styles.module.scss';

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signup, loading, error } = useSignup();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async data => {
        try {
            const response = await signup(data.email, data.password);
            reset({ email: '', password: '' });
            setSuccessMessage(response.message); // Set success message
        } catch (error) {
            // Handle error if registration fails
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign Up</h3>
            <input
                type="email"
                {...register('email', { required: 'required field' })}
                placeholder="email"
                autoComplete="off"
            />
            <p>{errors.email?.message}</p>
            <input
                type="password"
                {...register('password', { required: 'required field' })}
                placeholder="password"
            />
            <p>{errors.password?.message}</p>
            <button
                className={styles.submit}
                type="submit"
                disabled={loading}
            >
                Sign Up
            </button>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}

export default Signup;
