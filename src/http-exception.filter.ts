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

    console.log(error); // error 객체 내부의 값 바꾸는법 질문
    //     {
    //   statusCode: 404,
    //   message: 'Post with ID 4 not found',
    //   error: 'Not Found'
    // }

    if (typeof error === 'string') {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: error,
      });
    } else {
      response.status(globalstatus).json({
        message: error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
