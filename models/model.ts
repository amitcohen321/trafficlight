export type TVisitor = {
    row: number,
    ip_address: string,
    user_agent: string,
    country: string,
    os: EOperatingSystem,
    url: string
}

export enum EOperatingSystem {
    WINDOWS,
    MAC,
    LINUX
}