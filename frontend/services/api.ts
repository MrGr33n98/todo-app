
import { User, Todo, Token } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// A helper to handle fetch requests, add auth headers, and parse JSON response.
async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};

    // Do not set Content-Type for form data, let the browser handle it with boundary
    if (!(options.body instanceof URLSearchParams) && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: { ...headers, ...options.headers },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'An unknown server error occurred' }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    // For 204 No Content response
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// --- Auth ---
export const loginUser = (username: string, password_for_demo: string): Promise<Token> => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password_for_demo);

    return apiFetch('/login/token', {
        method: 'POST',
        body: formData,
    });
};

export const getCurrentUser = (): Promise<User> => {
    return apiFetch('/users/me');
};

// --- Todos ---
export const getMyTodos = (): Promise<Todo[]> => {
    return apiFetch('/todos/me');
};

export const getAllTodos = (): Promise<Todo[]> => {
    return apiFetch('/todos/');
};

export const createTodo = (title: string): Promise<Todo> => {
    return apiFetch('/todos/', {
        method: 'POST',
        body: JSON.stringify({ title, completed: false }), // owner_id is set by backend
    });
};

export const updateTodo = (id: number, data: Partial<{ title: string; completed: boolean }>): Promise<Todo> => {
    return apiFetch(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deleteTodoById = (id: number): Promise<null> => {
    return apiFetch(`/todos/${id}`, {
        method: 'DELETE',
    });
};
