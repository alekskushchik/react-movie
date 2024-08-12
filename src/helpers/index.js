const BASE_URL = "https://api.themoviedb.org/3/";

export const getApiConfig = (url = BASE_URL) => {
    return {
        baseUrl: url,
        prepareHeaders: headers => {
            headers.append(
                "Authorization",
                `Bearer ${import.meta.env.VITE_AUTHORIZATION_KEY}`
            );
            headers.append("accept", "application/json");
        },
    };
};

export const convertToHoursMinutes = minutes => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, remainingMinutes };
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const logIn = user => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const logOut = () => {
    localStorage.removeItem("user");
};
