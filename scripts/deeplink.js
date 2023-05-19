import { copyToTheClipboard } from './copyToClipBoard.js';
//mercadopago://insurtech/webview?toolbar=true&hides_bottom_bar=true&url=https%3A%2F%2Fbeta.mercadopago.com.br%2Fprotections%2Fmessages%2Fconversation%2Fpreclaim-ed0ae626-c0cc-47b7-993a-c4b1f125f69e&bar_right_button_icon=closemodal
const generateDeepLink = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url || '';
        url = `url=${encodeURIComponent(url)}`;
        let params = '';
        let baseDeepLink = 'mercadopago://webview?webkit-engine=2&';
        let isAndroidConsole = false;
        const androidConsoleBase = 'am start -W -a android.intent.action.VIEW -d ';
        const checkedCheckbox = document.querySelectorAll('input[type=checkbox]:checked');

        checkedCheckbox.forEach(checkbox => {
            if(checkbox.value === 'android-console') {
                isAndroidConsole = true;
            }
            console.log(checkbox.value);
            params += checkbox.value + '&';
        });

        let deepLink = baseDeepLink + params + url;
        if(isAndroidConsole) {
            deepLink = `${androidConsoleBase} "${deepLink}"`;
        }
        copyToTheClipboard(deepLink);
    });
}



const button = document.querySelector("button");
button.addEventListener("click", generateDeepLink);
