
export function DriverPicture(props:{driverName:string}){

    if(props.driverName && props.driverName != "hidden"){
        return (
            <img className="driverPicture" src={`./assets/driverImages/${props.driverName}.png`}></img>
        )
    }
    else{
        return (
            <></>
        )
    }
    

}