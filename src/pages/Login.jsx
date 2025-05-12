import React, { useState } from 'react';
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [loginRequest, setLoginRequest] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(loginRequest);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || 'הכניסה נכשלה. אנא נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container" dir="rtl">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <h2>ברוך שובך</h2>
                    <p>אנא הזן את פרטי הכניסה שלך</p>
                </div>

                <div className="input-container">
                    <label htmlFor="email">אימייל</label>
                    <input
                        id="email"
                        type="email"
                        value={loginRequest.email}
                        onChange={(e) =>
                            setLoginRequest({ ...loginRequest, email: e.target.value })
                        }
                        required
                        placeholder="הזן את כתובת האימייל שלך"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password">סיסמה</label>
                    <input
                        id="password"
                        type="password"
                        value={loginRequest.password}
                        onChange={(e) =>
                            setLoginRequest({ ...loginRequest, password: e.target.value })
                        }
                        required
                        placeholder="הזן את הסיסמה שלך"
                    />
                </div>

                <div className="submit-container">
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span> מתחבר...
                            </>
                        ) : (
                            'כניסה'
                        )}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="login-footer">
                    אין לך חשבון? <a href="/register">הירשם עכשיו</a><br />
                </div>
            </form>
        </div>
    );
};

export default Login;