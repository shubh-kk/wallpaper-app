export interface Wallpaper {
    id: number;
    url: string;
    name: string;
}

export function useWallpaper() {
    const wallpapers: Wallpaper[] = [
        {
            id: 1,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/WfIwP5GYR8a_ZU8qZ_35BQ",
            name: "Abstract Art"
        },
        {
            id: 2,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/W4kY6-EkT-a4kzoxAgH2dw",
            name: "Nature Scene"
        },
        {
            id: 3,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/L7Vplf3JR8iMAkd764NVQg",
            name: "Urban Landscape"
        },
        {
            id: 4,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Y0Z_GfFuQ_G45j6PwvW15Q",
            name: "Mountain View"
        },
        {
            id: 5,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/K3A8X1hrR4iGCkjN6Ab0ww",
            name: "Ocean Sunset"
        },
        {
            id: 6,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Nb_AB_sqT0WOH_feuSmCNA",
            name: "Urban Landscape"
        },
        {
            id: 7,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Iw3SqAFVTj-EXhZCoojj7g",
            name: "Urban Landscape"
        },
        {
            id: 8,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/N9G9naKlSFGWRyXh5lphOg",
            name: "Urban Landscape"
        },
        {
            id: 9,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Q1DKI9WIQyqBbLhliqiuJw",
            name: "Urban Landscape"
        },
        {
            id: 10,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/h5atLivwTpmlBAUHPL9YKw",
            name: "Urban Landscape"
        },
        {
            id: 11,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/qV-E9HV7Tmyj3WXUkXcQ3A",
            name: "Urban Landscape"
        },
        {
            id: 12,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/1r0OhLbaSNmIC0LyoicnVg",
            name: "Urban Landscape"
        },
    ];

    return { wallpapers };
} 