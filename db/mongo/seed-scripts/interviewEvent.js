const interviewEvent = []

db.interviewEvent.drop()
db.interviewEvent.insertMany(interviewEvent)

const summary = {
  environment: "DATA",
  settings: db.getCollection("interviewEvent").find({}).count()
}

printjson(summary)
