import React from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
export function TeamPageBase({children}:{children:React.ReactElement}){

    return (
        <div className="teamContainer">
            
            <Card>
                <>
                    <TrackCard trackName="Circuit de Spa-Francorchamps"></TrackCard>
                    {children}
                </>
            </Card>
        </div>
    )

}