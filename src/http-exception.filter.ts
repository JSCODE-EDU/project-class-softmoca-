import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); //실행 환경에 대한 컨테스트
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const globalstatus = 500;
    const status = exception.getStatus();
    const error = exception.getResponse();
    if (typeof error === 'string') {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        ...error,
        statusCode: globalstatus,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
