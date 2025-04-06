import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Account, Role } from '../_models/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;
    private refreshTokenTimeout: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account | null {
        return this.accountSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<Account>('/accounts/authenticate', { email, password })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout() {
        this.http.post<any>('/accounts/revoke-token', {}).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        return this.http.post<Account>('/accounts/refresh-token', {}, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: any) {
        return this.http.post('/accounts/register', account);
    }

    verifyEmail(token: string) {
        return this.http.post('/accounts/verify-email', { token });
    }

    forgotPassword(email: string) {
        return this.http.post('/accounts/forgot-password', { email });
    }

    validateResetToken(token: string) {
        return this.http.post('/accounts/validate-reset-token', { token });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post('/accounts/reset-password', { token, password, confirmPassword });
    }

    getAll() {
        return this.http.get<Account[]>('/accounts');
    }

    getById(id: string) {
        return this.http.get<Account>(`/accounts/${id}`);
    }

    create(params: any) {
        return this.http.post('/accounts', params);
    }

    update(id: string, params: any) {
        return this.http.put(`/accounts/${id}`, params)
            .pipe(map((account: any) => {
                if (id === this.accountValue?.id) {
                    const updatedAccount = { ...this.accountValue, ...account };
                    this.accountSubject.next(updatedAccount);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`/accounts/${id}`)
            .pipe(finalize(() => {
                if (id === this.accountValue?.id) {
                    this.logout();
                }
            }));
    }

    private startRefreshTokenTimer() {
        if (!this.accountValue?.jwtToken) return;
        
        const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
