document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const welcomeContainer = document.getElementById('welcome-container');

    const showRegisterButton = document.getElementById('show-register');
    const showLoginButton = document.getElementById('show-login');

    // Alternar para o formulário de cadastro
    showRegisterButton.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    // Alternar para o formulário de login
    showLoginButton.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Enviar formulário de login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log(`Token recebido no login: ${data.token}`); // Exibe o token no console
                loginContainer.style.display = 'none';
                welcomeContainer.style.display = 'block';
            } else {
                alert(data.message || 'Erro ao fazer login');
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao conectar ao servidor');
        }
    });

    // Enviar formulário de cadastro
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email-register').value;
        const password = document.getElementById('password-register').value;
        const confirmPassword = document.getElementById('confirm-password-register').value;

        // Validação de senha
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso! Faça login.');
                registerContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao realizar cadastro');
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao conectar ao servidor');
        }
    });

    // Logout
    document.getElementById('logout-button').addEventListener('click', async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    console.log(`Token enviado para logout: ${token}`); // Exibe o token enviado
                    localStorage.removeItem('token');
                    welcomeContainer.style.display = 'none';
                    loginContainer.style.display = 'block';
                } else {
                    const data = await response.json();
                    console.error(data.message || 'Erro ao realizar logout');
                }
            } catch (err) {
                console.error('Erro ao conectar ao servidor:', err);
            }
        } else {
            console.warn('Nenhum token encontrado para logout.');
        }
    });
});