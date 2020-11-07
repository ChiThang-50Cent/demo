let dailyMoney = [
    {num: 1, day: "Sat Nov 07 2020", tag: "Income", describe: "Đi dạy thêm", values: "1000000"},
    {num: 2, day: "Sat Nov 07 2020", tag: "Chi Thiết Yếu", describe: "Ăn trưa", values: "20000"},
    {num: 3, day: "Sat Nov 07 2020", tag: "Chi Thiết Yếu", describe: "Ăn Tối", values: "30000"},
    {num: 4, day: "Sat Nov 07 2020", tag: "Chi Cá Nhân", describe: "Mua laptop", values: "7700000"},
    {num: 5, day: "Sat Nov 07 2020", tag: "Chi Tài Chính", describe: "Đầu tư Bitch coin", values: "2000000"}
];

let money = [1000000, 9750000];

function showMoney() {
    document.getElementById('money-in').textContent = moneyWithDot(money[0]);
    document.getElementById('money-out').textContent = moneyWithDot(money[1]);
    document.getElementById('available-budget').textContent = moneyWithDot(money[0] - money[1]);
}

function getInput() {
    document.getElementById('get-btn').addEventListener('click', function() {
        let day = new Date();
        day = day.toDateString();
    
        let tag = document.getElementById('tag').value;
        let describe = document.getElementById('describe').value;
        let values = document.getElementById('value').value;
        
        let obj = {};
        obj.num = dailyMoney.length + 1;
        obj.day = day;
        obj.tag = tag;
        obj.describe = describe;
        obj.values = values;

        dailyMoney.push(obj);

        if (tag == 'Income') {
            money[0] = Number(money[0]) + Number(values);
        } else {
            money[1] = Number(money[1]) + Number(values);
        }
        
        pushDataOnTable(dailyMoney.length);
        showMoney();

        document.getElementById('describe').value = '';
        document.getElementById('value').value = '';

    });
}

function moneyWithDot(number) {
    number = String(number);

    let position = number.length - 3;
    let out;
    for (; position > 0; position -= 3) {
    number = [number.slice(0, position), '.', number.slice(position)].join('');
    }

    return number;
}

function pushDataOnTable(num) {

    let row = document.createElement('tr');
    
    for ( x in dailyMoney[num-1] ) {
        let node = document.createElement('td');
        let textNode = document.createTextNode(dailyMoney[num-1][x]);
        node.appendChild(textNode);
        row.appendChild(node)

        document.getElementById('table-body').appendChild(row);
    }

    showMoney();
}

function pushDataByTag(tag) {

    if (tag == 'All Tag') {
        for ( let i = 0; i < dailyMoney.length; i++ ) {

            let row = document.createElement('tr');

            for( let x in dailyMoney[i]) {
                let node = document.createElement('td');
                let textNode = document.createTextNode(dailyMoney[i][x]);
                node.appendChild(textNode);
                row.appendChild(node)
    
                document.getElementById('table-body').appendChild(row);
            }           
        }
    } else {
        for ( let i = 0; i < dailyMoney.length; i++ ) {

            let row = document.createElement('tr');

            if (dailyMoney[i].tag == tag) {
                
                for( let x in dailyMoney[i]) {
                    let node = document.createElement('td');
                    let textNode = document.createTextNode(dailyMoney[i][x]);
                    node.appendChild(textNode);
                    row.appendChild(node)

                    document.getElementById('table-body').appendChild(row);    
                }
            }
        }
    }

    showMoney();
}

function deleteTable() {
    let tableBody = document.getElementById('table-body');
    while(tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function sortByTag() {
    document.getElementById('tag-table').addEventListener('change', function () {
        let tag = document.getElementById('tag-table').value;
        deleteTable();
        pushDataByTag(tag);
    });
}

function deleteNode() {
    document.getElementById('delete-node').addEventListener('click', function () {
        let stt = document.getElementById('delete-input').value -1 ;

        if (dailyMoney[stt].tag == 'Income') {
            money[0] -= dailyMoney[stt].values;
        } else {
            money[1] -= dailyMoney[stt].values;
        }
        
        dailyMoney.splice(stt, 1);
        deleteTable();
        document.getElementById('delete-input').value='';
        setNum();
        pushDataByTag('All Tag');
    });
}

function setNum() {
    for (let i = 0; i < dailyMoney.length; i++ ) {
        dailyMoney[i].num = Number(i)+1;
    }
}

pushDataByTag('All Tag');
showMoney();
getInput();
sortByTag();
deleteNode();