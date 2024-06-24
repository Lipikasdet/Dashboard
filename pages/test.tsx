// pages/signup.tsx

import React, { useState } from 'react';
import { auth, createUserWithEmail, sendEmailVerification } from '../src/firebase/firebaseAuth'; 

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmail(auth, email, password);
            if (userCredential.user) {
                await sendEmailVerification(userCredential.user); 
            } else {
                throw new Error("User object not found");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (  
        <div>
            <h1>Signup Page</h1>
            {error && <p>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default Signup;
