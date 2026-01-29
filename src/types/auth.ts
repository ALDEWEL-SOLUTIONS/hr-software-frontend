export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    statusId: number;
    message: string;
    data: {
        token: string;
        expiresAt: string;
        userName: string;
        user: {
            id: string;
            userName: string;
            email: string;
            firstName: string;
            lastName: string;
            profilePicture: string | null;
            roleId: string;
            roleName: string;
            companyCode: string;
            isAccountActivated: boolean;
            mustChangePassword: boolean;
            phoneNumber: string | null;
        };
        permissions: any[];
    };
    isSuccessful: boolean;
    isValid: boolean;
    errors: any[];
    succeeded: boolean;
}
