// Your code here
function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrays){
    let records = []
    for (const i of arrays){
        records.push(createEmployeeRecord(i))
    };
    return records
}

function createTimeInEvent(obj,time) {
    const dateTime = time.split(' ')
    const newObj = {
        type: "TimeIn",
        hour: Number(dateTime[1]),
        date: dateTime[0]
    }
    obj.timeInEvents.push(newObj)
    return obj
}

function createTimeOutEvent(obj,time) {
    const dateTime = time.split(' ')
    const newObj = {
        type: "TimeOut",
        hour: Number(dateTime[1]),
        date: dateTime[0]
    }
    obj.timeOutEvents.push(newObj)
    return obj
}

function hoursWorkedOnDate(object,day){
    let hoursWorked = 0
    object.timeInEvents.forEach(element => {
        if (element.date === day){
            object.timeOutEvents.forEach(elem => {
                if (elem.date === day){
                    hoursWorked = (elem.hour - element.hour)/100
                }
            })
        }
    })
    return hoursWorked
}

function wagesEarnedOnDate(object,day){
    return hoursWorkedOnDate(object,day) * object.payPerHour
}

function allWagesFor(object){
    const dates = []
    const dayWage = []
    object.timeInEvents.forEach(element => dates.push(element.date))
    dates.forEach(elem => dayWage.push(wagesEarnedOnDate(object,elem)))
    return dayWage.reduce((accumulator,value) => accumulator + value)
}

function calculatePayroll(array){
    const total = []
    array.forEach(element => total.push(allWagesFor(element)))
    return total.reduce((accumulator,value) => accumulator + value)
}