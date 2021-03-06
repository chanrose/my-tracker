import { createContext } from "react"

export interface TrackDetail {
    id: string,
    category: string,
    description: string,
    timeIn: string,
    timeOut: string,
    totalTime: string,
    date: string,
}

export interface CategoryDetail {
    filter(arg0: (rec: any) => boolean): import("react").SetStateAction<CategoryDetail | undefined>;
    map(arg0: (category: any) => JSX.Element): import("react").ReactNode;
    id: string,
    category: [{}]
}

export const toEntry = (doc: { id: any; data: () => any }) => {
    return {id: doc.id, ...doc.data() }
}

interface Track {
    TrackStatus: {timeIn: string;
        timeOut: string;
        start: boolean;
        stop: boolean;
        totalTime: number;
        category: string;
        description: string;};
        setTrackStatus: React.Dispatch<React.SetStateAction<{
        timeIn: string;
        timeOut: string;
        start: boolean;
        stop: boolean;
        totalTime: number;
        category: string;
        description: string;
    }>>;
}

export const TrackContext = createContext<Track>({TrackStatus: { timeIn: "",
timeOut: "",
start: false,
stop: false,
totalTime: 0,
category: "",
description: "",}, setTrackStatus: () => {}});

export interface turnOffModal {
    turnOffModal: any;
  }