export interface Wallpaper {
    id: number;
    url: string;
    name: string;
}


export interface FullWallpaper extends Wallpaper {
    liked: boolean;
    suggested: boolean;
    library: boolean;
}

export function useLikedWallpapers(): FullWallpaper[] {
    const { wallpapers } = useWallpaper();
    return wallpapers.filter(wallpaper => wallpaper.liked);
}

export function useSuggestedWallpapers(): FullWallpaper[] {
    const { wallpapers } = useWallpaper();
    return wallpapers.filter(wallpaper => wallpaper.suggested);
}

export function useLibraryWallpapers(): FullWallpaper[] {
    const { wallpapers } = useWallpaper();
    return wallpapers.filter(wallpaper => wallpaper.library);
}

export function useWallpaper() {
    const wallpapers: FullWallpaper[] = [
        {
            id: 1,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/WfIwP5GYR8a_ZU8qZ_35BQ",
            name: "Abstract Art",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 2,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/W4kY6-EkT-a4kzoxAgH2dw",
            name: "Nature Scene",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 3,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/L7Vplf3JR8iMAkd764NVQg",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 4,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Y0Z_GfFuQ_G45j6PwvW15Q",
            name: "Mountain View",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 5,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/K3A8X1hrR4iGCkjN6Ab0ww",
            name: "Ocean Sunset",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 6,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Nb_AB_sqT0WOH_feuSmCNA",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 7,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Iw3SqAFVTj-EXhZCoojj7g",
            name: "Urban Landscape",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 8,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/N9G9naKlSFGWRyXh5lphOg",
            name: "Urban Landscape",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 9,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Q1DKI9WIQyqBbLhliqiuJw",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 10,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/h5atLivwTpmlBAUHPL9YKw",
            name: "Urban Landscape",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 11,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/qV-E9HV7Tmyj3WXUkXcQ3A",
            name: "Urban Landscape",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 12,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/1r0OhLbaSNmIC0LyoicnVg",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 13,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/WfIwP5GYR8a_ZU8qZ_35BQ",
            name: "Abstract Art",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 14,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/W4kY6-EkT-a4kzoxAgH2dw",
            name: "Nature Scene",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 15,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/L7Vplf3JR8iMAkd764NVQg",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 16,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Y0Z_GfFuQ_G45j6PwvW15Q",
            name: "Mountain View",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 17,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/K3A8X1hrR4iGCkjN6Ab0ww",
            name: "Ocean Sunset",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 18,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Nb_AB_sqT0WOH_feuSmCNA",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 19,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Iw3SqAFVTj-EXhZCoojj7g",
            name: "Urban Landscape",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 20,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/N9G9naKlSFGWRyXh5lphOg",
            name: "Urban Landscape",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 21,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/Q1DKI9WIQyqBbLhliqiuJw",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
        {
            id: 22,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/h5atLivwTpmlBAUHPL9YKw",
            name: "Urban Landscape",
            liked: true,
            suggested: false,
            library: false
        },
        {
            id: 23,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/qV-E9HV7Tmyj3WXUkXcQ3A",
            name: "Urban Landscape",
            liked: false,
            suggested: true,
            library: false
        },
        {
            id: 24,
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/1r0OhLbaSNmIC0LyoicnVg",
            name: "Urban Landscape",
            liked: false,
            suggested: false,
            library: true
        },
    ];

    return { wallpapers };
} 