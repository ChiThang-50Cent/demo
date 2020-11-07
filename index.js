let dailyMoney = [];
let num = 1;
let moneyIn = 0;
let moneyOut = 0;

function getInput() {
    document.getElementById('get-btn').addEventListener('click', function() {
        let day = new Date();
        day = day.toDateString();
    
        let tag = document.getElementById('tag').value;
        let describe = document.getElementById('describe').value;
        let values = document.getElementById('value').value;
        
        let obj = {};
        obj.num = num;
        obj.day = day;
        obj.tag = tag;
        obj.describe = describe;
        obj.values = values;
        
        dailyMoney.push(obj);

        if (tag == 'Income') {
            moneyIn = Number(moneyIn) + Number(values);
        } else {
            moneyOut = Number(moneyOut) + Number(values);
        }
        
        pushDataOnTable(num);

        document.getElementById('describe').value = '';
        document.getElementById('value').value = '';

        num++;
    });
}

function moneyWithDot(num) {
    num = String(num);

    let position = num.length - 3;
    let out;
    for (; position > 0; position -= 3) {
    num = [num.slice(0, position), '.', num.slice(position)].join('');
    }

    return num;
}

function pushDataOnTable(num, tag) {

    let row = document.createElement('tr');
    
    for ( x in dailyMoney[num-1] ) {
        if (tag == 'All Tag') {
            
        }
        node = document.createElement('td');
        textNode = document.createTextNode(dailyMoney[num-1][x]);
        node.appendChild(textNode);
        row.appendChild(node)

        document.getElementById('table-body').appendChild(row);
    }

    document.getElementById('money-in').textContent = moneyWithDot(moneyIn);
    document.getElementById('money-out').textContent = moneyWithDot(moneyOut);
    document.getElementById('available-budget').textContent = moneyWithDot(moneyIn - moneyOut);

}

function sortByValue() {
    let tag = document.getElementById('tag-table').value;
    pushDataOnTable();
}

getInput();