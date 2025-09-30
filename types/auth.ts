export interface LoginPayload {
    email: string;
    password: string;
};

export interface LoginResponse {
    status: number;
    message: string;
};