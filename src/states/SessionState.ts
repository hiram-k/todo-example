import assign = require("object-assign")

class SessionStateProps {
    userName?: string;
    accessToken?: string;
}

export class SessionState extends SessionStateProps {
    private constructor(props: SessionStateProps) {
        super();
        Object.keys(props).forEach(key => (this as any)[key] = (props as any)[key]);
    }
    static create(): SessionState {
        return new SessionState({
            userName: "",
            accessToken: "",
        });
    }

    overwrite(props: SessionStateProps) {
        return new SessionState(assign({}, this, props));
    }

    establish(userName: string, accessToken: string): SessionState {
        return this.overwrite({ userName, accessToken });
    }

    expire(): SessionState {
        return SessionState.create();
    }
}
