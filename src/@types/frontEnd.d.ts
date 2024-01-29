import {Team} from '@backend/dbTypes'
export interface TeamFrontEnd extends Omit<Team,'id'|'user_id' >{
}


/* 
export interface Team{
    id:number,
    tier1_driver_id?:number,
    tier2_driver_id?:number,
    tier3_driver_id?:number,
    fastest_lap_driver_id?:number,
    dnf_driver_id?:number,
    user_id:number
    league_id?:number
    competion_id:number
    tier1_points?:number,
    tier2_points?:number,
    tier3_points?:number,
    dnf_points?:number,
    fastest_lap_points?:number,
} */