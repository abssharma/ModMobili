import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    getAccessToken: session => session.access_token,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('http://127.0.0.1:5000/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: token.refresh_token }),
        }).then(r => r.json()),
});
