const candidateInterviewSchedules = [{}]

db.candidateInterviewSchedules.drop()
db.candidateInterviewSchedules.insertMany(candidateInterviewSchedules)

const summary = {
  environment: "DATA",
  settings: db.getCollection("candidateInterviewSchedules").find({}).count()
}

printjson(summary)
