const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //refrence to user collection in db
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type!!!`,
      },
    },
  },
  { timestamps: true },
);

//Compound index for better efficiency in query searching
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

//This pre is used to run before save in the db - it can be used to validation or testing or many other...
connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  //To check if the FromUser is same as ToUser - Id
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
