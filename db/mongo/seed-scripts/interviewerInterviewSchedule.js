const interviewerInterviewSchedule = []

db.interviewerInterviewSchedule.drop()
db.interviewerInterviewSchedule.insertMany(interviewerInterviewSchedule)

const summary = {
  environment: "DATA",
  settings: db.getCollection("interviewerInterviewSchedule").find({}).count()
}

printjson(summary)
