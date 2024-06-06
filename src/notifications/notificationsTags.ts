import { OneSignal } from "react-native-onesignal"

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: "Matheus",
        user_email: "matheus@example.com"
    })
}

export function tagCartUpdate(itemsCount: string){
    OneSignal.User.addTag("cart_items_count", itemsCount)

}