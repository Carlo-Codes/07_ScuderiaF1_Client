import React, { FunctionComponent } from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
import { PropsWithChildren } from "react"
import { dataResponse } from "@backend/HTTPtypes";

interface teamBasePageProps{
    userData:dataResponse
}
export const TeamPageBase:FunctionComponent<PropsWithChildren<teamBasePageProps>> = ({children, userData}) => {

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