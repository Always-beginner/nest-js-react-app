import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: NestMiddleware) => void) {
    try {
      console.log(
        'this is class based middleware thie is implemented by user module',
      );
      next();
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
