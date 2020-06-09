/**
 * 用正则实现'hello-world-jack'变成小驼峰'helloWorldJack'
 */
function toCamelCase(str) {
  let idx = 0; 
  return str.replace(/([a-zA-Z])([a-zA-Z]*)[-_]?/g, function(match, p1, p2) { 
    // console.log(match, p1, p2); 

    const str = idx === 0 ? p1 : p1.toUpperCase()
    idx++; 
    return `${str}${p2}` 
  })
}
console.log(toCamelCase(`hello-world-jack`))
console.log(toCamelCase(`hello_world_jack`))
console.log(toCamelCase(`a_c_def`))
