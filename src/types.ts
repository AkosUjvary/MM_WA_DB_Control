
export interface ITableRow {
    [key: string]: string | undefined;
};

export interface ITable {
    rows: ITableRow[];
    keys: string[];
}

export interface IProcessInfo {
    id: number;
    type: string;
    datetime: string;
};
