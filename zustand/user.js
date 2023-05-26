import { create } from "zustand";
import { persist } from "zustand/middleware"
import uuid from "react-native-uuid";

const useUserStore = create(
    persist (
        () => ({
            name: uuid.v4(),
        }),
        {
            name: 'user-store'
        }
    )
)

export default useUserStore;