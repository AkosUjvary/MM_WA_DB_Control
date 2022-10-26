
export interface IParamTableRow {
    [key: string]: string | undefined;
};

export interface IParamTable {
    rows: IParamTableRow[];
    keys: string[];
}

export interface IProcessInfo {
    id: number;
    type: string;
    datetime: string;
};
