
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CustomerSignUpInput {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface CustomerSignInInput {
    email: string;
    password: string;
}

export interface PublicCustomer {
    name: string;
    surname: string;
    email: string;
}

export interface SignInResponse {
    isSuccess: boolean;
    customer?: Nullable<PublicCustomer>;
}

export interface IMutation {
    signUp(input: CustomerSignUpInput): PublicCustomer | Promise<PublicCustomer>;
    signIn(input: CustomerSignInInput): SignInResponse | Promise<SignInResponse>;
    signOut(): boolean | Promise<boolean>;
    refreshAccessToken(): boolean | Promise<boolean>;
}

export interface IQuery {
    isSignedIn(): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
