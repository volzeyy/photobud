import { create } from "zustand";
import { persist } from "zustand/middleware"

const useTokenStore = create(
    persist (
        (set, get) => ({
            tokens: 25,
            getTokens: () => set(() => {
                // from firebase
            }),
            spendTokens: (model) => set(() => {
                if (model === "fast") {
                    return {
                        tokens: get().tokens - 1
                    }
                } else if (model === "slow") {
                    return {
                        tokens: get().tokens - 10
                    }
                }
            })

        }),
        {
            name: 'user-tokens'
        }
    )
)

export default useTokenStore;