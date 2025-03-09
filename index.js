function version(a, b) {
    const aArr = a.split('.');
    const bArr = b.split('.');
    if (aArr.length < 4 || bArr.length < 4) {
        return 'Error, need 4 versions'
    }
    for (let i = 0; i < Math.max(aArr.length, bArr.length); i++) {
        if (aArr[i] > bArr[i]) {
            return a;
        } else if (aArr[i] < bArr[i] || i === aArr.length - 1) {
            return b;
        } else if (i === bArr.length - 1) {
            return a;
        }
    }
}
// console.log(version('1.4.4.4', '1.4.4.4.3.2.1') === '1.4.4.4.3.2.1')
// console.log(version('1.4.4.4.5', '1.4.4.4.3.2.1') === '1.4.4.4.5')
// console.log(version('1.4.4.4', '1.4.4.4') === '1.4.4.4')
// console.log(version('1.4.4.4', '1.4.4.4.3.2.1') === '1.4.4.4.3.2.1')
// console.log(version('1.4.4.4.3.2.1', '1.4.4.4') === '1.4.4.4.3.2.1')
// console.log(version('1.4.4.4.5.1', '1.4.4.4.7') === '1.4.4.4.7')
// console.log(version('1.4.4.8', '1.4.4.5.1') === '1.4.4.8')