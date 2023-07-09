// temporarily remove or for simplicity
export enum booleanLogic {
    None = "None",
    AND = "AND",
    // OR = "OR",
    NOT = "NOT"
}

export interface queryObject {
    field: queryField,
    value: string,
    boolean: booleanLogic
}

export enum queryField {
    AUTHOR = "Author",
    KEYWORDS = "Keywords",
    TITLE = "Title"
}