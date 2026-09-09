export interface MapTileContent {
    type: string;
    code: string;
}
export interface MapTileData{
    name: string;
    skin: string;
    x: number;
    y: number;
    content: MapTileContent|null;
}
export interface MapTileResponse{
    data: MapTileData;
}