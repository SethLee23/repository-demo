/*
 * @Author: seth
 * @Date: 2020-05-01 09:44:30
 * @LastEditTime: 2020-05-08 09:44:51
 * @LastEditors: Please set LastEditors
 * @Description: 敏感词过滤
 * @FilePath: \dyd-h5web\src\utils\sensitiveWord.js
 */
/**
* @description
* 检查敏感词是否存在
* @private
* @param {any} txt
* @param {any} index
* @returns
*/
function _checkSensitiveWord(sensitiveMap, txt, index) {
  let currentMap = sensitiveMap;
  let flag = false;
  let wordNum = 0;//记录过滤
  let sensitiveWord = ''; //记录过滤出来的敏感词
  for (let i = index; i < txt.length; i++) {
    const word = txt.charAt(i);
    currentMap = currentMap.get(word);
    if (currentMap) {
      wordNum++;
      sensitiveWord += word;
      if (currentMap.get('laster') === true) {
        // 表示已到词的结尾
        flag = true;
        break;
      }
    } else {
      break;
    }
  }
  // 两字成词
  if (wordNum < 2) {
    flag = false;
  }
  return { flag, sensitiveWord };
}
/**
* @description
* 替换所有匹配项
* @private
* @param {Array} allMatchResult
* @param {String} txt
* @returns
*/
function _replaceWidthMark(allMatchResult,txt) {
  allMatchResult = allMatchResult.filter(item => item.flag)
  allMatchResult.forEach((item) => {
    let m = 0
    let mark = ''
    while (m < item.sensitiveWord.length) {
      mark = mark.concat('*')
      m++
    }
    txt = txt.replace(new RegExp(item.sensitiveWord, "gi"), mark)
  })
  return txt
}
class sensitiveWordCheck {
  /**
  * @description
  * 构造敏感词map
  * @private
  * @returns
  */
  makeSensitiveMap(sensitiveWordList) {
    // 构造根节点
    const result = new Map();
    for (const word of sensitiveWordList) {
      let map = result;
      for (let i = 0; i < word.length; i++) {
        // 依次获取字
        const char = word.charAt(i);
        // 判断是否存在
        if (map.get(char)) {
          // 获取下一层节点
          map = map.get(char);
        } else {
          // 将当前节点设置为非结尾节点
          if (map.get('laster') === true) {
            map.set('laster', false);
          }
          const item = new Map();
          // 新增节点默认为结尾节点
          item.set('laster', true);
          map.set(char, item);
          map = map.get(char);
        }
      }

    }
    return result;
  }

  /**
  * @description
  * 判断文本中是否存在敏感词
  * @param {any} txt
  * @returns
  */
  static filterSensitiveWord(txt, sensitiveMap) {
    let matchResult = { flag: false, sensitiveWord: '' };
    var allMatchResult = []
    // 过滤掉除了中文、英文、数字之外的
    const txtTrim = txt.replace(/[^\u4e00-\u9fa5\u0030-\u0039\u0061-\u007a\u0041-\u005a]+/g, '');
    for (let j = 0; j < txtTrim.length; j++) {
      matchResult = _checkSensitiveWord(sensitiveMap, txtTrim, j);
      allMatchResult.push(matchResult)
      // 查到最后一个字
      if (j == txtTrim.length - 1) {
        // j === txtTrim.length - 1
        txt = _replaceWidthMark(allMatchResult,txtTrim)
        break;
      }
    }
    return txt;
  }

}

export default sensitiveWordCheck
