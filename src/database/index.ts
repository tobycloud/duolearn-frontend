import PocketBase from "pocketbase"
import { User } from "./model";

export const pocketBase = new PocketBase("https://duolearn-pocketbase.tobycm.dev")

export function checkAuth() {
    return pocketBase.authStore.isValid
}

export async function userSignInOAuth2(provider: string) {
    const w = window.open();
    pocketBase.authStore.clear();
    await pocketBase.collection("users").authWithOAuth2({
        provider,
        urlCallback: (url) => {
            if (w) w.location.href = url;
        },
    });
}

export function getAvatar(user: User) {
    return pocketBase.getFileUrl(user, user.avatar)
}

export function getCurrentAuthUser() {
    const current = pocketBase.authStore.model
    // console.log(current)

    return current as User
}

export function logout() {
    pocketBase.authStore.clear();
}