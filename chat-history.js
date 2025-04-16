class ChatHistory {
    static saveChat(message, response) {
        const user = Auth.getCurrentUser();
        if (!user) return;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex !== -1) {
            // Add new chat to history (limit to 100 most recent)
            users[userIndex].chatHistory.unshift({
                question: message,
                answer: response,
                timestamp: new Date().toISOString()
            });
            
            // Keep only the last 100 chats
            if (users[userIndex].chatHistory.length > 100) {
                users[userIndex].chatHistory = users[userIndex].chatHistory.slice(0, 100);
            }
            
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
    }
    
    static loadChatHistory() {
        const user = Auth.getCurrentUser();
        if (!user) return [];
        
        return user.chatHistory || [];
    }
    
    static clearChatHistory() {
        const user = Auth.getCurrentUser();
        if (!user) return;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex !== -1) {
            users[userIndex].chatHistory = [];
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
    }
}