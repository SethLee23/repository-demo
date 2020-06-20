import { decodeText } from './decodeText'
import { emojiMap, emojiName, emojiUrl } from './emojiMap'
import $ from "jquery"
// APPID: 46013462;
//获取消息列表信息

//初始化表情
function initEmotionUL(that) {
    //console.log("显示表情1");
    //return;
    // console.log("显示表情2222",emojiName);
    for (let index in emojiName) {
        let emotions = $('<img>').attr({
            "id": emojiName[index],
            "src": emojiUrl + emojiMap[emojiName[index]],
            "style": "cursor:pointer; width:28px;"
        }).click(function () {
            selectEmotionImg(this, that);
        });
        $('<li>').append(emotions).appendTo($('#emotionUL'));
    }
}
//选中表情
function selectEmotionImg(selImg, that) {
    let selectEm = $("#text-msg input");
    selectEm.val(selectEm.val() + selImg.id);
    // alert(selectEm.val())
    that.chatText = selectEm.val();
}
//解析文本消息元素
function convertTextMsgToHtml(content) {
    let text = decodeText(content), newtext, textval = "";
    // console.log(text);
    // console.log("文本解析：",text);
    for (let l in text) { // 遍历文本格式为文字还是表情
        newtext = text[l];
        if (newtext.name === 'text') {
            textval += newtext.text;
        } else if (newtext.name === 'img') {
            textval += "<img width=28 height=28 src='" + newtext.src + "'/>";
        }
    }
    return textval;
}
//解析图片消息元素
function convertImageMsgToHtml(content) {
    if (typeof content !== 'string') {
        return ''
    }
    let newUrl = content.slice(0, 2) === '//' ? `https:${content}` : content
    return "<img class='smallImage' width='80' src='" + newUrl + "' style='CURSOR: hand' bigImgUrl='" + newUrl + "' alt='' />";
}
//解析视频消息元素
function convertVideoMsgToHtml(content) {
    if (typeof content !== 'string') {
        return ''
    }
    return "<video class='smallImage' width='100' controls muted loop autoplay src='" + content + "' style='CURSOR: hand'></video>";
}
//解析音频消息元素
function convertAudioMsgToHtml(content) {
    if (typeof content !== 'string') {
        return ''
    }
    return "<audio class='smallImage' preload src='" + content + "' style='CURSOR: hand'></audio>";
}
//
// //自定义图片消息点击放大
// $(document).on("click",".smallImage",function(){
//     let imgSrc=$(this).attr("src");
//     let chat = document.getElementById("chat");
//     let maxImgBox = document.createElement("img");
//     maxImgBox.setAttribute('class', 'max-img-box');
//     let bigImg = document.createElement("img");
//     bigImg.setAttribute('src', imgSrc);
//     bigImg.setAttribute('class', 'bigImg');
//     chat.appendChild(maxImgBox);
//     chat.appendChild(bigImg)
// });
//
// //关闭大图
// $(document).on("click",".max-img-box,.bigImg",function(){
//     console.log("退出大图");
//     console.log($(this));
//     $('.max-img-box').remove();
//     $('.bigImg').remove()
//
// });

export{
    initEmotionUL,
    // getCamera,
    convertTextMsgToHtml,
    convertImageMsgToHtml,
    convertVideoMsgToHtml,
    convertAudioMsgToHtml,
}
