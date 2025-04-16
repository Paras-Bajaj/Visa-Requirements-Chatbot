// Simple authentication system using localStorage
// In a production app, you would use a proper backend with encryption

class Auth {
    static init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        
        // Check if user is already logged in
        if (localStorage.getItem('currentUser')) {
            window.location.href = 'bot1.html';
        }
    }
    
    static login(email, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }
    
    static signup(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            chatHistory: []
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        return { success: true, user: newUser };
    }
    
    static logout() {
        localStorage.removeItem('currentUser');
    }
    
    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}

// Initialize auth system
Auth.init();

// Login button handler
document.getElementById('login-btn')?.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (Auth.login(email, password)) {
        window.location.href = 'bot1.html';
    } else {
        alert('Invalid email or password');
    }
});

// Signup button handler
document.getElementById('signup-btn')?.addEventListener('click', () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    const result = Auth.signup(name, email, password);
    if (result.success) {
        window.location.href = 'bot1.html';
    } else {
        alert(result.message);
    }
});

// Forgot password handler
document.getElementById('forgot-password')?.addEventListener('click', () => {
    alert('Please contact support to reset your password');
});