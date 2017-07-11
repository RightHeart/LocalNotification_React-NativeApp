let SQLite = require('react-native-sqlite-storage')

class Database {
    constructor(){
        this.db = SQLite.openDatabase("goalish.db", "1.0", "MainDatabase", 200000, this.openCB, this.errorCB);
    }

    dropTable(){
        this.db.transaction((tx) => {
            tx.executeSql('DROP TABLE goal', [], (tx, results) => {
            }, (err) => {
                alert(JSON.stringify(err));
            });
        });
    }

    addTables(){
        this.db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS goal(id INTEGER PRIMARY KEY AUTOINCREMENT, goal_name text, created_date datetime default current_timestamp, status text default "A", completion_date datetime default null)', [], (tx, results) => {
            }, (err) => {
            });
        });
    }

    getDataFromGoalTable(cb){
        this.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM goal order by created_date DESC', [], (tx, results) => {
                let len = results.rows.length;
                let goalData = [];
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    goalData.push(row);
                }
                cb(goalData);
            });
        });
    }

    updateGoalTableForStatus(data, cb){
        this.db.transaction((tx) => {
            tx.executeSql('UPDATE goal set status="U", completion_date=? where id=? ', [data.date, data.id], (tx, results) => {
               cb(true);
            });
        });
    }


    getDataFromGoalTableWhereStatusU(cb){
        this.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM goal where status="U" order by completion_date DESC ', [], (tx, results) => {
                let len = results.rows.length;
                let goalData = [];
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    goalData.push(row);
                }
                cb(goalData);
            });
        });
    }

    addDataInGoalTable(data, cb){
        this.db.transaction((tx) => {
            tx.executeSql('INSERT INTO goal(goal_name, status) values(?, ?)',
            [data.goal_name, data.status], (tx, results) => {
                cb(true);
            });
        });
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database OPENED");
    }
}

export default Database;
