export const enumText = (text) => {
    if(text.length > 0){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}