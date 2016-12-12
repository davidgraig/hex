import * as Rx from 'rxjs/Rx';
import * as Observer from 'rxjs/Observer';

export class Server {

    private _socket: WebSocket;
    private _subject: Rx.Subject<Object>;

    get subject() {
        return this._subject;
    }

    constructor(address: string, port: number) {

        this._socket = new WebSocket(`ws://${address}:${port}`);
        this._socket.onclose = closeEvent => {
            // TODO handle any errors based on error code (described here: http://stackoverflow.com/questions/18803971/websocket-onerror-how-to-read-error-description)
            console.log(`Socket Close Event. Reason: ${closeEvent.reason}, code: ${closeEvent.code}`);
        }

        let observer = new ServerObserver(this._socket);

        let observable = Rx.Observable.create(obs => {
            this._socket.onmessage = obs.next.bind(obs);
            this._socket.onerror = obs.error.bind(obs);
            return this._socket.close.bind(this._socket);
        });

        this._subject = Rx.Subject.create(observer, observable);
    }
}

class ServerObserver implements Observer.NextObserver<Object> {

    private _socket: WebSocket;

    constructor(socket: WebSocket) {
        this._socket = socket;
    }

    next(value: Object) {
        if (this._socket.readyState == WebSocket.OPEN) {
            this._socket.send(value);
        }
    }
}