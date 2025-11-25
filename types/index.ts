export interface CodeSubmitInterface{
    source_code:string,
    language_id:number | null,
    stdin?:string
}

// for redux wrapper

export interface ChildrenInterface{
    children: React.ReactNode;
}