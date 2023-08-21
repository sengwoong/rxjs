import { Controller, Get, Query, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {

  private roomDatas: { [key: string]: Subject<any> } = {}; 

  @Get()
  index() {
    return 'Hello SSE!';
  }

  @Sse('sse')
  sse(@Query('room') room: string): Observable<MessageEvent> {
    const roomSubject = this.getOrCreateRoomSubject(room);

    const updatesObservable = roomSubject.pipe(
      map(data => ({ data } as MessageEvent)),
    );

    return updatesObservable;
  }

  updateData(room: string, newData: string) {
    const roomSubject = this.getOrCreateRoomSubject(room);
    roomSubject.next(newData); // newData 값을 방(room)의 Subject에 전달
  }

  private getOrCreateRoomSubject(room: string): Subject<any> {
    if (!this.roomDatas[room]) {
      this.roomDatas[room] = new Subject<any>();
    }
    return this.roomDatas[room];
  }

  @Get('send-data')
  async sendData(@Query('room') room: string) {
    const newData = `New data for ${room} has arrived!`;
    this.updateData(room, newData); // updateData를 호출하여 newData를 전달
    return { message: 'Data sent successfully' };
  }
}
