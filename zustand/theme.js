import { create } from "zustand";

const useTheme = create(set => ({
    theme: "light",
    switchTheme: () => {
        set(state => {
            switch (state.theme) {
                case "light":
                    return {
                        theme: "dark"
                    }
                case "dark":
                    return {
                        theme: "light"
                    }
                default:
                    return {
                        theme: "light"
                    }
            }
        })
    }
}))

export default useTheme;