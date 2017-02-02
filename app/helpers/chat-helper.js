export function hasNickInMessageHelper(nick, message) {
    let nickRegex = new RegExp(`(@${nick}(\\s|$))`);
    return nickRegex.test(message);
}