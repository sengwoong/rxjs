import { Observable } from 'rxjs';
export declare class AppController {
    private roomDatas;
    index(): string;
    sse(room: string): Observable<MessageEvent>;
    updateData(room: string, newData: string): void;
    private getOrCreateRoomSubject;
    sendData(room: string): Promise<{
        message: string;
    }>;
}
