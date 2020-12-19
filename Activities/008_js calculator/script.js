let output = document.getElementById('output');
// console.log(output)

function pushBtn(item) {
    // console.log(item);
    let getItem = item.innerHTML;
    // console.log(getItem);
    // console.log(output)
    // output.innerHTML = getItem;
    if (getItem === '=') {
        output.innerHTML = eval(output.innerHTML);
    } else if (getItem === 'AC') {
        output.innerHTML = '0'
    } else if (getItem === '.' && output.innerHTML.includes('.')) {
        //DO NOTHING
    } else {
        if(output.innerHTML === '0') {
            output.innerHTML = getItem;
        } else {
            output.innerHTML += getItem;
        }
    }
}