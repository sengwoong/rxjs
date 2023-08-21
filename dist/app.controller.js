"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AppController = exports.AppController = class AppController {
    constructor() {
        this.roomDatas = {};
    }
    index() {
        return 'Hello SSE!';
    }
    sse(room) {
        const roomSubject = this.getOrCreateRoomSubject(room);
        const updatesObservable = roomSubject.pipe((0, operators_1.map)(data => ({ data })));
        return updatesObservable;
    }
    updateData(room, newData) {
        const roomSubject = this.getOrCreateRoomSubject(room);
        roomSubject.next(newData);
    }
    getOrCreateRoomSubject(room) {
        if (!this.roomDatas[room]) {
            this.roomDatas[room] = new rxjs_1.Subject();
        }
        return this.roomDatas[room];
    }
    async sendData(room) {
        const newData = `New data for ${room} has arrived!`;
        this.updateData(room, newData);
        return { message: 'Data sent successfully' };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "index", null);
__decorate([
    (0, common_1.Sse)('sse'),
    __param(0, (0, common_1.Query)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "sse", null);
__decorate([
    (0, common_1.Get)('send-data'),
    __param(0, (0, common_1.Query)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendData", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map