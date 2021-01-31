let express = require("express")();
let mysql = require("mysql");
const port = 8080;
// 监听端口
express.listen(port);
console.log("server is running at " + port);


// Node解决跨域问题
express.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})


// 规划mysql链接
let sql = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "school",
        timezone: "08:00"
    })
    //尝试链接
sql.connect();

// 登录接口

express.get("/login", (request, response) => {
    // 获取来自前端请求的请求参数的参数值
    let username = request.query.username;
    let password = request.query.password;
    // 前端发送的username和password
    sql.query(`SELECT*FROM user WHERE username="${username}" AND password="${password}"`, (error, data) => {
        if (error) {
            // 只有sql语句写错了才回进来此处
            console.log(error);
            response.send("error");
        } else {
            // sql语句写正确了无论查到与未查到都会进来
            if (!data.length) {
                // 向前端返回"error",代表没有找到信息
                response.end("error");
            } else {
                response.end("success")
            }
        }

    })


})

// 注册接口
express.get("/addUser", (request, response) => {
    let username = request.query.username;
    let password = request.query.password;


    sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`, (error) => {
        // error里没值说明成功了

        if (error) {
            console.log(error);
            response.send("error")
        } else {
            response.send("success")
        }
    })

})

// 获取学生数据接口
express.get("/getStudents", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT*FROM students WHERE id="${id}"` : `SELECT*FROM students ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error);
            response.end("error")
        } else {
            response.send(data);
            // console.log(data);
        }
    })

})

// 删除学生数据
express.get("/deleteStudent", (request, response) => {
    const id = request.query.id;
    // console.log(id)
    sql.query(`DELETE FROM students WHERE id="${id}"`, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        } else {
            response.end("success")
        }
    })
})

// 增加学生数据
express.get("/addStudent", (request, response) => {
        const name = request.query.name;
        const age = request.query.age;
        const sex = request.query.sex;
        const city = request.query.city;
        const joinDate = request.query.joinDate;
        // 非空验证
        if (name && age && sex && city && joinDate) {
            sql.query(`INSERT INTO students (name,age,sex,city,joinDate) VALUES ("${name}","${age}","${sex}","${city}","${joinDate}")`, (error, data) => {
                if (error) {
                    console.log(error);
                    response.end("error")
                } else {
                    response.send("success")
                }
            })
        } else {
            response.end("error")
        }
    })
    // 编辑学生情况
express.get("/editStudent", (request, response) => {
    const name = request.query.name;
    const age = request.query.age;
    const sex = request.query.sex;
    const city = request.query.city;
    const joinDate = request.query.joinDate;
    const id = request.query.id;
    sql.query(`UPDATE students SET name="${name}", sex="${sex}", age="${age}", city="${city}", joinDate="${joinDate}" WHERE id="${id}"`, (error, data) => {
        if (error) {
            console.log(error);
            response.end("error");
        } else {
            console.log(data);
            response.send(data);
        }
    })
})