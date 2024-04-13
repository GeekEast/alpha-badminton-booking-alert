const schedulerInterviewSchedule = []

db.schedulerInterviewSchedule.drop()
db.schedulerInterviewSchedule.insertMany(schedulerInterviewSchedule)

const summary = {
  environment: "DATA",
  settings: db.getCollection("schedulerInterviewSchedule").find({}).count()
}

printjson(summary)
