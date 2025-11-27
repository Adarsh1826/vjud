export interface CodeSubmitInterface{
    source_code:string,
    language_id:number | null,
    stdin?:string,
    exp?:string,
    output?:string
}

// for redux wrapper

export interface ChildrenInterface{
    children: React.ReactNode;
}

// for tescase checking
export interface TestCaseProps{
    exp:string,
    out:string
}