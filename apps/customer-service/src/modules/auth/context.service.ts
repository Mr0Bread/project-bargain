import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT, GraphQLExecutionContext } from '@nestjs/graphql';
import { Response, Request, CookieOptions } from 'express';

export type Context = GraphQLExecutionContext & {
  req: Request;
  res: Response;
};

@Injectable()
export class ContextService {
  constructor(
    @Inject(CONTEXT)
    private readonly context: Context,
  ) {}

  getContext() {
    return this.context;
  }

  getCookie(name: string) {
    const {
      req: { cookies },
    } = this.context;

    if (!cookies) {
      return '';
    }

    return cookies[name];
  }

  setCookie(name: string, value: string, options: CookieOptions) {
    this.context.res.cookie(name, value, options);
  }

  setSecureCookie(name: string, value: string, options: CookieOptions = {}) {
    this.setCookie(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      ...options,
    });
  }
}
