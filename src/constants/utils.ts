/**
 * 下划线转换驼峰
 * stroke-line --> strokeLine
 */
export function lineToCamel(name: string) {
    return name.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
/**
 * 驼峰转换下划线
 * strokeLine --> stroke-line
 */
export function camel2Line(name:  string) {
  return name.replace(/([A-Z])/g,"-$1").toLowerCase();
}

/**
 * 
 */
export function obj2PropsStr(obj: Object) {
    return Object.entries(obj).reduce((cur: string, next: any) => { 
        next[0] = camel2Line(next[0])
        return cur + `${next.join('=')} `}, 
    ' ')
}

