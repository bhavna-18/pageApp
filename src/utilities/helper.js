export default {
    convertHTMLEntity : function (result){
        const span = document.createElement('span'); 
            span.innerHTML = unescape(result);
            return span.innerHTML;
    }
}