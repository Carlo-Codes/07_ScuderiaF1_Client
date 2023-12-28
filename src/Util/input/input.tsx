export function Input(props:{inputName:string}){
    return(
        <div className="customInput">
                {props.inputName}
                <input></input>
        </div>
    )
}