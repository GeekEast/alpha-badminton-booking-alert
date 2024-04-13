const interviewSchedules = [
  {
    _id: ObjectId("617fc99a3b6384ecb1423a86"),
    organizationId: "fc81597b-f1b2-440f-a669-af3e241081f9",
    customerId: ObjectId("617fc7ce450f71ecb11e776f"),
    hierarchyId: ObjectId("617fc7ce450f71ecb11e7774"),
    jobRequisitionId: ObjectId("617fc7ce450f71ecb11e7775"),
    jobRequisitionExternalId: "JREQ-001",
    interviewers: [],
    candidateIds: [],
    schedulerId: ObjectId("617fc7ce450f71ecb11e7770"),
    defaultTimezone: "Asia/Kolkata",
    interviewName: "",
    interviewMode: "IN_PERSON",
    interviewAddress: null,
    interviewEventDuration: {
      type: "standard",
      value: 30
    },
    interviewNotesForCandidate: null,
    interviewAttachments: [],
    interviewEventIds: [],
    tags: [],
    createdAt: ISODate("2021-11-01T11:03:54.393Z"),
    updatedAt: ISODate("2021-11-01T11:03:54.393Z"),
    archivedAt: null
  }
]

db.interviewSchedules.drop()
db.interviewSchedules.insertMany(interviewSchedules)

const summary = {
  environment: "DATA",
  settings: db.getCollection("interviewSchedules").find({}).count()
}

printjson(summary)
